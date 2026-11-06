import { createSearchMatcher } from '@/_shared/lib/search';

import type { BaseStatsPoke } from '../poke';

// 숫자만 입력하면 도감 번호로 찾는다 ('25', '025')
const DEX_NUMBER_PATTERN = /^\d+$/;

const getDexNumberKeyword = (keyword: string) => {
  const trimmed = keyword.trim();

  return DEX_NUMBER_PATTERN.test(trimmed) ? Number(trimmed) : null;
};

/**
 * 이름·폼 이름에 검색어가 들어 있거나, 검색어가 도감 번호와 같으면 남긴다.
 * 검색어가 비면 전부 남긴다
 */
const filterPokesByKeyword = (
  pokes: BaseStatsPoke[],
  keyword: string,
): BaseStatsPoke[] => {
  if (keyword.trim() === '') {
    return pokes;
  }

  const dexNumber = getDexNumberKeyword(keyword);
  const matches = createSearchMatcher(keyword);

  return pokes.filter(
    (poke) =>
      poke.dexNumber === dexNumber ||
      matches(poke.nameKo, poke.form && poke.form.nameKo),
  );
};

export { filterPokesByKeyword };
