/**
 * 폼/DB 값 변환 헬퍼. number 빈값은 0과 구분하기 위해 null로 강제한다.
 */

/** '' | null | undefined → null, 그 외 → Number(). NaN이면 null. */
export function toNullableNumber(value: unknown): number | null {
  if (value === '' || value === null || value === undefined) {
    return null;
  }
  const n = Number(value);
  return Number.isNaN(n) ? null : n;
}

/** null/undefined 불가. 숫자 강제 변환, 실패 시 fallback. */
export function toNumber(value: unknown, fallback = 0): number {
  const n = Number(value);
  return Number.isNaN(n) ? fallback : n;
}

/** '' → null, 그 외 문자열 그대로(trim). */
export function toNullableString(value: unknown): string | null {
  if (value === null || value === undefined) {
    return null;
  }
  const s = String(value).trim();
  return s === '' ? null : s;
}
