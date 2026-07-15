import { useDeferredValue, useEffect, useState, useRef } from 'react';

import { useSearchParamsState } from '../search-params';

const SEARCH_DEBOUNCE_MS = 250;

// 검색 상태를 한곳에서 관리한다.
// - input: 즉시 반영되는 입력값 (URL의 search로 초기화)
// - deferredInput: 리스트 필터링용(렌더 지연으로 타이핑이 안 끊김)
// - onInputChange: 입력 갱신 + 검색 시 페이지 즉시 리셋
// - 내부: 디바운스 + replace로 URL(search) 동기화 → 공유/새로고침 복원(히스토리 안 쌓임)
export function usePokeSearch() {
  const { searchParams, setParams } = useSearchParamsState();

  const urlSearch = searchParams.get('search') ?? '';

  const [input, setInput] = useState(urlSearch);

  const deferredInput = useDeferredValue(input);

  const lastWrittenRef = useRef(urlSearch);

  const onInputChange = (value: string) => {
    setInput(value);
    if (searchParams.get('page')) {
      setParams({});
    }
  };

  // 입력만 비운다(전체 초기화 시 사용). URL은 호출부에서 함께 정리.
  const clearSearch = () => setInput('');

  useEffect(() => {
    if (input === urlSearch) {
      return; // 초기 mount & 이미 반영된 경우 skip
    }

    const timer = setTimeout(() => {
      lastWrittenRef.current = input; // ← 추가: 내가 쓴 값 기록
      setParams({ search: input || null });
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [input, urlSearch, setParams]);

  useEffect(() => {
    if (urlSearch !== lastWrittenRef.current) {
      lastWrittenRef.current = urlSearch;
      setInput(urlSearch);
    }
  }, [urlSearch]);

  return { input, deferredInput, onInputChange, clearSearch };
}
