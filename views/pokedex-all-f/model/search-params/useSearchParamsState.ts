'use client';

import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useNavigationTransition } from './navigation-transition';

type Updates = Record<string, string | null>;

interface NavigateOptions {
  resetPage?: boolean;
  history?: 'push' | 'replace';
}

export function useSearchParamsState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { startTransition } = useNavigationTransition();

  const navigate = useCallback(
    (params: URLSearchParams, history: 'push' | 'replace') => {
      const query = params.toString();
      const url = query ? `${pathname}?${query}` : pathname;

      // 공유 transition으로 감싸면 URL 커밋 + 재정렬 렌더 동안 isPending이 유지된다.
      startTransition(() => {
        if (history === 'push') {
          router.push(url, { scroll: false });
        } else {
          router.replace(url, { scroll: false });
        }
      });
    },
    [router, pathname, startTransition],
  );

  // 스칼라 값(sort, dir 등) 갱신. 같은 키는 항상 하나만 유지된다.
  const update = useCallback(
    (changes: Updates, opts?: NavigateOptions) => {
      const params = new URLSearchParams(searchParams);

      for (const [key, value] of Object.entries(changes)) {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      }

      if (opts?.resetPage !== false) {
        params.delete('page'); // 기본: 리셋
      }

      navigate(params, opts?.history ?? 'replace');
    },
    [searchParams, navigate],
  );

  // 다중 값(type, form) 토글. 반복 키(type=a&type=b) 형태로,
  // 켜는 순서대로 뒤에 쌓이고 끄면 해당 항목만 제거된다.
  // 예: type=fighting&form=mega&type=normal&form=alola
  const toggle = useCallback(
    (key: string, value: string, opts?: NavigateOptions) => {
      const resetPage = opts?.resetPage !== false;

      const entries = Array.from(searchParams.entries()).filter(
        ([k]) => !(resetPage && k === 'page'),
      );

      const exists = entries.some(([k, v]) => k === key && v === value);

      const next: [string, string][] = exists
        ? entries.filter(([k, v]) => !(k === key && v === value))
        : [...entries, [key, value]];

      navigate(new URLSearchParams(next), opts?.history ?? 'replace');
    },
    [searchParams, navigate],
  );

  return { searchParams, update, toggle };
}
