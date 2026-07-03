'use client';

import { useState, useDeferredValue } from 'react';

// initialValue는 최초 렌더에서만 사용(URL의 search로 초기화).
// 이후 타이핑 중 URL 변경이 input을 되돌리지 않도록 useState 초기값으로만 쓴다.
export default function useSearchQuery(initialValue = '') {
  const [input, setInput] = useState(initialValue);
  const deferredInput = useDeferredValue(input);

  return { input, setInput, deferredInput };
}
