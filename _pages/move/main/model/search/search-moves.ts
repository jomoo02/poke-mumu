import { createSearchMatcher } from '@/_shared/lib/search';

import type { ListMove } from '../move';

// 한글 이름에 검색어가 들어 있으면 남긴다. 검색어가 비면 전부 남긴다
const filterMovesByKeyword = (
  moves: ListMove[],
  keyword: string,
): ListMove[] => {
  const matches = createSearchMatcher(keyword);

  return moves.filter((move) => matches(move.nameKo));
};

export { filterMovesByKeyword };
