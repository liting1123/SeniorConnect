import { Bot, CalendarPlus, Send, ShieldAlert, ShieldCheck, Trash2, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { getMedicines, getStoredUser, type AppUser, type Medicine } from '../services/backend';
import { getVitalsHistory, type VitalsHistory } from '../services/serviceNow';
import {
  askCareAssistant,
  type AssistantChatMessage,
  type AssistantToolCall,
} from '../services/careAssistant';

// ── Care Assistant — floating chatbot for caregiver / family accounts ──────
// Answers questions about the seniors linked to this account (vitals
// history, check-ins, medicine labels & prescriptions, HealthBuddy
// schedule) and can ACT: it books HealthBuddy appointments through the same
// validated path as the manual form, any number of times per session.
// Everything is local-first: care data, chat transcript, session logs and
// learned preferences all live in localStorage. Guardrails live on BOTH
// sides — the server pins scope/injection/emergency rules and rate-limits,
// while this component validates every action before executing it and
// renders a deterministic SOS banner whenever the server flags an
// emergency (never left to the model's wording).

type AssistantSenior = {
  name: string;
  userId?: string;
  status?: string;
  location?: string;
  lastCheckIn?: string;
  medicationStatus?: string;
  currentMedication?: string;
  medicalConditions?: string;
  allergies?: string;
  bloodType?: string;
};

type AssistantAppointment = {
  seniorName: string;
  title: string;
  date: string;
  time: string;
  location: string;
  notes: string;
  status: string;
};

export type AssistantAppointmentRequest = {
  seniorName: string;
  title: string;
  date: string;
  time: string;
  location: string;
  notes: string;
};

type FeedItem =
  | { kind: 'user'; text: string }
  | { kind: 'assistant'; text: string }
  | { kind: 'action'; text: string }
  | { kind: 'emergency' };

type SessionLog = {
  id: string;
  startedAt: string;
  feed: FeedItem[];
};

type CachedCareData = {
  ts: number;
  medicinesBySenior: Record<string, Medicine[]>;
  vitals: VitalsHistory | null;
};

const CACHE_TTL_MS = 5 * 60 * 1000;
const MAX_TRANSCRIPT = 40;
const MAX_SESSIONS = 10;
const MAX_PREFS = 20;
const MAX_TOOL_ROUNDS = 3;

const SUGGESTIONS = [
  'Has everyone checked in today?',
  'What medicine is due today?',
  'Summarise the latest vitals',
  'Book a physio appointment for next Monday 10am',
];

function storageIdentity(email: string) {
  return (email || 'unknown').trim().toLowerCase();
}

const keyOf = {
  optIn: (email: string) => `careconnect.assistant.medicalOptIn.${storageIdentity(email)}`,
  cache: (email: string) => `careconnect.assistant.cache.${storageIdentity(email)}`,
  transcript: (email: string) => `careconnect.assistant.transcript.${storageIdentity(email)}`,
  feed: (email: string) => `careconnect.assistant.history.${storageIdentity(email)}`,
  sessions: (email: string) => `careconnect.assistant.sessions.${storageIdentity(email)}`,
  prefs: (email: string) => `careconnect.assistant.prefs.${storageIdentity(email)}`,
};

function readStoredJson<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}

function writeStoredJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full — personalization is best-effort, never fatal.
  }
}

function checkedInToday(lastCheckIn?: string) {
  if (!lastCheckIn) {
    return false;
  }
  const parsed = new Date(lastCheckIn);
  return !Number.isNaN(parsed.getTime()) && parsed.toDateString() === new Date().toDateString();
}

function summariseVitals(vitals: VitalsHistory | null) {
  if (!vitals || (vitals.hr.length === 0 && vitals.br.length === 0)) {
    return 'No vitals history recorded yet.';
  }

  const span = (buckets: Array<{ time: string; avg: number }>, unit: string) => {
    if (buckets.length === 0) {
      return `no ${unit} readings`;
    }
    const values = buckets.map((bucket) => bucket.avg);
    const latest = buckets[buckets.length - 1];
    return `${Math.min(...values)}–${Math.max(...values)} ${unit} across ${buckets.length} readings, latest ${latest.avg} ${unit} at ${latest.time}`;
  };

  return [
    `Vitals history for ${vitals.date} (15-minute averages, bedroom radar):`,
    `- Heart rate: ${span(vitals.hr, 'bpm')} (normal 60–100).`,
    `- Breath rate: ${span(vitals.br, 'brpm')} (normal 12–20).`,
  ].join('\n');
}

// Personalization: learned preferences (stored via the remember_preference
// tool) plus lightweight stats derived from past session logs — which
// seniors and topics this caregiver asks about most. Plain derived text,
// computed on-device; nothing is sent anywhere except inside the context
// block of the caregiver's own assistant calls.
function buildProfileLines(email: string, seniors: AssistantSenior[]): string[] {
  const lines: string[] = [];
  const prefs = readStoredJson<string[]>(keyOf.prefs(email)) || [];
  const sessions = readStoredJson<SessionLog[]>(keyOf.sessions(email)) || [];

  if (prefs.length > 0) {
    lines.push('Stated preferences (from earlier sessions):');
    for (const pref of prefs.slice(-MAX_PREFS)) {
      lines.push(`- ${pref}`);
    }
  }

  const pastUserTexts = sessions
    .flatMap((session) => session.feed)
    .filter((item): item is Extract<FeedItem, { kind: 'user' }> => item.kind === 'user')
    .map((item) => item.text.toLowerCase());

  if (pastUserTexts.length > 0) {
    const topics: Array<[string, RegExp]> = [
      ['medicine & prescriptions', /medicin|prescription|dose|pill|tablet/],
      ['vitals', /vital|heart|breath|hr\b|bpm/],
      ['check-ins', /check[\s-]?in/],
      ['appointments', /appointment|schedule|book/],
    ];
    const topTopics = topics
      .map(([label, re]) => [label, pastUserTexts.filter((text) => re.test(text)).length] as const)
      .filter(([, count]) => count > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([label]) => label);

    const seniorCounts = seniors
      .map((senior) => {
        const first = senior.name.split(' ')[0].toLowerCase();
        return [senior.name, pastUserTexts.filter((text) => text.includes(first)).length] as const;
      })
      .filter(([, count]) => count > 0)
      .sort((a, b) => b[1] - a[1]);

    lines.push(`History: ${sessions.length} previous assistant session(s).`);
    if (topTopics.length > 0) {
      lines.push(`Frequently asks about: ${topTopics.join(', ')}.`);
    }
    if (seniorCounts.length > 0) {
      lines.push(`Most asked-about senior: ${seniorCounts[0][0]}.`);
    }
  }

  return lines;
}

function buildContext(
  email: string,
  seniors: AssistantSenior[],
  appointments: AssistantAppointment[],
  medicalOptIn: boolean,
  cached: CachedCareData | null,
  isAdmin: boolean,
) {
  const lines: string[] = [];
  const now = new Date();
  lines.push(`Today's date: ${now.toISOString().slice(0, 10)} (${now.toLocaleDateString('en-SG', { weekday: 'long' })}).`);
  if (isAdmin) {
    lines.push(
      '',
      'You are assisting an ADMINISTRATOR overseeing the whole SeniorConnect',
      'fleet — not a single family caregiver. Answer at fleet scope: compare',
      'residents, surface who needs attention, summarise across everyone below.',
      'The same safety rules apply (no diagnosis; direct emergencies to SOS/995).',
    );
  }

  const profile = buildProfileLines(email, seniors);
  if (profile.length > 0) {
    lines.push('', 'Caregiver profile (for personalising tone and focus only):', ...profile);
  }

  lines.push('', `Linked seniors (${seniors.length}):`);
  for (const senior of seniors) {
    const checkIn = senior.lastCheckIn
      ? `last check-in ${senior.lastCheckIn}${checkedInToday(senior.lastCheckIn) ? ' (checked in today)' : ' (NOT checked in today)'}`
      : 'no check-in recorded';
    lines.push(`- ${senior.name}: status ${senior.status || 'OK'}, location ${senior.location || 'unknown'}, ${checkIn}.`);
  }

  const upcoming = appointments.filter((appointment) => appointment.status !== 'cancelled');
  lines.push('', `HealthBuddy appointment schedule (${upcoming.length}):`);
  if (upcoming.length === 0) {
    lines.push('- No appointments scheduled.');
  }
  for (const appointment of upcoming) {
    lines.push(
      `- ${appointment.seniorName}: "${appointment.title}" on ${appointment.date} ${appointment.time} at ${appointment.location || 'unspecified location'} [${appointment.status}]${appointment.notes ? ` — notes: ${appointment.notes}` : ''}`,
    );
  }

  if (!medicalOptIn) {
    lines.push(
      '',
      'Medical-record sharing is OFF (caregiver has not opted in). Medicines,',
      'prescriptions, medical conditions and vitals history are NOT available',
      'in this conversation.',
    );
    return lines.join('\n');
  }

  lines.push('', 'Medical records (caregiver opted IN to sharing):');
  for (const senior of seniors) {
    lines.push(
      `- ${senior.name}: blood type ${senior.bloodType || 'unknown'}; allergies: ${senior.allergies || 'none recorded'}; conditions: ${senior.medicalConditions || 'none recorded'}; medication status today: ${senior.medicationStatus || 'unknown'}.`,
    );
    const medicines = (senior.userId && cached?.medicinesBySenior[senior.userId]) || [];
    if (medicines.length === 0) {
      lines.push('  Prescriptions: none on record.');
    } else {
      lines.push('  Prescriptions / medicine labels:');
      for (const medicine of medicines) {
        lines.push(
          `  * ${medicine.name} — dose ${medicine.dose || 'unspecified'}, ${medicine.frequency || 'frequency unspecified'} at ${medicine.time || 'unspecified time'}, status: ${medicine.status || 'pending'}${medicine.notes ? `, label notes: ${medicine.notes}` : ''}`,
        );
      }
    }
  }

  lines.push('', summariseVitals(cached?.vitals ?? null));
  return lines.join('\n');
}

// The transcript window must never start mid tool-exchange (a tool result
// without its assistant tool_calls message is an OpenAI 400) — cut at a
// user-message boundary instead of a raw count.
function takeRecentTranscript(transcript: AssistantChatMessage[], max = 14) {
  const tail = transcript.slice(-max);
  const firstUser = tail.findIndex((message) => message.role === 'user');
  return firstUser > 0 ? tail.slice(firstUser) : tail;
}

export function CareAssistantChat({
  caregiverEmail,
  seniors,
  appointments,
  onCreateAppointment,
  isAdmin = false,
}: {
  caregiverEmail: string;
  seniors: AssistantSenior[];
  appointments: AssistantAppointment[];
  onCreateAppointment: (input: AssistantAppointmentRequest) => { ok: boolean; message: string };
  // Admin-role users share the caregiver dashboard; when true the assistant
  // presents as a fleet/admin assistant (title + context framing) rather
  // than a single-caregiver one. Same data + tools, wider framing.
  isAdmin?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [feed, setFeed] = useState<FeedItem[]>(() => readStoredJson<FeedItem[]>(keyOf.feed(caregiverEmail)) || []);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState('');
  const [medicalOptIn, setMedicalOptIn] = useState(() => localStorage.getItem(keyOf.optIn(caregiverEmail)) === '1');
  const transcriptRef = useRef<AssistantChatMessage[]>(
    readStoredJson<AssistantChatMessage[]>(keyOf.transcript(caregiverEmail)) || [],
  );
  const sessionRef = useRef<SessionLog>({
    id: `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    startedAt: new Date().toISOString(),
    feed: [],
  });
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    writeStoredJson(keyOf.feed(caregiverEmail), feed.slice(-MAX_TRANSCRIPT));
  }, [feed, caregiverEmail]);

  useEffect(() => {
    localStorage.setItem(keyOf.optIn(caregiverEmail), medicalOptIn ? '1' : '0');
  }, [medicalOptIn, caregiverEmail]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [feed, isThinking, isOpen]);

  function pushFeed(...items: FeedItem[]) {
    setFeed((current) => [...current, ...items].slice(-MAX_TRANSCRIPT));
    // Session log mirrors the visible feed — one entry per session in
    // localStorage, used to personalise future sessions.
    sessionRef.current.feed.push(...items);
    const sessions = (readStoredJson<SessionLog[]>(keyOf.sessions(caregiverEmail)) || []).filter(
      (session) => session.id !== sessionRef.current.id,
    );
    sessions.push(sessionRef.current);
    writeStoredJson(keyOf.sessions(caregiverEmail), sessions.slice(-MAX_SESSIONS));
  }

  function persistTranscript() {
    writeStoredJson(keyOf.transcript(caregiverEmail), transcriptRef.current.slice(-MAX_TRANSCRIPT));
  }

  function rememberPreference(note: string) {
    const clean = note.trim().slice(0, 160);
    if (!clean) {
      return 'FAILED: empty note.';
    }
    const prefs = readStoredJson<string[]>(keyOf.prefs(caregiverEmail)) || [];
    if (!prefs.some((existing) => existing.toLowerCase() === clean.toLowerCase())) {
      prefs.push(clean);
      writeStoredJson(keyOf.prefs(caregiverEmail), prefs.slice(-MAX_PREFS));
    }
    return `OK: preference saved — "${clean}"`;
  }

  // Executes one model-requested action LOCALLY, with validation — the
  // server never touches appointments or preferences. Returns the tool
  // result string that goes back into the transcript.
  function executeToolCall(call: AssistantToolCall): { result: string; display: FeedItem | null } {
    let args: Record<string, unknown> = {};
    try {
      args = JSON.parse(call.arguments || '{}');
    } catch {
      return { result: 'FAILED: arguments were not valid JSON.', display: null };
    }

    if (call.name === 'remember_preference') {
      const result = rememberPreference(String(args.note || ''));
      return {
        result,
        display: result.startsWith('OK') ? { kind: 'action', text: `Saved preference: ${String(args.note || '').trim()}` } : null,
      };
    }

    if (call.name === 'create_appointment') {
      const request: AssistantAppointmentRequest = {
        seniorName: String(args.senior_name || '').trim(),
        title: String(args.title || '').trim(),
        date: String(args.date || '').trim(),
        time: String(args.time || '').trim(),
        location: String(args.location || '').trim(),
        notes: String(args.notes || '').trim(),
      };
      const outcome = onCreateAppointment(request);
      return {
        result: outcome.ok ? `OK: ${outcome.message}` : `FAILED: ${outcome.message}`,
        display: outcome.ok
          ? { kind: 'action', text: `Appointment booked: ${request.seniorName} — "${request.title}" on ${request.date} ${request.time}` }
          : null,
      };
    }

    return { result: `FAILED: unknown action "${call.name}".`, display: null };
  }

  // Local-first care-data snapshot: serve from the localStorage cache while
  // fresh; refresh past the TTL; if the network is down, keep answering
  // from the last good snapshot instead of failing.
  async function getCareData(user: AppUser): Promise<CachedCareData | null> {
    const cached = readStoredJson<CachedCareData>(keyOf.cache(caregiverEmail));
    if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
      return cached;
    }

    try {
      const medicinesBySenior: Record<string, Medicine[]> = {};
      for (const senior of seniors) {
        if (senior.userId) {
          medicinesBySenior[senior.userId] = await getMedicines({ ...user, uid: senior.userId });
        }
      }
      const vitals = await getVitalsHistory().catch(() => null);
      const fresh: CachedCareData = { ts: Date.now(), medicinesBySenior, vitals };
      writeStoredJson(keyOf.cache(caregiverEmail), fresh);
      return fresh;
    } catch {
      return cached; // stale beats nothing when offline
    }
  }

  async function send(text: string) {
    const question = text.trim();
    if (!question || isThinking) {
      return;
    }

    const user = getStoredUser();
    if (!user) {
      setError('Please log in again to use the assistant.');
      return;
    }

    setError('');
    setInput('');
    transcriptRef.current = [...transcriptRef.current, { role: 'user', content: question }];
    pushFeed({ kind: 'user', text: question });
    setIsThinking(true);

    try {
      const careData = medicalOptIn ? await getCareData(user) : null;
      const context = buildContext(caregiverEmail, seniors, appointments, medicalOptIn, careData, isAdmin);

      let emergencyShown = false;
      // Tool loop: the model may request several actions, get their
      // results, then request MORE in the next round — capped, but never
      // limited to a single action per message or per session.
      for (let round = 0; round <= MAX_TOOL_ROUNDS; round += 1) {
        const response = await askCareAssistant(user, takeRecentTranscript(transcriptRef.current), context);

        if (response.emergency && !emergencyShown) {
          emergencyShown = true;
          pushFeed({ kind: 'emergency' });
        }

        if (response.toolCalls.length === 0 || round === MAX_TOOL_ROUNDS) {
          const reply = response.reply || 'Done.';
          transcriptRef.current = [...transcriptRef.current, { role: 'assistant', content: reply }];
          pushFeed({ kind: 'assistant', text: reply });
          break;
        }

        // Record the model's tool request, execute each call locally, then
        // feed the results back and let it produce the final wording.
        transcriptRef.current = [
          ...transcriptRef.current,
          {
            role: 'assistant',
            content: response.reply || null,
            tool_calls: response.toolCalls.map((call) => ({
              id: call.id,
              type: 'function' as const,
              function: { name: call.name, arguments: call.arguments },
            })),
          },
        ];

        for (const call of response.toolCalls) {
          const { result, display } = executeToolCall(call);
          transcriptRef.current = [
            ...transcriptRef.current,
            { role: 'tool', tool_call_id: call.id, content: result },
          ];
          if (display) {
            pushFeed(display);
          }
        }
      }

      persistTranscript();
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : 'The assistant is unavailable right now.');
    } finally {
      setIsThinking(false);
    }
  }

  function clearConversation() {
    setFeed([]);
    transcriptRef.current = [];
    persistTranscript();
    // A clear starts a fresh session log; the finished one stays in the
    // sessions store for personalization.
    sessionRef.current = {
      id: `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      startedAt: new Date().toISOString(),
      feed: [],
    };
  }

  if (!isOpen) {
    return (
      <button
        type="button"
        aria-label="Open Care Assistant"
        onClick={() => setIsOpen(true)}
        className="absolute bottom-28 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#416642] text-white shadow-[0_10px_25px_rgba(0,0,0,0.25)] active:scale-95"
      >
        <Bot className="h-7 w-7" />
      </button>
    );
  }

  return (
    <div className="absolute inset-x-3 bottom-28 top-16 z-40 flex flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_18px_45px_rgba(0,0,0,0.25)]">
      <header className="flex items-center justify-between gap-2 bg-[#416642] px-4 py-3 text-white">
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6" />
          <div>
            <p className="text-base font-black leading-5">{isAdmin ? 'Admin Assistant' : 'Care Assistant'}</p>
            <p className="text-[11px] font-semibold text-white/80">
              {isAdmin ? 'fleet overview · vitals · alerts · appointments' : 'Vitals · check-ins · medicine · books appointments'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Clear conversation"
            onClick={clearConversation}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/85 active:bg-white/15"
          >
            <Trash2 className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Close Care Assistant"
            onClick={() => setIsOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/85 active:bg-white/15"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </header>

      <label className="flex items-center gap-2 border-b border-[#eef1f4] bg-[#f8faf8] px-4 py-2">
        <input
          type="checkbox"
          checked={medicalOptIn}
          onChange={(event) => setMedicalOptIn(event.target.checked)}
          className="h-4 w-4 accent-[#416642]"
        />
        <ShieldCheck className="h-4 w-4 shrink-0 text-[#416642]" />
        <span className="text-xs font-bold text-[#30343a]">
          Share medical records (medicines, prescriptions, vitals)
        </span>
      </label>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
        {feed.length === 0 && (
          <div className="space-y-2">
            <p className="text-sm font-semibold text-[#71717a]">
              Ask about your seniors, or tell me to book a HealthBuddy appointment.
              Check-ins and the schedule are always available; flip the toggle above
              to include medicine and vitals.
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => send(suggestion)}
                  className="rounded-full border border-[#d7e2d8] bg-[#f2f7f2] px-3 py-1.5 text-xs font-bold text-[#416642] active:scale-95"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
        {feed.map((item, index) => {
          if (item.kind === 'emergency') {
            return (
              <div
                key={`feed-${index}`}
                className="flex items-start gap-2 rounded-[16px] border-2 border-[#dc2626] bg-red-50 px-3 py-2"
              >
                <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#dc2626]" />
                <p className="text-sm font-bold leading-5 text-[#b91c1c]">
                  This sounds urgent. Use the SOS flow in the app or call 995 now —
                  don't wait for the assistant.
                </p>
              </div>
            );
          }
          if (item.kind === 'action') {
            return (
              <div
                key={`feed-${index}`}
                className="mr-auto flex items-center gap-2 rounded-full bg-[#e9f6ed] px-3 py-1.5"
              >
                <CalendarPlus className="h-4 w-4 shrink-0 text-[#18833b]" />
                <span className="text-xs font-bold text-[#18833b]">{item.text}</span>
              </div>
            );
          }
          return (
            <div
              key={`feed-${index}`}
              className={`max-w-[85%] whitespace-pre-wrap rounded-[16px] px-3 py-2 text-sm font-semibold leading-5 ${
                item.kind === 'user'
                  ? 'ml-auto bg-[#416642] text-white'
                  : 'mr-auto bg-[#f0f2f5] text-[#151515]'
              }`}
            >
              {item.text}
            </div>
          );
        })}
        {isThinking && (
          <div className="mr-auto rounded-[16px] bg-[#f0f2f5] px-3 py-2 text-sm font-bold text-[#71717a]">
            Thinking…
          </div>
        )}
        {error && (
          <p className="rounded-[12px] bg-red-50 px-3 py-2 text-xs font-bold text-red-700">{error}</p>
        )}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 border-t border-[#eef1f4] p-3"
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask, or say “book an appointment…”"
          className="h-11 min-w-0 flex-1 rounded-full bg-[#f0f2f5] px-4 text-sm font-semibold text-[#151515] outline-none placeholder:text-[#94a3b8]"
        />
        <button
          type="submit"
          disabled={isThinking || !input.trim()}
          aria-label="Send"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#416642] text-white active:scale-95 disabled:opacity-40"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}
