type SosAlertInput = {
  location: string;
  message: string;
  seniorName: string;
  seniorPhone: string;
  status: string;
};

export async function createSosAlert(input: SosAlertInput) {
  const response = await fetch('/api/servicenow/sos-alert', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || response.statusText || `Request failed with status ${response.status}`);
  }

  return data?.alert;
}

export type RoomOccupancy = {
  occupied: boolean | null;
  value: string;
  loggedAt: string;
};

export type SensorTrendPoint = {
  value: number;
  loggedAt: string;
};

export type SensorNodeStatus = {
  location: string;
  lastSeen: string;
};

export type SensorAlertRow = {
  location: string;
  value: string;
  status: string;
  loggedAt: string;
};

export type SensorStatus = {
  rooms: {
    bedroom: RoomOccupancy;
    bathroom: RoomOccupancy;
    livingRoom: RoomOccupancy;
  };
  vitals: {
    hr: number | null;
    br: number | null;
    hrTrend: SensorTrendPoint[];
    brTrend: SensorTrendPoint[];
  };
  // Controller-grade extras (may be absent from an older API server).
  activity?: {
    movement: number | null;
    distanceCm: number | null;
  };
  nodes?: SensorNodeStatus[];
  recentAlerts?: SensorAlertRow[];
  lastUpdated: string;
};

// Fed by Senior_stuff's route_engine.queue_activity_log() via the ServiceNow
// u_sensor_activity_log table - see server/servicenow.mjs's
// getSensorActivitySnapshot(). Returns null if SERVICE_NOW_SENSOR_SENIOR_ID isn't
// configured, or if there's no recent data yet.
export async function getSensorStatus(): Promise<SensorStatus | null> {
  const response = await fetch('/api/servicenow/sensor-status');
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || response.statusText || `Request failed with status ${response.status}`);
  }

  return data?.status ?? null;
}

export type VitalsHistoryBucket = {
  time: string; // 15-min bucket start, 'HH:MM'
  avg: number;
  samples: number;
};

export type VitalsHistory = {
  date: string;
  hr: VitalsHistoryBucket[];
  br: VitalsHistoryBucket[];
  samples: number;
};

// Phase 9.3 - 15-minute batched HR/BR averages for the History tab, computed
// server-side from ServiceNow u_sensor_activity_log (the historical source of
// truth). The live view never touches this - it rides the MQTT/WS bridge.
export async function getVitalsHistory(): Promise<VitalsHistory | null> {
  const response = await fetch('/api/servicenow/vitals-history');
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || response.statusText || `Request failed with status ${response.status}`);
  }

  return data?.history ?? null;
}
