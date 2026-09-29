import type { Enums } from '@/types_db';

type PokeAbilityCondition = Enums<'poke_ability_condition'>;

// poke_ability 관계에만 있는 속성. 특성·포켓몬 자체는 참조하지 않는다
interface PokeAbilityLink {
  isHidden: boolean;
  // 일반 특성 1, 2 / 숨겨진·조건부 특성 null
  slot: number | null;
  // 특정 상태에서만 발동하는 특성 (예: 오거폰 테라스탈 → 초상투영)
  condition: PokeAbilityCondition | null;
}

type PokeAbilityKind = 'normal' | 'hidden' | PokeAbilityCondition;

// 표시 순서. enum 값이 늘면 라벨 맵의 satisfies에서 타입 에러로 드러난다
const POKE_ABILITY_KINDS = [
  'normal',
  'hidden',
  'terastal',
] as const satisfies readonly PokeAbilityKind[];

const POKE_ABILITY_KIND_LABEL = {
  normal: '일반 특성',
  hidden: '숨겨진 특성',
  terastal: '테라스탈 전용 특성',
} satisfies Record<PokeAbilityKind, string>;

// 조건이 있으면 숨겨진 여부보다 조건이 우선한다
const getPokeAbilityKind = (link: PokeAbilityLink): PokeAbilityKind =>
  link.condition ?? (link.isHidden ? 'hidden' : 'normal');

const getPokeAbilityKindLabel = (kind: PokeAbilityKind) =>
  POKE_ABILITY_KIND_LABEL[kind];

// 모든 kind 키를 항상 채워 반환한다. 빈 그룹을 보여줄지는 페이지가 정한다
const groupByPokeAbilityKind = <T extends PokeAbilityLink>(items: T[]) => {
  const groups = Object.fromEntries(
    POKE_ABILITY_KINDS.map((kind) => [kind, [] as T[]]),
  ) as Record<PokeAbilityKind, T[]>;

  for (const item of items) {
    groups[getPokeAbilityKind(item)].push(item);
  }

  return groups;
};

export type { PokeAbilityLink, PokeAbilityKind };

export {
  POKE_ABILITY_KINDS,
  getPokeAbilityKind,
  getPokeAbilityKindLabel,
  groupByPokeAbilityKind,
};
