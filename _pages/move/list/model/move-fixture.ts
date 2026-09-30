import type { Move } from '@/_entities/move';

// 테스트 전용: 필요한 필드만 채운 기술
const makeMove = (
  fields: Partial<Omit<Move, 'type' | 'damageClass'>> &
    Pick<Move, 'nameKo'> & {
      type?: string;
      damageClass?: string | null;
    },
): Move => {
  const { type = 'normal', damageClass = 'physical', ...rest } = fields;

  return {
    id: 0,
    moveNumber: 0,
    identifier: fields.nameKo,
    nameEn: '',
    nameJa: '',
    power: null,
    accuracy: null,
    pp: null,
    description: '',
    ...rest,
    type: { id: 0, identifier: type, nameKo: type },
    damageClass:
      damageClass === null
        ? null
        : { id: 0, identifier: damageClass, nameKo: damageClass },
  };
};

const names = (list: Move[]) => list.map((move) => move.nameKo);

export { makeMove, names };
