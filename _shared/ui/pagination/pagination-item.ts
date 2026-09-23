const ELLIPSIS_LEFT = 'ellipsis-left';
const ELLIPSIS_RIGHT = 'ellipsis-right';

type PageItem = number | typeof ELLIPSIS_LEFT | typeof ELLIPSIS_RIGHT;

const getPaginationItems = (
  currentPage: number,
  totalPages: number,
): PageItem[] => {
  // 전체 7페이지 이하 → 전부 표시
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const showLeftEllipsis = currentPage > 4;
  const showRightEllipsis = currentPage < totalPages - 3;

  // 시작 근처: 1 ~ max(현재+2, 5), …, last
  if (!showLeftEllipsis && showRightEllipsis) {
    const end = Math.max(currentPage + 2, 5);
    const head = Array.from({ length: end }, (_, i) => i + 1);
    return [...head, ELLIPSIS_RIGHT, totalPages];
  }

  // 끝 근처: 1, …, min(현재-2, last-4) ~ last (시작 근처와 대칭)
  if (showLeftEllipsis && !showRightEllipsis) {
    const start = Math.min(currentPage - 2, totalPages - 4);
    const tail = Array.from(
      { length: totalPages - start + 1 },
      (_, i) => start + i,
    );
    return [1, ELLIPSIS_LEFT, ...tail];
  }

  // 가운데: 1, …, 현재±2, …, last
  return [
    1,
    ELLIPSIS_LEFT,
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
    ELLIPSIS_RIGHT,
    totalPages,
  ];
};

const isEllipsis = (item: PageItem): item is Exclude<PageItem, number> =>
  typeof item !== 'number';

export type { PageItem };

export { getPaginationItems, isEllipsis };
