/** move_target 테이블(id 1~16). 실제 DB 행으로 검증됨. */
export interface MoveTargetOption {
  id: number;
  label: string;
}

export const MOVE_TARGET_OPTIONS: readonly MoveTargetOption[] = [
  { id: 1, label: '특정 기술' },
  { id: 2, label: '먼저쓰기 대상' },
  { id: 3, label: '자기편' },
  { id: 4, label: '자기편 필드' },
  { id: 5, label: '자신 또는 자기편' },
  { id: 6, label: '상대편 필드' },
  { id: 7, label: '자신' },
  { id: 8, label: '임의의 상대 1마리' },
  { id: 9, label: '자신 이외 전부' },
  { id: 10, label: '상대 1마리' },
  { id: 11, label: '상대 모두' },
  { id: 12, label: '필드 전체' },
  { id: 13, label: '자기편 모두' },
  { id: 14, label: '모든 포켓몬' },
  { id: 15, label: '빈사 상태의 포켓몬' },
  { id: 16, label: '자기편 전체' },
] as const;

const TARGET_BY_ID = new Map(MOVE_TARGET_OPTIONS.map((t) => [t.id, t.label]));

export function moveTargetLabel(id: number | null | undefined): string {
  if (id === null || id === undefined) return '—';
  return TARGET_BY_ID.get(id) ?? `target-${id}`;
}

/** ZA legacy_move_id 오프셋. 실측 검증: base+0 / plus+1000 / rogue+2000. */
export const ZA_VARIANTS = ['base', 'plus', 'rogue'] as const;
export type ZaVariant = (typeof ZA_VARIANTS)[number];

export const ZA_LEGACY_OFFSET: Record<ZaVariant, number> = {
  base: 0,
  plus: 1000,
  rogue: 2000,
};

/** ZA 머신 타입 CHECK: TM / HM / TR / null. */
export const ZA_MACHINE_TYPES = ['TM', 'HM', 'TR'] as const;
