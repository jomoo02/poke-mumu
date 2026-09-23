import { createSearchMatcher } from '@/_shared/lib/search';
import type { AbilityDetail } from '@/_entities/ability/model';

// 한글·영문·일본어 이름 중 하나라도 검색어를 포함하면 남긴다. 검색어가 비면 전부 남긴다.
const filterAbilities = (
  abilities: AbilityDetail[],
  keyword: string,
): AbilityDetail[] => {
  const matches = createSearchMatcher(keyword);

  return abilities.filter(({ nameKo, nameEn, nameJa }) =>
    matches(nameKo, nameEn, nameJa),
  );
};

export { filterAbilities };
