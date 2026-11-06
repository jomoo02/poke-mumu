import { cn } from '@/_shared/lib/cn';

import type { PokeSort } from '../model/sort';

/**
 * 정렬 방향 표시: 위(▲ 오름차순)·아래(▼ 내림차순) 삼각형을 늘 함께 두고 (업비트 같은 거래 사이트의 머리글),
 * 지금 기준이면 그 방향의 삼각형만 primary로 칠한다 (hover로는 바뀌지 않는다). 아이콘 대신 CSS 테두리로 그린다 (8×5px, 간격 3px).
 * 표 머리글·정렬 목록(sort-option-list)이 함께 쓴다. 방향은 aria-sort·접근 이름이 알리므로 장식으로 숨긴다
 */
export default function SortTriangles({
  order,
}: {
  order: PokeSort['order'] | null;
}) {
  const triangleClass = (direction: PokeSort['order']) =>
    cn(
      'size-0 border-x-4 border-x-transparent',
      direction === 'asc'
        ? 'border-b-[5px] border-b-current'
        : 'border-t-[5px] border-t-current',
      order === direction ? 'text-primary' : 'text-foreground/25',
    );

  return (
    <span aria-hidden="true" className="flex flex-col gap-0.75">
      <span className={triangleClass('asc')} />
      <span className={triangleClass('desc')} />
    </span>
  );
}
