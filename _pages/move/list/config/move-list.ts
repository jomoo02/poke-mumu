// URL filter 값의 그룹 이름 (?filter=그룹.값)
const FILTER_GROUP = {
  type: 'type',
  damageClass: 'damageClass',
} as const;

type FilterGroupName = (typeof FILTER_GROUP)[keyof typeof FILTER_GROUP];

// 한 페이지에 보여줄 기술 수
const PAGE_SIZE = 50;

export type { FilterGroupName };

export { FILTER_GROUP, PAGE_SIZE };
