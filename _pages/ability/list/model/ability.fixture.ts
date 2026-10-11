import type { AbilityDetail } from '@/_entities/ability';

// 테스트 전용: 필요한 필드만 채운 특성
const makeAbility = (
  fields: Partial<AbilityDetail> & Pick<AbilityDetail, 'nameKo'>,
): AbilityDetail => ({
  id: 0,
  abilityNumber: 0,
  identifier: fields.nameKo,
  flavorText: '',
  nameEn: '',
  nameJa: '',
  gen: 1,
  isChampions: false,
  ...fields,
});

const names = (list: AbilityDetail[]) => list.map((ability) => ability.nameKo);

export { makeAbility, names };
