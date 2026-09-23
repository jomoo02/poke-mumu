interface Ability {
  id: number;
  identifier: string;
  nameKo: string;
  flavorText: string;
}

interface AbilityDetail extends Ability {
  nameEn: string;
  nameJa: string;
  gen: number;
  isChampions: boolean;
}

const getAbilityHref = (ability: Ability) => {
  return `/ability/${ability.identifier}`;
};

const getAbilityAppeared = (ability: AbilityDetail) => {
  return ability.isChampions ? '챔피언스' : `${ability.gen}세대`;
};

const getAbilitySubName = (ability: AbilityDetail) => {
  return `${ability.nameEn} / ${ability.nameJa}`;
};

export type { Ability, AbilityDetail };

export { getAbilityHref, getAbilityAppeared, getAbilitySubName };
