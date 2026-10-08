import { createSearchMatcher } from '@/_shared/lib/search';
import type { Move } from '@/_entities/move';

// 한글·영문·일본어 이름 중 하나라도 검색어를 포함하면 남긴다. 검색어가 비면 전부 남긴다.
const filterMovesByKeyword = (moves: Move[], keyword: string): Move[] => {
  const matches = createSearchMatcher(keyword);

  return moves.filter(({ nameKo, nameEn, nameJa }) =>
    matches(nameKo, nameEn, nameJa),
  );
};

export { filterMovesByKeyword };
