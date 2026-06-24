// 페이지 번호 윈도잉: 양 끝 + 현재 주변 + ellipsis.
export function getPageWindow(
  page: number,
  total: number,
): (number | 'ellipsis')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (page <= 4) return [1, 2, 3, 4, 5, 'ellipsis', total];
  if (page >= total - 3) {
    return [1, 'ellipsis', total - 4, total - 3, total - 2, total - 1, total];
  }
  return [1, 'ellipsis', page - 1, page, page + 1, 'ellipsis', total];
}
