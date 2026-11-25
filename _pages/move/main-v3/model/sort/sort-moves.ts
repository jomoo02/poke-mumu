import type { ListMove } from '../move';

const SORT_KEYS = ['name', 'power', 'accuracy', 'pp'] as const;

type SortKey = (typeof SORT_KEYS)[number];

const SORT_ORDERS = ['asc', 'desc'] as const;

type SortOrder = (typeof SORT_ORDERS)[number];

interface MoveSort {
  sort: SortKey;
  order: SortOrder;
}

// 이름순. 기본값은 URL에 쓰지 않는다
const DEFAULT_SORT: MoveSort = { sort: 'name', order: 'asc' };

const isSameSort = (a: MoveSort, b: MoveSort) =>
  a.sort === b.sort && a.order === b.order;

// 이름순 정렬 규칙 (CLDR): 숫자 → 한글 → 영어 ('3연화살'이 '10만볼트'보다 앞)
const NAME_COLLATOR = new Intl.Collator('ko', { numeric: true });

// 수치 기준값 (null: 값 없음. 변화 기술의 위력, 반드시 맞는 기술의 명중 등)
const getStatValue = (
  move: ListMove,
  sort: Exclude<SortKey, 'name'>,
): number | null => {
  switch (sort) {
    case 'power':
      return move.power;
    case 'accuracy':
      return move.accuracy;
    case 'pp':
      return move.pp;
  }
};

/**
 * 고른 기준으로 정렬하고, 값이 같으면(값 없음끼리 포함) 기술 번호순으로
 * (번호는 화면에 없지만 동점 순서를 고정한다).
 * 동점 순서도 방향을 따라 뒤집는다 (위력 높은 순이면 같은 위력끼리는 번호 반대순).
 * 값이 없는 기술만은 방향과 관계없이 맨 뒤에 둔다
 */
const sortMoves = (
  moves: readonly ListMove[],
  { sort, order }: MoveSort,
): ListMove[] => {
  const direction = order === 'asc' ? 1 : -1;

  return [...moves].sort((a, b) => {
    const byNumber = a.moveNumber - b.moveNumber;

    if (sort === 'name') {
      return (
        (NAME_COLLATOR.compare(a.nameKo, b.nameKo) || byNumber) * direction
      );
    }

    const valueA = getStatValue(a, sort);
    const valueB = getStatValue(b, sort);

    if (valueA === null || valueB === null) {
      if (valueA !== valueB) {
        return valueA === null ? 1 : -1;
      }

      return byNumber * direction;
    }

    return (valueA - valueB || byNumber) * direction;
  });
};

export type { SortKey, SortOrder, MoveSort };

export { SORT_KEYS, SORT_ORDERS, DEFAULT_SORT, isSameSort, sortMoves };
