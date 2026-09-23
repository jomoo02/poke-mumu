'use client';

import { useSearchParams } from 'next/navigation';

/**
 * 'search' 파라미터 상태(읽기 전용). 검색어를 노출한다.
 * 쓰기(입력·초기화)는 AbilitySearch 입력 컴포넌트가 담당한다.
 */
export function useAbilitySearch() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('search') ?? '';

  return { keyword };
}
