export type Result<T> =
  | { ok: false, error: Error }
  | { ok: true, value: T }
