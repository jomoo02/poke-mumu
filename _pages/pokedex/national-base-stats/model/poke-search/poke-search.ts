import { createSearchMatcher } from '@/_shared/lib/search';

import type { BaseStatsPoke } from '../base-stats-poke';
// index가 아닌 파일에서 직접: name-language의 index는 URL 훅(useNameLanguage)도 내보낸다 (순수 함수만 쓴다)
import {
  NAME_LANGUAGES,
  getLocalizedName,
  type NameLanguage,
} from '../name-language/name-language';

// 히라가나 → 가타카나. 일본어 이름은 가타카나라 히라가나로 쳐도 찾히게 양쪽을 맞춘다 (ぴかちゅう → ピカチュウ)
const toKatakana = (text: string) =>
  text.replace(/[ぁ-ゖ]/g, (char) =>
    String.fromCharCode(char.charCodeAt(0) + 0x60),
  );

// 숫자만 입력하면 도감 번호로 찾는다 ('25', '025'). 언어와 상관없다
const DEX_NUMBER_PATTERN = /^\d+$/;

const getDexNumberKeyword = (keyword: string) => {
  const trimmed = keyword.trim();

  return DEX_NUMBER_PATTERN.test(trimmed) ? Number(trimmed) : null;
};

// 고른 언어의 이름·폼 이름으로 찾는 매처. 일본어만 검색어와 이름을 가타카나로 맞춘다
const createNameMatcher = (keyword: string, language: NameLanguage) => {
  const normalize =
    language === 'ja' ? toKatakana : (text: string): string => text;

  const matches = createSearchMatcher(normalize(keyword));

  return (poke: BaseStatsPoke) =>
    matches(
      normalize(getLocalizedName(poke, language)),
      poke.form && normalize(getLocalizedName(poke.form, language)),
    );
};

/**
 * 고른 언어의 이름에 검색어가 들어 있거나, 검색어가 도감 번호와 같으면 남긴다.
 * 검색어가 비면 전부 남긴다
 */
const filterPokesByKeyword = (
  pokes: BaseStatsPoke[],
  keyword: string,
  language: NameLanguage,
): BaseStatsPoke[] => {
  if (keyword.trim() === '') {
    return pokes;
  }

  const dexNumber = getDexNumberKeyword(keyword);
  const matches = createNameMatcher(keyword, language);

  return pokes.filter((poke) => poke.dexNumber === dexNumber || matches(poke));
};

/**
 * 고른 언어로는 하나도 안 찾힐 때 다른 언어에서 찾히는 수 (빈 화면의 '영어 이름으로는 3마리' 안내).
 * 도감 번호 검색은 언어와 상관없어 세지 않는다. 찾히는 언어만, NAME_LANGUAGES 순서로
 */
const countMatchesInOtherLanguages = (
  pokes: BaseStatsPoke[],
  keyword: string,
  language: NameLanguage,
): { language: NameLanguage; count: number }[] => {
  if (keyword.trim() === '' || getDexNumberKeyword(keyword) !== null) {
    return [];
  }

  return NAME_LANGUAGES.filter((other) => other !== language).flatMap(
    (other) => {
      const matches = createNameMatcher(keyword, other);
      const count = pokes.filter(matches).length;

      return count > 0 ? [{ language: other, count }] : [];
    },
  );
};

export { filterPokesByKeyword, countMatchesInOtherLanguages };
