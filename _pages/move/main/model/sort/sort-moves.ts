import type { ListMove } from '../move';

const SORT_KEYS = ['moveNumber', 'name', 'power', 'accuracy', 'pp'] as const;

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

// 이름순 정렬 규칙 (CLDR): 숫자 → 한글 → 영어 ('3연화살'이 '10만볼트'보다 앞)
const NAME_COLLATOR = new Intl.Collator('ko', { numeric: true });

// 수치 기준값 (null: 값 없음. 변화 기술의 위력, 반드시 맞는 기술의 명중 등)
const getStatValue = (
  move: ListMove,
  sort: Exclude<SortKey, 'name'>,
): number | null => {
  switch (sort) {
    case 'moveNumber':
      return move.moveNumber;
    case 'power':
      return move.power;
    case 'accuracy':
      return move.accuracy;
    case 'pp':
      return move.pp;
  }
};

// 한 기준으로 비교. 값이 없는 기술은 방향과 관계없이 맨 뒤
const compareBy = (
  a: ListMove,
  b: ListMove,
  { sort, order }: MoveSort,
): number => {
  const direction = order === 'asc' ? 1 : -1;

  if (sort === 'name') {
    return NAME_COLLATOR.compare(a.nameKo, b.nameKo) * direction;
  }

  const valueA = getStatValue(a, sort);
  const valueB = getStatValue(b, sort);

  if (valueA === null || valueB === null) {
    return valueA === valueB ? 0 : valueA === null ? 1 : -1;
  }

  return (valueA - valueB) * direction;
};

// 고른 기준으로 정렬하고, 값이 같으면(값 없음끼리 포함) 기본 정렬(번호순)로.
// 동점 순서는 방향을 따라 뒤집지 않는다 (위력 높은 순이어도 같은 위력끼리는 번호순)
const sortMoves = (
  moves: readonly ListMove[],
  sortState: MoveSort,
): ListMove[] =>
  [...moves].sort(
    (a, b) => compareBy(a, b, sortState) || compareBy(a, b, DEFAULT_SORT),
  );

export type { SortKey, SortOrder, MoveSort };

export { SORT_KEYS, SORT_ORDERS, DEFAULT_SORT, isSameSort, sortMoves };
