import type { ListAbility } from './list-ability';

// 테스트 전용: 필요한 필드만 채운 특성
const makeAbility = (
  fields: Partial<ListAbility> & Pick<ListAbility, 'nameKo'>,
): ListAbility => ({
  id: 0,
  abilityNumber: 0,
  identifier: fields.nameKo,
  flavorText: '',
  gen: 1,
  isChampions: false,
  ...fields,
});

const names = (list: ListAbility[]) => list.map((ability) => ability.nameKo);

export { makeAbility, names };
