// 페이지 번호 윈도잉.
// 규칙: 총 5칸(숫자 최대 4개 + ellipsis), 첫·마지막 페이지는 항상 표시.
//   - totalPages <= 5  → 전부 표시
//   - 앞쪽(page <= 3)  → [1, 2, 3, ellipsis, total]
//   - 뒤쪽(page >= total-2) → [1, ellipsis, total-2, total-1, total]
//   - 중간            → [1, ellipsis, page, ellipsis, total]
export function getPageWindow(
  page: number,
  total: number,
): (number | 'ellipsis')[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  if (page <= 3) return [1, 2, 3, 'ellipsis', total];
  if (page >= total - 2) {
    return [1, 'ellipsis', total - 2, total - 1, total];
  }
  return [1, 'ellipsis', page, 'ellipsis', total];
}
