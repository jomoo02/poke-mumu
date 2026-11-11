import { createSearchMatcher } from '@/_shared/lib/search';

import type { ListAbility } from '../ability';

// 한글 이름에 검색어가 들어 있으면 남긴다. 검색어가 비면 전부 남긴다
const filterAbilitiesByKeyword = (
  abilities: ListAbility[],
  keyword: string,
): ListAbility[] => {
  const matches = createSearchMatcher(keyword);

  return abilities.filter((ability) => matches(ability.nameKo));
};

export { filterAbilitiesByKeyword };
