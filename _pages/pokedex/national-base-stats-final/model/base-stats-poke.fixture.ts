import type { BaseStats, BaseStatsPoke } from './base-stats-poke';

// 테스트 전용: 필요한 필드만 채운 포켓몬
const makePoke = (
  fields: Partial<Omit<BaseStatsPoke, 'type1' | 'type2' | 'stats'>> &
    Pick<BaseStatsPoke, 'nameKo'> & {
      types?: [string] | [string, string];
      stats?: Partial<BaseStats>;
    },
): BaseStatsPoke => {
  const { types = ['normal'], stats, ...rest } = fields;
  const [type1, type2] = types;

  return {
    pokeKey: fields.nameKo,
    nameEn: '',
    nameJa: '',
    dexNumber: 0,
    sortOrder: 1,
    gen: null,
    sprite: '',
    form: null,
    ...rest,
    type1: { id: 0, identifier: type1, nameKo: type1 },
    type2: type2 ? { id: 0, identifier: type2, nameKo: type2 } : null,
    stats: {
      hp: 0,
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0,
      total: 0,
      ...stats,
    },
  };
};

const names = (list: BaseStatsPoke[]) => list.map((poke) => poke.nameKo);

export { makePoke, names };
