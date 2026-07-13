// 폭에 맞춰 표시할 페이지 창(window)을 만든다. 순수 함수.
// maxButtons = 표시 가능한 '번호 버튼' 최대 개수(측정된 폭 기반).
// - total이 maxButtons 이하면 전부 노출.
// - 넘치면 첫·마지막을 항상 유지하고 현재 주변만 남긴 뒤, 빈 구간에 'ellipsis'.
export const getPageWindow = (
  page: number,
  total: number,
  maxButtons: number,
): (number | 'ellipsis')[] => {
  if (total <= 1) return [1];

  const capacity = Math.max(3, Math.floor(maxButtons));

  // 전부 들어가면 그대로 노출.
  if (total <= capacity) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  // 첫·마지막(2칸)을 제외한 나머지를 현재 주변에 배치.
  const inner = capacity - 2;
  const half = Math.floor(inner / 2);

  let start = page - half;
  let end = page + half;
  if (inner % 2 === 0) end -= 1; // 짝수면 오른쪽 하나 줄여 개수 유지

  // 경계를 벗어나면 반대쪽으로 밀어 inner 개수를 유지.
  if (start < 2) {
    end += 2 - start;
    start = 2;
  }
  if (end > total - 1) {
    start -= end - (total - 1);
    end = total - 1;
  }
  start = Math.max(2, start);
  end = Math.min(total - 1, end);

  const items: (number | 'ellipsis')[] = [1];
  if (start > 2) items.push('ellipsis');
  for (let pageNumber = start; pageNumber <= end; pageNumber += 1) {
    items.push(pageNumber);
  }
  if (end < total - 1) items.push('ellipsis');
  items.push(total);

  return items;
};
