/**
 * type / damage_class / change_log field 열거값. 실제 DB 행으로 검증됨.
 */

export interface EnumOption {
  id: number;
  label: string;
}

/** type 테이블(id 1~18 + unknown). id 저장 / 한글 표시. */
export const TYPE_OPTIONS: readonly EnumOption[] = [
  { id: 1, label: '노말' },
  { id: 2, label: '격투' },
  { id: 3, label: '비행' },
  { id: 4, label: '독' },
  { id: 5, label: '땅' },
  { id: 6, label: '바위' },
  { id: 7, label: '벌레' },
  { id: 8, label: '고스트' },
  { id: 9, label: '강철' },
  { id: 10, label: '불꽃' },
  { id: 11, label: '물' },
  { id: 12, label: '풀' },
  { id: 13, label: '전기' },
  { id: 14, label: '에스퍼' },
  { id: 15, label: '얼음' },
  { id: 16, label: '드래곤' },
  { id: 17, label: '악' },
  { id: 18, label: '페어리' },
  { id: 10001, label: '???' },
] as const;

/** damage_class 테이블. 1=변화·2=물리·3=특수. */
export const DAMAGE_CLASS_OPTIONS: readonly EnumOption[] = [
  { id: 1, label: '변화' },
  { id: 2, label: '물리' },
  { id: 3, label: '특수' },
] as const;

const TYPE_BY_ID = new Map(TYPE_OPTIONS.map((t) => [t.id, t.label]));
const DC_BY_ID = new Map(DAMAGE_CLASS_OPTIONS.map((d) => [d.id, d.label]));

export function typeLabel(id: number | null | undefined): string {
  if (id === null || id === undefined) return '—';
  return TYPE_BY_ID.get(id) ?? `type-${id}`;
}

export function damageClassLabel(id: number | null | undefined): string {
  if (id === null || id === undefined) return '—';
  return DC_BY_ID.get(id) ?? `dc-${id}`;
}

/** change_log field 화이트리스트(드롭다운 전용). DB 실제 값과 대조 검증됨. */
export const CHANGE_LOG_FIELDS = [
  '위력',
  'PP',
  '명중',
  '타입',
  '분류',
  '우선도',
  '성질',
  '추가효과 확률',
  '추가효과',
  '효과',
  '지속 데미지',
  '이름',
] as const;

export type ChangeLogField = (typeof CHANGE_LOG_FIELDS)[number];
