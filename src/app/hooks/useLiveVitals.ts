import { useEffect, useRef, useState } from 'react';

// Live telemetry over the Pi's MQTT→WebSocket bridge (realtime.py /ws/live).
//
// The bridge forwards EVERY sensor message as { topic, data } — the same
// payloads controller.py consumes — so the Live tab can be fully live:
// vitals (1 Hz sparkline), room occupancy, movement/distance, per-node
// freshness, and fall/recovery events, all parsed here with the same rules
// as controller.on_message. ServiceNow stays the fallback + history source.
//
// Payload shapes (see Senior_stuff sensor nodes):
//   bedroom radar   { type:'mmWave', location:'Bedroom', value:'In Bed'|'Out of Bed',
//                     heart_rate, breath_rate, status:'Occupied'|'Empty' }
//   living radar    { type:'mmWave', location:'Living Room',
//                     value:'PRESENCE_DETECTED'|'NO_MOTION_DETECTED'|'FALL_DETECTED'|'RECOVERY_DETECTION',
//                     movement, distance_cm, ... }
//   proximity       { type:'Proximity', location:'Bathroom Door'|'Bedroom Door'|...,
//                     value:'Detected'|'Blocked'|'Clear' }
//   camera          { type:'Camera', image:<base64> } — counted as node activity only.

export type VitalPoint = { t: number; value: number };

export type LiveRoomState = {
  value: string;
  occupied: boolean;
  at: number; // epoch ms of the sample
};

export type LiveEvent = {
  at: number;
  location: string;
  value: string; // FALL_DETECTED / RECOVERY_DETECTION
};

export type LiveVitals = {
  connected: boolean;
  hr: number | null;
  br: number | null;
  hrSeries: VitalPoint[];
  brSeries: VitalPoint[];
  lastMessageAt: number | null;
  rooms: {
    bedroom: LiveRoomState | null;
    bathroom: LiveRoomState | null;
    livingRoom: LiveRoomState | null;
  };
  movement: number | null;
  distanceCm: number | null;
  nodes: Record<string, number>; // sensor location -> epoch ms of last message
  events: LiveEvent[]; // newest first, falls/recoveries only
};

const EMPTY_STATE: LiveVitals = {
  connected: false,
  hr: null,
  br: null,
  hrSeries: [],
  brSeries: [],
  lastMessageAt: null,
  rooms: { bedroom: null, bathroom: null, livingRoom: null },
  movement: null,
  distanceCm: null,
  nodes: {},
  events: [],
};

const WINDOW_MS = 60_000; // 60-second rolling sparkline window
const MAX_BACKOFF_MS = 10_000;
const MAX_EVENTS = 10;

function resolveWsUrl() {
  const configured = (import.meta.env?.VITE_LIVE_WS_URL as string | undefined)?.trim();

  if (configured) {
    return configured;
  }

  // Demo default: the single consolidated dashboard process on the same
  // host (Phase 8, 2026-07-08 - dashboard_fleet.py/dashboard_vitals.py's
  // 8050/8051 split was abandoned in favour of one process; start_controller.ps1
  // binds it to :8050 and mounts /ws/live there).
  const proto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${proto}//${window.location.hostname}:8050/ws/live`;
}

function prune(series: VitalPoint[], now: number) {
  const cutoff = now - WINDOW_MS;
  let start = 0;

  while (start < series.length && series[start].t < cutoff) {
    start += 1;
  }

  return start > 0 ? series.slice(start) : series;
}

// Same value semantics controller.on_message applies per sensor type.
function applyTelemetry(next: LiveVitals, topic: string, payload: Record<string, unknown>, now: number) {
  const type = String(payload.type ?? '');
  const location = String(payload.location ?? '');
  const value = String(payload.value ?? '');
  const upper = value.toUpperCase();

  if (type === 'Proximity' && location === 'Bathroom Door') {
    if (['DETECTED', 'BLOCKED', 'ENTER'].includes(upper)) {
      next.rooms = { ...next.rooms, bathroom: { value: 'Occupied', occupied: true, at: now } };
    } else if (['CLEAR', 'EXIT'].includes(upper)) {
      next.rooms = { ...next.rooms, bathroom: { value: 'Empty', occupied: false, at: now } };
    }
    return;
  }

  const isBedroomStream = location === 'Bedroom' || topic.includes('mmwave_bedroom');

  if (isBedroomStream && (upper === 'IN BED' || upper === 'OUT OF BED')) {
    next.rooms = {
      ...next.rooms,
      bedroom: { value, occupied: upper === 'IN BED', at: now },
    };
  }

  if (location === 'Living Room') {
    if (upper.includes('PRESENCE') || upper.includes('NO_MOTION')) {
      const present = upper === 'PRESENCE_DETECTED' || upper === 'PRESENCE';
      next.rooms = {
        ...next.rooms,
        livingRoom: { value: present ? 'Occupied' : 'Empty', occupied: present, at: now },
      };
    }

    const movement = Number(payload.movement);
    const distance = Number(payload.distance_cm);

    if (Number.isFinite(movement)) {
      next.movement = movement;
    }

    if (Number.isFinite(distance) && distance > 0) {
      next.distanceCm = distance;
    }
  }

  if (upper === 'FALL_DETECTED' || upper.startsWith('RECOVERY')) {
    next.events = [{ at: now, location: location || 'sensor', value: upper }, ...next.events].slice(0, MAX_EVENTS);
  }
}

export function useLiveVitals(enabled: boolean): LiveVitals {
  const [state, setState] = useState<LiveVitals>(EMPTY_STATE);
  const backoffRef = useRef(1000);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let socket: WebSocket | null = null;
    let reconnectTimer: number | null = null;
    let isDisposed = false;

    function connect() {
      try {
        socket = new WebSocket(resolveWsUrl());
      } catch {
        scheduleReconnect();
        return;
      }

      socket.onopen = () => {
        backoffRef.current = 1000;
        setState((prev) => ({ ...prev, connected: true }));
      };

      socket.onmessage = (event) => {
        let message: { topic?: string; data?: Record<string, unknown> };

        try {
          message = JSON.parse(String(event.data));
        } catch {
          return;
        }

        if (!message?.data || message.topic === '_hello') {
          return;
        }

        const payload = message.data;
        const topic = String(message.topic ?? '');
        const now = Date.now();
        const location = String(payload.location ?? '');
        const hr = Number(payload.heart_rate ?? payload.hr);
        const br = Number(payload.breath_rate ?? payload.br ?? payload.respiration_rate);

        setState((prev) => {
          const next: LiveVitals = {
            ...prev,
            lastMessageAt: now,
            nodes: location ? { ...prev.nodes, [location]: now } : prev.nodes,
          };

          if (Number.isFinite(hr) && hr > 0) {
            next.hr = hr;
            next.hrSeries = prune([...prev.hrSeries, { t: now, value: hr }], now);
          }

          if (Number.isFinite(br) && br > 0) {
            next.br = br;
            next.brSeries = prune([...prev.brSeries, { t: now, value: br }], now);
          }

          // Camera frames carry a heavy base64 image — node freshness only.
          if (!payload.image) {
            applyTelemetry(next, topic, payload, now);
          }

          return next;
        });
      };

      socket.onclose = () => {
        setState((prev) => ({ ...prev, connected: false }));
        scheduleReconnect();
      };

      socket.onerror = () => {
        socket?.close();
      };
    }

    function scheduleReconnect() {
      if (isDisposed || reconnectTimer !== null) {
        return;
      }

      reconnectTimer = window.setTimeout(() => {
        reconnectTimer = null;
        backoffRef.current = Math.min(backoffRef.current * 2, MAX_BACKOFF_MS);
        connect();
      }, backoffRef.current);
    }

    connect();

    return () => {
      isDisposed = true;

      if (reconnectTimer !== null) {
        window.clearTimeout(reconnectTimer);
      }

      try {
        socket?.close();
      } catch {
        // already closed
      }
    };
  }, [enabled]);

  return state;
}
