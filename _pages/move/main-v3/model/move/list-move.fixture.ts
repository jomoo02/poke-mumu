import type { ListMove } from './list-move';

// 테스트 전용: 필요한 필드만 채운 기술. type·damageClass는 identifier로 받는다 (damageClass: null은 Z·다이맥스)
const makeMove = (
  fields: Partial<Omit<ListMove, 'type' | 'damageClass'>> &
    Pick<ListMove, 'nameKo'> & {
      type?: string;
      damageClass?: string | null;
    },
): ListMove => {
  const { type = 'normal', damageClass = 'physical', ...rest } = fields;

  return {
    id: 0,
    moveNumber: 0,
    identifier: fields.nameKo,
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

const names = (list: ListMove[]) => list.map((move) => move.nameKo);

export { makeMove, names };
