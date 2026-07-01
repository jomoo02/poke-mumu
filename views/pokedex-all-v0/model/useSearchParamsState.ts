'use client';

import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Updates = Record<string, string | string[] | null>;

export default function useSearchParamsState() {
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

        if (v) {
          params.set(key, v);
        } else {
          params.delete(key);
        }
      }

      if (opts?.resetPage !== false) {
        params.delete('page'); // 기본: 리셋
      }

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
