import type { AppUser } from './backend';

// Care Assistant chat — talks to our own API server (server/index.mjs
// /api/care-assistant), which holds the OpenAI key. The browser never sees
// the key; it only ships the conversation plus the locally-assembled care
// context (and only the parts the caregiver opted to share).

export type AssistantChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export async function askCareAssistant(
  user: AppUser,
  messages: AssistantChatMessage[],
  context: string,
): Promise<string> {
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

  return String(data?.reply || '');
}
