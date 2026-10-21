import { getPokeName } from '@/_entities/poke';
import { createSearchMatcher } from '@/_shared/lib/search';
import type { BaseStatsPoke } from '@/_pages/pokedex/national-base-stats/model/base-stats-poke';
import type { PokeSort } from '@/_pages/pokedex/national-base-stats/model/poke-sort';
import { sortPokes } from '@/_pages/pokedex/national-base-stats/model/poke-sort';

/*
 * 이름 표기 언어. 고른 언어 하나가 목록의 이름 표시·검색 대상·이름순 정렬을 함께 정한다
 * (예전엔 세 언어로 찾고 한글로만 보여 줘서, 영어로 찾으면 다른 이름이 나와 헷갈렸다)
 */

const NAME_LANGUAGES = ['ko', 'en', 'ja'] as const;

type NameLanguage = (typeof NAME_LANGUAGES)[number];

const DEFAULT_NAME_LANGUAGE: NameLanguage = 'ko';

// 고르는 목록의 이름과 그 언어로 쓴 예시 (예시가 곧 설명이다)
const NAME_LANGUAGE_OPTIONS: readonly {
  value: NameLanguage;
  label: string;
  example: string;
}[] = [
  { value: 'ko', label: '한국어', example: '피카츄' },
  { value: 'en', label: '영어', example: 'Pikachu' },
  { value: 'ja', label: '일본어', example: 'ピカチュウ' },
];

const NAME_LANGUAGE_LABEL: Record<NameLanguage, string> = {
  ko: '한국어',
  en: '영어',
  ja: '일본어',
};

// 검색창 안내 글자 (이름 예시 + 도감 번호)
const SEARCH_PLACEHOLDER: Record<NameLanguage, string> = {
  ko: '피카츄, 25',
  en: 'Pikachu, 25',
  ja: 'ピカチュウ, 25',
};

/**
 * 고른 언어의 이름. 폼은 한국어와 같은 경우에만(약칭이 있을 때) '이름 (폼)'으로 붙인다.
 * 영어·일본어는 약칭이 없어 폼 정식 명칭을 쓴다 (나옹 (가라르) / Meowth (Galarian) / ニャース (ガラルのすがた)).
 * 메가진화처럼 이름에 폼이 이미 들어간 경우는 붙이지 않는다 (메가리자몽X / Mega Charizard X)
 */
const getNameByLanguage = (
  poke: Pick<BaseStatsPoke, 'nameKo' | 'nameEn' | 'nameJa' | 'form'>,
  language: NameLanguage,
): string => {
  if (language === 'ko') {
    return getPokeName(poke);
  }

  const name = language === 'en' ? poke.nameEn : poke.nameJa;
  const form = poke.form;

  if (!form?.shortKo) {
    return name;
  }

  return `${name} (${language === 'en' ? form.nameEn : form.nameJa})`;
};

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

  return pokes.filter(
    (poke) => poke.dexNumber === dexNumber || matches(poke),
  );
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
 * 이름이 같으면(같은 포켓몬의 폼) 방향과 무관하게 기본 정렬 순서로
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
      collator.compare(getName(a), getName(b)) * direction ||
      compareDexOrder(a, b),
  );
};

export type { NameLanguage };

export {
  NAME_LANGUAGES,
  DEFAULT_NAME_LANGUAGE,
  NAME_LANGUAGE_OPTIONS,
  NAME_LANGUAGE_LABEL,
  SEARCH_PLACEHOLDER,
  getNameByLanguage,
  filterPokesByNameKeyword,
  countMatchesInOtherLanguages,
  sortPokesByLanguage,
};
