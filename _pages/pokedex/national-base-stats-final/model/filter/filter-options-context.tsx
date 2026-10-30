'use client';

import { createContext, use, type ReactNode } from 'react';

import type { PokeFilterOptions } from './filter-option';

const FilterOptionsContext = createContext<PokeFilterOptions | null>(null);

interface FilterOptionsProviderProps {
  options: PokeFilterOptions;
  children: ReactNode;
}

/**
 * 서버에서 출처별로 모은 필터 선택지 (화면 순서). 페이지(index.tsx)에서 한 번만 넣는다.
 * 고정값이라 props로 여러 단계를 넘기지 않고 필터 훅이 직접 읽는다
 */
export function FilterOptionsProvider({
  options,
  children,
}: FilterOptionsProviderProps) {
  return (
    <FilterOptionsContext value={options}>{children}</FilterOptionsContext>
  );
}

export function useFilterOptions(): PokeFilterOptions {
  const options = use(FilterOptionsContext);

  if (!options) {
    throw new Error(
      'useFilterOptions는 FilterOptionsProvider 안에서만 사용 가능',
    );
  }

  return options;
}
