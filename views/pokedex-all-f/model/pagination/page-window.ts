// 번호형 페이지네이션에 표시할 페이지 창(window)을 만든다. 순수 함수.
// 항상 1·마지막·현재±1을 포함하고, 시작/끝 근처를 보정하며,
// 연속하지 않는 구간에는 'ellipsis'(…)를 끼운다.
export const getPageWindow = (
  page: number,
  total: number,
): (number | 'ellipsis')[] => {
  if (total <= 1) return [1];

  const pages = new Set<number>([1, total, page - 1, page, page + 1]);

  // 시작/끝 보정: 시작 근처면 1·2·3, 끝 근처면 last-2·last-1·last 가 보이게.
  if (page <= 2) {
    pages.add(2);
    pages.add(3);
  }
  if (page >= total - 1) {
    pages.add(total - 1);
    pages.add(total - 2);
  }

  const sorted = [...pages]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);

  // 연속하지 않는(간격 > 1) 구간에 ellipsis 삽입.
  const result: (number | 'ellipsis')[] = [];
  for (let i = 0; i < sorted.length; i += 1) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push('ellipsis');
    result.push(sorted[i]);
  }

  return result;
};
