'use client';

import { useState, useDeferredValue } from 'react';

// 검색어는 URL에 두지 않는다(새로고침·뒤로가기·공유 대상에서 제외).
// 순수 로컬 상태로만 관리 → 동기화·디바운스·IME round-trip 문제 없음.
export function useSearchQuery() {
  const [input, setInput] = useState('');
  const effectiveQuery = useDeferredValue(input); // 필터링은 이걸로(저우선순위)

  return { input, setInput, effectiveQuery };
}
