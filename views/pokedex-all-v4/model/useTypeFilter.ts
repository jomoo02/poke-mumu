'use client';

import useSearchParamsState from './useSearchParamsState';

// 타입 필터 로직(선택 상태·토글·리셋). desktop/mobile UI가 공유한다.
export default function useTypeFilter(max = 2) {
  const { searchParams, toggle, update } = useSearchParamsState();

  const selected = searchParams.getAll('type').filter(Boolean);

  return {
    selected,
    max,
    isMax: selected.length >= max,
    toggle: (id: string) => toggle('type', id),
    reset: () => update({ type: null }),
  };
}
