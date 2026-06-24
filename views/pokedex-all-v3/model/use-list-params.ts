'use client';

import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Updates = Record<string, string | string[] | null>;

/**
 * 모든 URL 쓰기를 한 곳으로 모은다.
 * `page` 리셋 규칙이 단 한 군데에만 존재하게 하여 드리프트를 막는다.
 *
 * 호출 규약:
 * - 타입/모습/정렬 변경: update({ ... })            (기본 = replace + page 리셋)
 * - 페이지 이동: update({ page }, { resetPage: false, history: 'push' })
 * - 검색 변경 시 page 정리: update({})              (changes 없이 호출해 page만 제거)
 */
export function useListParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const update = useCallback(
    (
      changes: Updates,
      opts?: { resetPage?: boolean; history?: 'push' | 'replace' },
    ) => {
      const params = new URLSearchParams(searchParams);

      for (const [key, value] of Object.entries(changes)) {
        const v = Array.isArray(value) ? value.join(',') : value;
        if (v) params.set(key, v);
        else params.delete(key);
      }

      if (opts?.resetPage !== false) params.delete('page'); // 기본: 리셋

      const query = params.toString();
      const url = query ? `${pathname}?${query}` : pathname;

      if (opts?.history === 'push') {
        router.push(url, { scroll: false });
      } else {
        router.replace(url, { scroll: false });
      }
    },
    [router, pathname, searchParams],
  );

  return { searchParams, update };
}
