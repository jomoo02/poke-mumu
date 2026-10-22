import { createSearchMatcher } from '@/_shared/lib/search';
import type { BaseStatsPoke } from '@/_pages/pokedex/national-base-stats/model/base-stats-poke';
import type { PokeSort } from '@/_pages/pokedex/national-base-stats/model/poke-sort';
import { sortPokes } from '@/_pages/pokedex/national-base-stats/model/poke-sort';
import {
  NAME_LANGUAGES,
  type NameLanguage,
} from '@/_pages/pokedex/national-base-stats/model/name-language';

// 정의·이름 함수는 정식 slice로 옮겼다. 검색은 3-3(poke-search), 정렬은 3-4(poke-sort)에서 옮긴다

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

// 고른 언어의 이름(폼 이름 포함)으로 찾는 매처
const createNameMatcher = (keyword: string, language: NameLanguage) => {
  if (language === 'ja') {
    const matches = createSearchMatcher(toKatakana(keyword));

    return (poke: BaseStatsPoke) =>
      matches(toKatakana(poke.nameJa), toKatakana(poke.form?.nameJa ?? ''));
  }

  const matches = createSearchMatcher(keyword);

  return language === 'en'
    ? (poke: BaseStatsPoke) => matches(poke.nameEn, poke.form?.nameEn)
    : (poke: BaseStatsPoke) => matches(poke.nameKo, poke.form?.nameKo);
};

/**
 * 고른 언어의 이름에 검색어가 들어 있거나, 검색어가 도감 번호와 같으면 남긴다.
 * 검색어가 비면 전부 남긴다
 */
const filterPokesByNameKeyword = (
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
 * 고른 언어로는 하나도 안 찾힐 때 다른 언어에서 찾히는 수 (빈 화면의 '영어 이름으로 3마리' 안내).
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

const NAME_COLLATOR: Record<Exclude<NameLanguage, 'ko'>, Intl.Collator> = {
  en: new Intl.Collator('en', { numeric: true, sensitivity: 'base' }),
  ja: new Intl.Collator('ja', { numeric: true }),
};

// 기본 정렬 순서: 도감 번호 → 같은 번호 안의 폼 순서 (poke-sort의 동점 처리와 같다)
const compareDexOrder = (a: BaseStatsPoke, b: BaseStatsPoke) =>
  a.dexNumber - b.dexNumber || a.sortOrder - b.sortOrder;

/**
 * 정렬. 이름순은 고른 언어의 이름(폼을 붙이지 않은 이름)으로, 나머지는 기존 정렬(sortPokes) 그대로.
 * 이름이 같으면(같은 포켓몬의 폼) 기본 정렬 순서로, 동점도 방향을 따라 뒤집는다 (sortPokes와 같다)
 */
const sortPokesByLanguage = (
  pokes: readonly BaseStatsPoke[],
  sortState: PokeSort,
  language: NameLanguage,
): BaseStatsPoke[] => {
  if (sortState.sort !== 'name' || language === 'ko') {
    return sortPokes(pokes, sortState);
  }

  const collator = NAME_COLLATOR[language];
  const direction = sortState.order === 'asc' ? 1 : -1;
  const getName = (poke: BaseStatsPoke) =>
    language === 'en' ? poke.nameEn : poke.nameJa;

  return [...pokes].sort(
    (a, b) =>
      (collator.compare(getName(a), getName(b)) || compareDexOrder(a, b)) *
      direction,
  );
};

export {
  filterPokesByNameKeyword,
  countMatchesInOtherLanguages,
  sortPokesByLanguage,
};
