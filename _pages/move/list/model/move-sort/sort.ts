import { TYPE_IDENTIFIERS } from '@/_entities/type';
import { DAMAGE_CLASS_IDENTIFIERS } from '@/_entities/damage-class';
import type { Move } from '@/_entities/move';

const SORT_KEYS = [
  'moveNumber',
  'name',
  'type',
  'damageClass',
  'power',
  'accuracy',
  'pp',
] as const;

type SortKey = (typeof SORT_KEYS)[number];

const SORT_ORDERS = ['asc', 'desc'] as const;

type SortOrder = (typeof SORT_ORDERS)[number];

interface MoveSort {
  sort: SortKey;
  order: SortOrder;
}

// 게임 공식 번호순. 기본값은 URL에 쓰지 않는다
const DEFAULT_SORT: MoveSort = { sort: 'moveNumber', order: 'asc' };

const isSameSort = (a: MoveSort, b: MoveSort) =>
  a.sort === b.sort && a.order === b.order;

const koCollator = new Intl.Collator('ko');

const compareNameKo = (a: Move, b: Move) =>
  koCollator.compare(a.nameKo, b.nameKo);

// 정렬 기준값. null은 값이 없다는 뜻이며 방향과 무관하게 맨 뒤로 보낸다
// - 번호는 게임 공식 기술 번호
// - 타입·분류는 게임 표시 순서의 인덱스
// - 명중 null(필중기·변화기)도 다른 null과 같이 맨 뒤
const getSortValue = (move: Move, sort: SortKey): number | null => {
  switch (sort) {
    case 'moveNumber':
      return move.moveNumber;
    case 'type':
      return (TYPE_IDENTIFIERS as readonly string[]).indexOf(
        move.type.identifier,
      );
    case 'damageClass':
      return move.damageClass
        ? (DAMAGE_CLASS_IDENTIFIERS as readonly string[]).indexOf(
            move.damageClass.identifier,
          )
        : null;
    case 'power':
      return move.power;
    case 'accuracy':
      return move.accuracy;
    case 'pp':
      return move.pp;
    case 'name':
      return null;
  }
};

const sortMoves = (
  moves: readonly Move[],
  { sort, order }: MoveSort,
): Move[] => {
  const direction = order === 'asc' ? 1 : -1;

  return [...moves].sort((a, b) => {
    if (sort === 'name') {
      return compareNameKo(a, b) * direction;
    }

    const valueA = getSortValue(a, sort);
    const valueB = getSortValue(b, sort);

    // 한쪽만 null이면 방향과 무관하게 null을 뒤로
    if ((valueA === null) !== (valueB === null)) {
      return valueA === null ? 1 : -1;
    }

    // 값이 같으면(둘 다 null 포함) 이름도 같은 방향으로
    return ((valueA ?? 0) - (valueB ?? 0) || compareNameKo(a, b)) * direction;
  });
};

export type { SortKey, SortOrder, MoveSort };

export { SORT_KEYS, SORT_ORDERS, DEFAULT_SORT, isSameSort, sortMoves };
