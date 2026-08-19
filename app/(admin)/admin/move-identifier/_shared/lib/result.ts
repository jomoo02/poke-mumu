export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; errors: Record<string, string> };

export function ok<T>(data: T): ActionResult<T> {
  return { ok: true, data };
}

export function fail(errors: Record<string, string>): ActionResult<never> {
  return { ok: false, errors };
}
