const MAX_BODY_BYTES = 32 * 1024;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 10;

// A process-wide budget, not an IP identity check or a distributed quota.
// No personal data or untrusted proxy headers are stored.
export function createContactBudget() {
  let resetAt = 0;
  let attempts = 0;
  return (now = Date.now()): number => {
    if (now >= resetAt) {
      resetAt = now + WINDOW_MS;
      attempts = 0;
    }
    if (attempts >= MAX_ATTEMPTS) return Math.max(1, Math.ceil((resetAt - now) / 1000));
    attempts += 1;
    return 0;
  };
}

export class ContactBodyTooLarge extends Error {}

export async function readContactBody(request: Request): Promise<unknown> {
  const length = request.headers.get("content-length");
  if (length !== null && Number(length) > MAX_BODY_BYTES) throw new ContactBodyTooLarge();
  if (!request.body) return null;
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        void reader.cancel().catch(() => {});
        throw new ContactBodyTooLarge();
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
}
