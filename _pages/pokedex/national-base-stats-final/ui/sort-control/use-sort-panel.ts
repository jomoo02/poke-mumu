import { useState } from 'react';

import type { PokeSort } from '../../model/sort';

// 시트·팝오버의 열림 상태
export function useSortPanel(sortState: PokeSort) {
  const [open, setOpen] = useState(false);

  // 닫히는 동안(애니메이션) 정렬 순서 칸이 새 기준의 칸으로 바뀌어 보이지 않게, 닫기 직전의 정렬을 붙잡아 둔다.
  // 기준을 고르면 반영과 닫기가 같은 클릭에서 일어나 순서 칸 글자가 '번호순' → '높은 순'으로 바뀐 채 내려갔다.
  // 이 클릭 핸들러 안의 sortState는 아직 바뀌기 전 값이다. 다시 열 때 비운다
  const [closingSort, setClosingSort] = useState<PokeSort | null>(null);

  const onOpenChange = (next: boolean) => {
    setClosingSort(next ? null : sortState);
    setOpen(next);
  };

  // 순서 칸이 보여 줄 정렬: 닫히는 중이면 닫기 직전 기준의 칸을 그대로 둔다.
  // 같은 기준에서 순서만 고른 경우엔 고른 순서를 보여 준다 (누른 칸에 점이 찍힌 채 닫힌다)
  const shownOrderSort =
    closingSort && closingSort.sort !== sortState.sort
      ? closingSort
      : sortState;

  return {
    open,
    onOpenChange,
    close: () => onOpenChange(false),
    shownOrderSort,
  };
}
