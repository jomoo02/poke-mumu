'use client';

import { useSearchParamsState } from '@/_shared/lib/search-params';

import { useMoveFilter } from './move-filter';
import { PAGE_RESET_KEYS, SEARCH_PARAMS_KEY } from '../config/search-params';

/**
 * 필터 줄의 초기화(↻): 필터(타입·분류)만 기본값으로 되돌린다.
 * 정렬은 조작하는 곳(테이블 헤더, 모바일 정렬 시트)에서 되돌리고,
 * 검색어는 사용자가 직접 입력한 값이라 건드리지 않는다.
 */
export function useMoveFilterReset() {
  const { setParams } = useSearchParamsState({
    resetKeys: PAGE_RESET_KEYS,
  });

  // 목록 계산과 같은 기준: 유효한 identifier만 남긴 필터로 판단한다
  // (?type=foo 같은 잘못된 값만 있으면 목록도 전체라 초기화할 것이 없다)
  const { types, damageClasses } = useMoveFilter();

  const isActive = types.length > 0 || damageClasses.length > 0;

  const reset = () => {
    // 이미 기본 상태면 URL을 건드리지 않는다 (page 리셋 방지)
    if (!isActive) {
      return;
    }

    // page는 resetKeys로 함께 지워진다
    setParams({
      [SEARCH_PARAMS_KEY.type]: null,
      [SEARCH_PARAMS_KEY.damageClass]: null,
    });
  };

  return { isActive, reset };
}
