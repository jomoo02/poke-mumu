'use client';

import {
  useCallback,
  useMemo,
  useTransition,
  type TransitionStartFunction,
} from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type ParamChanges = Record<string, string | null>;

interface SearchParamsStateOptions {
  // 외부 transition 주입. 여러 컴포넌트가 하나의 isPending을 공유해야 할 때 사용한다
  // (예: 툴바와 목록을 동시에 dim). 미지정 시 내부 useTransition을 쓴다.
  startTransition?: TransitionStartFunction;
  // 값이 바뀔 때마다 함께 비울 키들(예: 'page' → 1페이지로 리셋).
  // setParams/toggleParam에 기본 적용되며, 호출별 옵션으로 덮어쓸 수 있다.
  resetKeys?: string[];
}

interface MutateOptions {
  history?: 'push' | 'replace';
  resetKeys?: string[];
}

/**
 * URL 쿼리스트링을 상태로 다루는 라우터 플러밍. 도메인 지식은 없다.
 * - setParams: 스칼라 값 갱신(같은 키는 하나만 유지)
 * - toggleParam: 다중 값 토글(key=a&key=b 반복 키)
 */
export function useSearchParamsState(options?: SearchParamsStateOptions) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransitionInternal] = useTransition();

  const startTransition = options?.startTransition ?? startTransitionInternal;

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

      // transition으로 감싸 URL 커밋 + 재렌더 동안 isPending을 유지한다.
      // scroll:false — 스크롤은 라우터/가상화가 별도 관리하므로 건드리지 않는다.
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

  return { searchParams, setParams, toggleParam, isPending };
}

export type { SearchParamsStateOptions, MutateOptions, ParamChanges };
