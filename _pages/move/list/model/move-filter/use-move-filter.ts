'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import { parseMoveFilter, type MoveFilter } from './move-filter';
import { SEARCH_PARAMS_KEY } from '../../config/search-params';

// 목록 계산용 읽기 전용 필터 상태. 토글·초기화는 필터 UI가 useMultiSelectParam으로 한다
export function useMoveFilter(): MoveFilter {
  const searchParams = useSearchParams();

  // getAll은 매번 새 배열이라 문자열로 memo 의존성을 안정화한다
  const typesSignature = searchParams.getAll(SEARCH_PARAMS_KEY.type).join(',');
  const damageClassesSignature = searchParams
    .getAll(SEARCH_PARAMS_KEY.damageClass)
    .join(',');

  return useMemo(
    () =>
      parseMoveFilter(
        typesSignature.split(','),
        damageClassesSignature.split(','),
      ),
    [typesSignature, damageClassesSignature],
  );
}
