import type { ZodError } from 'zod';

/** ZodError → { path: message } 형태로 평탄화. */
export function flattenZodError(error: ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.length ? issue.path.join('.') : '_';
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
