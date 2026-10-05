'use client';

import { useCallback, useMemo } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

type ParamChanges = Record<string, string | null>;

interface SearchParamsStateOptions {
  // 값이 바뀔 때마다 함께 비울 키들(예: 'page' → 1페이지로 리셋).
  // setParams/toggleParam에 기본 적용되며, 호출별 옵션으로 덮어쓸 수 있다.
  resetKeys?: string[];
}

interface MutateOptions {
  history?: 'push' | 'replace';
  resetKeys?: string[];
}

/**
 * URL 쿼리스트링을 상태로 다루는 플러밍. 도메인 지식은 없다.
 * - setParams: 스칼라 값 갱신(같은 키는 하나만 유지)
 * - toggleParam: 다중 값 토글(key=a&key=b 반복 키)
 *
 * URL은 router.replace/push가 아닌 history API로 바꾼다.
 * 검색·필터·정렬은 클라이언트에서만 계산하고 서버는 searchParams를 읽지 않는데,
 * 라우터 이동은 서버에 RSC를 요청하고 그 응답을 기다린 뒤에야 화면이 바뀐다.
 * history API는 Next.js가 useSearchParams와 동기화해 주므로 요청 없이 바로 반영된다.
 */
export function useSearchParamsState(options?: SearchParamsStateOptions) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 인라인 배열이 매 렌더 새 참조가 되어 useCallback을 깨뜨리지 않도록 안정화한다.
  const resetKeysSignature = (options?.resetKeys ?? []).join(' ');

  const defaultResetKeys = useMemo(
    () => (resetKeysSignature ? resetKeysSignature.split(' ') : []),
    [resetKeysSignature],
  );

  const navigate = useCallback(
    (params: URLSearchParams, history: 'push' | 'replace') => {
      const query = params.toString();
      const url = query ? `${pathname}?${query}` : pathname;

      // 스크롤은 건드리지 않는다 (history API는 스크롤하지 않는다)
      if (history === 'push') {
        window.history.pushState(null, '', url);
      } else {
        window.history.replaceState(null, '', url);
      }
    },
    [pathname],
  );

  const setParams = useCallback(
    (changes: ParamChanges, mutateOptions?: MutateOptions) => {
      const params = new URLSearchParams(searchParams);

      const resetKeys = mutateOptions?.resetKeys ?? defaultResetKeys;
      for (const key of resetKeys) {
        params.delete(key);
      }

      // changes가 reset 대상 키를 다시 세팅하면 changes가 이긴다(delete 먼저).
      for (const [key, value] of Object.entries(changes)) {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      }

      navigate(params, mutateOptions?.history ?? 'replace');
    },
    [searchParams, navigate, defaultResetKeys],
  );

  const toggleParam = useCallback(
    (key: string, value: string, mutateOptions?: MutateOptions) => {
      const entries = Array.from(searchParams.entries());

      const exists = entries.some(
        ([entryKey, entryValue]) => entryKey === key && entryValue === value,
      );

      // 켜는 순서대로 뒤에 쌓이고, 끄면 해당 항목만 제거한다.
      const nextEntries: [string, string][] = exists
        ? entries.filter(
            ([entryKey, entryValue]) =>
              !(entryKey === key && entryValue === value),
          )
        : [...entries, [key, value]];

      const params = new URLSearchParams(nextEntries);

      const resetKeys = mutateOptions?.resetKeys ?? defaultResetKeys;
      for (const resetKey of resetKeys) {
        params.delete(resetKey);
      }

      navigate(params, mutateOptions?.history ?? 'replace');
    },
    [searchParams, navigate, defaultResetKeys],
  );

  return { searchParams, setParams, toggleParam };
}

export type { SearchParamsStateOptions, MutateOptions, ParamChanges };
