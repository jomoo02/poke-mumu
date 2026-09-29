import {
  POKE_ABILITY_KINDS,
  type Poke,
  type PokeAbilityKind,
  type PokeAbilityLink,
} from '@/_entities/poke';

// 포켓몬 + 특성과의 관계 정보(숨겨진 여부, 슬롯, 조건)
interface AbilityPoke extends Poke, PokeAbilityLink {}

interface DexOrder {
  dexNumber: number;
  // 같은 종 안에서의 폼 순서 (기본 폼 1)
  sortOrder: number;
}

// 도감 번호 → 폼 순서
const compareDexOrder = (a: DexOrder, b: DexOrder) =>
  a.dexNumber - b.dexNumber || a.sortOrder - b.sortOrder;

// 일반/숨겨진은 하나만 비어 있으면 빈 문구로 알리고, 둘 다 비면(조건부 전용 특성) 생략한다.
// 조건부 그룹은 해당 포켓몬이 있을 때만 보여준다
const getVisibleKinds = (
  groups: Record<PokeAbilityKind, unknown[]>,
): PokeAbilityKind[] => {
  const hasBaseAbility = groups.normal.length > 0 || groups.hidden.length > 0;

  return POKE_ABILITY_KINDS.filter((kind) =>
    kind === 'normal' || kind === 'hidden'
      ? hasBaseAbility
      : groups[kind].length > 0,
  );
};

export type { AbilityPoke };

export { compareDexOrder, getVisibleKinds };
