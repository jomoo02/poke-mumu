'use client';

import {
  useMultiSelectParam,
  type SearchParamsStateOptions,
} from '@/shared/lib/search-params';

import type { FilterConfig } from './filter-option';

/**
 * 단일 축 다중선택 필터 상태. URL은 shared 플러밍으로 관리한다.
 * 매칭(리스트 거르기)은 도메인 로직이라 여기 없다 — 뷰가 selected로 직접 거른다.
 *
 * @param config   뷰가 주입하는 필터 설정
 * @param options  startTransition/resetKeys 등 (예: pokedex/all은 resetKeys:['page'])
 */
export function useFilterControl(
  config: FilterConfig,
  options?: SearchParamsStateOptions,
) {
  return useMultiSelectParam(config.key, { max: config.max, ...options });
}
