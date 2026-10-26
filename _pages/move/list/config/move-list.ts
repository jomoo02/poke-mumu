// 필터 그룹. 값이 곧 URL 키다 (?type=fire,grass&damageClass=physical)
const FILTER_GROUP = {
  type: 'type',
  damageClass: 'damageClass',
} as const;

type FilterGroupName = (typeof FILTER_GROUP)[keyof typeof FILTER_GROUP];

// 한 페이지에 보여줄 기술 수
const PAGE_SIZE = 70;

export type { FilterGroupName };

export { FILTER_GROUP, PAGE_SIZE };
