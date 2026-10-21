// URL filter 값의 그룹 이름 (?filter=그룹.값)
const FILTER_GROUP = {
  type: 'type',
} as const;

type FilterGroupName = (typeof FILTER_GROUP)[keyof typeof FILTER_GROUP];

// 포켓몬은 타입이 최대 2개라 그 이상 고르면 결과가 항상 비어 있다
const MAX_TYPE_SELECTION = 2;

// 한 페이지에 보여줄 포켓몬 수
const PAGE_SIZE = 70;

export type { FilterGroupName };

export { FILTER_GROUP, MAX_TYPE_SELECTION, PAGE_SIZE };
