import type { AppUser } from './backend';

// Care Assistant chat — talks to our own API server (server/index.mjs
// /api/care-assistant), which holds the OpenAI key. The browser never sees
// the key; it only ships the conversation plus the locally-assembled care
// context (and only the parts the caregiver opted to share).
//
// Tool round-trips: the model can request actions (create_appointment,
// remember_preference). The SERVER never executes them — it returns the
// calls, the app executes them locally (appointments live in localStorage),
// appends the tool results to the transcript, and asks again for the final
// wording. Multiple actions per message and per session are supported.

export type AssistantToolCall = {
  id: string;
  name: string;
  arguments: string; // JSON string from the model
};

export type AssistantChatMessage =
  | { role: 'user' | 'assistant'; content: string }
  | {
      role: 'assistant';
      content: string | null;
      tool_calls: Array<{ id: string; type: 'function'; function: { name: string; arguments: string } }>;
    }
  | { role: 'tool'; tool_call_id: string; content: string };

export type AssistantResponse = {
  reply: string;
  toolCalls: AssistantToolCall[];
  emergency: boolean;
};

export async function askCareAssistant(
  user: AppUser,
  messages: AssistantChatMessage[],
  context: string,
): Promise<AssistantResponse> {
  const response = await fetch('/api/care-assistant', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify({ messages, context }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || response.statusText || `Request failed with status ${response.status}`);
  }

  return {
    reply: String(data?.reply || ''),
    toolCalls: Array.isArray(data?.toolCalls) ? data.toolCalls : [],
    emergency: Boolean(data?.emergency),
  };
}
