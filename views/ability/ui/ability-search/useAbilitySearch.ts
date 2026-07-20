'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from 'react';

const SEARCH_DEBOUNCE_MS = 100;

// 검색 상태를 한곳에서 관리한다.
// - input: 즉시 반영되는 입력값 (URL의 search로 초기화)
// - deferredInput: 목록 필터링용(렌더 지연으로 타이핑이 안 끊김)
// - 내부: 디바운스 + replace로 URL(search) 동기화 → 공유/새로고침 복원(히스토리 안 쌓임)
export function useAbilitySearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlSearch = searchParams.get('search') ?? '';

  const [input, setInput] = useState(urlSearch);

  const deferredInput = useDeferredValue(input);

  // 디바운스로 '내가' 써넣은 값. URL→input 역동기화에서
  // 내 쓰기와 외부 변경(뒤로/앞으로 가기)을 구분하는 용도.
  const lastWrittenRef = useRef(urlSearch);

  // 쿼리가 비면 pathname만 남긴다(`?` 꼬리를 붙이지 않는다).
  // 캐시 컴포넌트라 첫 진입 경로와 문자열이 정확히 같아야 한다.
  const commitSearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set('search', value);
      } else {
        params.delete('search');
      }

      const query = params.toString();

      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [searchParams, pathname, router],
  );

  const onInputChange = (value: string) => setInput(value);

  // 입력만 비운다. URL은 아래 디바운스 effect가 정리한다.
  const clearSearch = () => setInput('');

  // 입력 → URL. commitSearch가 searchParams에 의존하므로 타이핑 중
  // 필터가 바뀌면 타이머가 리셋된다(낡은 스냅샷으로 필터를 덮어쓰지 않음).
  useEffect(() => {
    if (input === urlSearch) {
      return; // 초기 mount & 이미 반영된 경우 skip
    }

    const timer = setTimeout(() => {
      lastWrittenRef.current = input;
      commitSearch(input);
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [input, urlSearch, commitSearch]);

  // URL → 입력. 뒤로/앞으로 가기처럼 밖에서 바뀐 경우만 되돌려 받는다.
  useEffect(() => {
    if (urlSearch !== lastWrittenRef.current) {
      lastWrittenRef.current = urlSearch;
      setInput(urlSearch);
    }
  }, [urlSearch]);

  return { input, deferredInput, onInputChange, clearSearch };
}
