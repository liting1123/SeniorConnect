import { Bot, Send, ShieldCheck, Trash2, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { getMedicines, getStoredUser, type AppUser, type Medicine } from '../services/backend';
import { getVitalsHistory, type VitalsHistory } from '../services/serviceNow';
import { askCareAssistant, type AssistantChatMessage } from '../services/careAssistant';

// ── Care Assistant — floating chatbot for caregiver / family accounts ──────
// Answers questions about the seniors linked to this account: past vitals
// history, daily check-ins, medicine labels & prescriptions, and the
// HealthBuddy appointment schedule. Everything it needs is assembled HERE,
// on-device, and cached in localStorage — the assistant works from the last
// good snapshot even when ServiceNow is slow or unreachable. Medical records
// (medicines, prescriptions, conditions, vitals) are only included when the
// caregiver flips the explicit opt-in toggle; check-ins and appointments are
// always available. The OpenAI key never reaches this code — the API server
// proxies the conversation (see server/index.mjs askCareAssistant).

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

type CachedCareData = {
  ts: number;
  medicinesBySenior: Record<string, Medicine[]>;
  vitals: VitalsHistory | null;
};

const CACHE_TTL_MS = 5 * 60 * 1000;
const MAX_STORED_MESSAGES = 40;

const SUGGESTIONS = [
  'Has everyone checked in today?',
  'What medicine is due today?',
  'Summarise the latest vitals',
  'What appointments are coming up?',
];

function storageIdentity(email: string) {
  return (email || 'unknown').trim().toLowerCase();
}

function optInKey(email: string) {
  return `careconnect.assistant.medicalOptIn.${storageIdentity(email)}`;
}

function cacheKey(email: string) {
  return `careconnect.assistant.cache.${storageIdentity(email)}`;
}

function historyKey(email: string) {
  return `careconnect.assistant.history.${storageIdentity(email)}`;
}

function readStoredJson<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    localStorage.removeItem(key);
    return null;
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

function buildContext(
  seniors: AssistantSenior[],
  appointments: AssistantAppointment[],
  medicalOptIn: boolean,
  cached: CachedCareData | null,
) {
  const lines: string[] = [];
  const today = new Date().toISOString().slice(0, 10);
  lines.push(`Today's date: ${today}.`);

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

export function CareAssistantChat({
  caregiverEmail,
  seniors,
  appointments,
}: {
  caregiverEmail: string;
  seniors: AssistantSenior[];
  appointments: AssistantAppointment[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AssistantChatMessage[]>(
    () => readStoredJson<AssistantChatMessage[]>(historyKey(caregiverEmail)) || [],
  );
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState('');
  const [medicalOptIn, setMedicalOptIn] = useState(() => localStorage.getItem(optInKey(caregiverEmail)) === '1');
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    localStorage.setItem(historyKey(caregiverEmail), JSON.stringify(messages.slice(-MAX_STORED_MESSAGES)));
  }, [messages, caregiverEmail]);

  useEffect(() => {
    localStorage.setItem(optInKey(caregiverEmail), medicalOptIn ? '1' : '0');
  }, [medicalOptIn, caregiverEmail]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking, isOpen]);

  // Local-first care-data snapshot: serve from the localStorage cache while
  // fresh; refresh in the background past the TTL; and if the network is
  // down, keep answering from the last good snapshot instead of failing.
  async function getCareData(user: AppUser): Promise<CachedCareData | null> {
    const cached = readStoredJson<CachedCareData>(cacheKey(caregiverEmail));
    if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
      return cached;
    }

    try {
      const medicinesBySenior: Record<string, Medicine[]> = {};
      for (const senior of seniors) {
        if (senior.userId) {
          // Caregiver token, senior uid — same trust model the medication
          // panel already uses for linked residents.
          medicinesBySenior[senior.userId] = await getMedicines({ ...user, uid: senior.userId });
        }
      }
      const vitals = await getVitalsHistory().catch(() => null);
      const fresh: CachedCareData = { ts: Date.now(), medicinesBySenior, vitals };
      localStorage.setItem(cacheKey(caregiverEmail), JSON.stringify(fresh));
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
    const nextMessages: AssistantChatMessage[] = [...messages, { role: 'user', content: question }];
    setMessages(nextMessages);
    setIsThinking(true);

    try {
      const careData = medicalOptIn ? await getCareData(user) : null;
      const context = buildContext(seniors, appointments, medicalOptIn, careData);
      const reply = await askCareAssistant(user, nextMessages.slice(-12), context);
      setMessages((current) => [...current, { role: 'assistant', content: reply }]);
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : 'The assistant is unavailable right now.');
    } finally {
      setIsThinking(false);
    }
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
            <p className="text-base font-black leading-5">Care Assistant</p>
            <p className="text-[11px] font-semibold text-white/80">Vitals · check-ins · medicine · schedule</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Clear conversation"
            onClick={() => setMessages([])}
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
        {messages.length === 0 && (
          <div className="space-y-2">
            <p className="text-sm font-semibold text-[#71717a]">
              Ask about your seniors — check-ins and the HealthBuddy schedule are always available;
              flip the toggle above to include medicine and vitals.
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
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`max-w-[85%] whitespace-pre-wrap rounded-[16px] px-3 py-2 text-sm font-semibold leading-5 ${
              message.role === 'user'
                ? 'ml-auto bg-[#416642] text-white'
                : 'mr-auto bg-[#f0f2f5] text-[#151515]'
            }`}
          >
            {message.content}
          </div>
        ))}
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
          placeholder="Ask the Care Assistant…"
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
