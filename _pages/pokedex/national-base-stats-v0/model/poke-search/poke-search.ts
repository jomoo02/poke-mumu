import { createSearchMatcher } from '@/_shared/lib/search';

import type { BaseStatsPoke } from '../base-stats-poke';

// 숫자만 입력하면 도감 번호로 찾는다 ('25', '025' → 피카추와 그 폼들)
const DEX_NUMBER_PATTERN = /^\d+$/;

/**
 * 한글·영문·일본어 이름, 폼 이름(예: 가라르의 모습) 중 하나라도 검색어를 포함하거나
 * 검색어가 도감 번호와 같으면 남긴다. 검색어가 비면 전부 남긴다.
 */
const filterPokesByKeyword = (
  pokes: BaseStatsPoke[],
  keyword: string,
): BaseStatsPoke[] => {
  const matches = createSearchMatcher(keyword);

  const trimmed = keyword.trim();

  const dexNumber = DEX_NUMBER_PATTERN.test(trimmed) ? Number(trimmed) : null;

  return pokes.filter(
    (poke) =>
      poke.dexNumber === dexNumber ||
      matches(poke.nameKo, poke.nameEn, poke.nameJa, poke.form?.nameKo),
  );
};

export { filterPokesByKeyword };
