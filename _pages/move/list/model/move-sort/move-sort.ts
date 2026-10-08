import type { Move } from '@/_entities/move';

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

// 한국어 정렬 규칙(CLDR): 숫자 → 한글 → 영어.
// numeric: 숫자를 글자가 아닌 값으로 비교한다 ('3연화살'이 '1000만볼트'보다 앞)
const koCollator = new Intl.Collator('ko', { numeric: true });

const compareNameKo = (a: Move, b: Move) =>
  koCollator.compare(a.nameKo, b.nameKo);

// 정렬 기준값 (null: 값 없음)
// - 번호는 게임 공식 기술 번호
// - 명중 null(필중기·변화기)도 다른 null과 같이 맨 뒤
const getSortValue = (move: Move, sort: SortKey): number | null => {
  switch (sort) {
    case 'moveNumber':
      return move.moveNumber;
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

// 한 기준으로 비교. null은 값이 없다는 뜻이며 방향과 무관하게 맨 뒤로 보낸다
const compareBy = (a: Move, b: Move, { sort, order }: MoveSort): number => {
  const direction = order === 'asc' ? 1 : -1;

  if (sort === 'name') {
    return compareNameKo(a, b) * direction;
  }

  const valueA = getSortValue(a, sort);
  const valueB = getSortValue(b, sort);

  if (valueA === null || valueB === null) {
    return valueA === valueB ? 0 : valueA === null ? 1 : -1;
  }

  return (valueA - valueB) * direction;
};

// 고른 기준으로 정렬하고, 값이 같으면(null끼리 포함) 기본 정렬(DEFAULT_SORT) 순서로.
// 동점 순서는 방향을 따라 뒤집지 않는다 (위력 높은 순이어도 같은 위력끼리는 번호순)
const sortMoves = (moves: readonly Move[], sortState: MoveSort): Move[] =>
  [...moves].sort(
    (a, b) => compareBy(a, b, sortState) || compareBy(a, b, DEFAULT_SORT),
  );

export type { SortKey, SortOrder, MoveSort };

export { SORT_KEYS, SORT_ORDERS, DEFAULT_SORT, isSameSort, sortMoves };
