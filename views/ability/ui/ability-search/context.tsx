'use client';

import { createContext, useContext, type ReactNode } from 'react';

import { useAbilitySearch } from './useAbilitySearch';

interface AbilitySearchValue {
  /** 입력창에 그대로 보이는 값. */
  input: string;
  /** 목록 필터링용. 렌더 지연으로 타이핑이 안 끊긴다. */
  deferredInput: string;
  onInputChange: (value: string) => void;
  clearSearch: () => void;
}

const AbilitySearchContext = createContext<AbilitySearchValue | null>(null);

/**
 * 검색어는 타이핑마다 바뀌는 고빈도 상태라 로컬 state가 원본이고, URL은 디바운스로
 * 뒤따라오는 복제본이다(공유·새로고침 복원용). 따라서 목록은 URL이 아니라 이 컨텍스트를
 * 읽어야 결과가 즉시 갱신된다. 입력창과 목록이 형제라 컨텍스트로 공유한다.
 */
export function AbilitySearchProvider({ children }: { children: ReactNode }) {
  const value = useAbilitySearch();

  return (
    <AbilitySearchContext.Provider value={value}>
      {children}
    </AbilitySearchContext.Provider>
  );
}

export function useAbilitySearchContext() {
  const ctx = useContext(AbilitySearchContext);

  if (!ctx) {
    throw new Error(
      'useAbilitySearchContext must be used within an AbilitySearchProvider',
    );
  }

  return ctx;
}
