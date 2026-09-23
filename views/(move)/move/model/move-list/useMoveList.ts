import { useSearchParams } from 'next/navigation';

import type { Move } from '@/entities/move/model';

import { SEARCH_PARAM_KEYS } from '../search-params';
import { useMemo } from 'react';
import { createSearchMatcher } from '@/shared/lib/search';

export function useMoveList(moves: Move[]) {
  const searchParams = useSearchParams();

  const query = searchParams.get(SEARCH_PARAM_KEYS.search) || '';

  return useMemo(() => {
    const mactheName = createSearchMatcher(query);
    return moves.filter((move) => mactheName(move.nameKo));
  }, [moves, query]);
}
