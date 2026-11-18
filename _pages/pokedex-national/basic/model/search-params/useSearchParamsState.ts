'use client';

import { useCallback, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SEARCH_PARAM_KEYS } from '.';

type ParamUpdates = Record<string, string | null>;

interface NavigateOptions {
  history?: 'push' | 'replace';
}

export function useSearchParamsState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const navigate = useCallback(
    (params: URLSearchParams, history: 'push' | 'replace') => {
      const query = params.toString();
      const url = query ? `${pathname}?${query}` : pathname;

      startTransition(() => {
        if (history === 'push') {
          router.push(url, { scroll: false });
        } else {
          router.replace(url, { scroll: false });
        }
      });
    },
    [router, pathname],
  );

  // 스칼라 값(sort) 갱신. 같은 키는 항상 하나만 유지된다.
  const setParams = useCallback(
    (changes: ParamUpdates, options?: NavigateOptions) => {
      const params = new URLSearchParams(searchParams);

      for (const [key, value] of Object.entries(changes)) {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      }

      navigate(params, options?.history ?? 'replace');
    },
    [searchParams, navigate],
  );

  // 다중 값(type, form) 토글. 반복 키(type=a&type=b) 형태로,
  // 켜는 순서대로 뒤에 쌓이고 끄면 해당 항목만 제거된다.
  const toggleParam = useCallback(
    (key: string, value: string, options?: NavigateOptions) => {
      const entries = Array.from(searchParams.entries());

      const exists = entries.some(
        ([entryKey, entryValue]) => entryKey === key && entryValue === value,
      );

      const nextEntries: [string, string][] = exists
        ? entries.filter(
            ([entryKey, entryValue]) =>
              !(entryKey === key && entryValue === value),
          )
        : [...entries, [key, value]];

      navigate(new URLSearchParams(nextEntries), options?.history ?? 'replace');
    },
    [searchParams, navigate],
  );

  const isActive =
    searchParams.getAll(SEARCH_PARAM_KEYS.type).filter(Boolean).length > 0 ||
    searchParams.getAll(SEARCH_PARAM_KEYS.form).filter(Boolean).length > 0 ||
    searchParams.getAll(SEARCH_PARAM_KEYS.gen).filter(Boolean).length > 0 ||
    Boolean(searchParams.get(SEARCH_PARAM_KEYS.sort));

  const resetParams = useCallback(() => {
    startTransition(() => {
      setParams({ type: null, sort: null, form: null, gen: null });
    });
  }, [setParams]);

  return { searchParams, setParams, toggleParam, resetParams, isActive };
}
