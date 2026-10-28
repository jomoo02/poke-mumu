'use client';

import { useMemo } from 'react';

import { PAGE_SIZE } from '../config/national-base-stats';
import type { BaseStatsPoke } from './base-stats-poke';
import type { Conditions } from './conditions';
import { deriveResults } from './results';

// 지금 조건의 결과 (계산은 순수 함수 deriveResults)
export function usePokeResults(
  pokes: BaseStatsPoke[],
  { keyword, filter, sortState, language, page }: Conditions,
) {
  return useMemo(
    () =>
      deriveResults(
        pokes,
        { keyword, filter, sortState, language, page },
        PAGE_SIZE,
      ),
    [pokes, keyword, filter, sortState, language, page],
  );
}
