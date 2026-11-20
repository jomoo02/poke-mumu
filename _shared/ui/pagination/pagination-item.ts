const ELLIPSIS_LEFT = 'ellipsis-left';
const ELLIPSIS_RIGHT = 'ellipsis-right';

type PageItem = number | typeof ELLIPSIS_LEFT | typeof ELLIPSIS_RIGHT;

/**
 * 페이지 번호 목록. 첫·끝·현재는 늘 보이고, 현재 양옆으로 siblingCount개씩 보인다.
 * 칸 수는 많아야 siblingCount * 2 + 5 (첫, …, 양옆, 현재, …, 끝): ±2면 9칸, ±1이면 7칸 (좁은 화면)
 */
const getPaginationItems = (
  currentPage: number,
  totalPages: number,
  siblingCount = 2,
): PageItem[] => {
  // 시작·끝 근처에서 채우는 칸 수 (첫·끝 페이지와 ellipsis 하나를 뺀 나머지)
  const edgeCount = siblingCount * 2 + 1;

  // 이 이하면 ellipsis를 넣어도 줄지 않는다 → 전부 표시 (±2면 7페이지, ±1이면 5페이지)
  if (totalPages <= edgeCount + 2) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const showLeftEllipsis = currentPage > siblingCount + 2;
  const showRightEllipsis = currentPage < totalPages - siblingCount - 1;

  // 시작 근처: 1 ~ max(현재+양옆, edgeCount), …, last
  if (!showLeftEllipsis && showRightEllipsis) {
    const end = Math.max(currentPage + siblingCount, edgeCount);
    const head = Array.from({ length: end }, (_, i) => i + 1);
    return [...head, ELLIPSIS_RIGHT, totalPages];
  }

  // 끝 근처: 1, …, min(현재-양옆, last-edgeCount+1) ~ last (시작 근처와 대칭)
  if (showLeftEllipsis && !showRightEllipsis) {
    const start = Math.min(
      currentPage - siblingCount,
      totalPages - edgeCount + 1,
    );
    const tail = Array.from(
      { length: totalPages - start + 1 },
      (_, i) => start + i,
    );
    return [1, ELLIPSIS_LEFT, ...tail];
  }

  // 가운데: 1, …, 현재±양옆, …, last
  const middle = Array.from(
    { length: siblingCount * 2 + 1 },
    (_, i) => currentPage - siblingCount + i,
  );
  return [1, ELLIPSIS_LEFT, ...middle, ELLIPSIS_RIGHT, totalPages];
};

const isEllipsis = (item: PageItem): item is Exclude<PageItem, number> =>
  typeof item !== 'number';

export type { PageItem };

export { getPaginationItems, isEllipsis };
