import type { BaseStatsPoke } from '../base-stats-poke';

/*
 * 이름 표기 언어. 고른 언어 하나가 목록의 이름 표시·검색 대상·이름순 정렬을 함께 정한다
 * (예전엔 세 언어로 찾고 한글로만 보여 줘서, 영어로 찾으면 다른 이름이 나와 헷갈렸다)
 */

const NAME_LANGUAGES = ['ko', 'en', 'ja'] as const;

type NameLanguage = (typeof NAME_LANGUAGES)[number];

const DEFAULT_NAME_LANGUAGE: NameLanguage = 'ko';

interface NameLanguageOption {
  value: NameLanguage;
  // 언어 이름 (선택 목록·트리거·검색창 접근 이름·빈 결과 안내)
  label: string;
  // 그 언어로 쓴 예시 이름 (예시가 곧 설명이다)
  example: string;
}

// 배열 순서가 선택 목록의 순서다
const NAME_LANGUAGE_OPTIONS: readonly NameLanguageOption[] = [
  {
    value: 'ko',
    label: '한국어',
    example: '피카츄',
  },
  {
    value: 'en',
    label: '영어',
    example: 'Pikachu',
  },
  {
    value: 'ja',
    label: '일본어',
    example: 'ピカチュウ',
  },
];

const getNameLanguageOption = (language: NameLanguage): NameLanguageOption =>
  NAME_LANGUAGE_OPTIONS.find((option) => option.value === language) ??
  NAME_LANGUAGE_OPTIONS[0];

const getNameLanguageLabel = (language: NameLanguage): string =>
  getNameLanguageOption(language).label;

// 검색창 안내 글자 (언어와 상관없이 같다)
const SEARCH_PLACEHOLDER = '도감번호 또는 이름으로 검색';

// 세 언어 이름을 가진 것 (포켓몬·폼)
type LocalizedNames = Pick<BaseStatsPoke, 'nameKo' | 'nameEn' | 'nameJa'>;

const getLocalizedName = (
  names: LocalizedNames,
  language: NameLanguage,
): string =>
  language === 'ko'
    ? names.nameKo
    : language === 'en'
      ? names.nameEn
      : names.nameJa;

// 이름 줄: 폼을 붙이지 않은 고른 언어의 이름 (나옹 / Meowth / ニャース)
const getBaseName = (
  poke: Pick<BaseStatsPoke, 'nameKo' | 'nameEn' | 'nameJa'>,
  language: NameLanguage,
): string => getLocalizedName(poke, language);

/**
 * 모습 줄: 폼 정식 이름 (가라르의 모습 / Galarian / ガラルのすがた). 없으면 null.
 * 약칭이 있는 폼(shortKo)에만 붙인다. 메가진화처럼 이름에 폼이 이미 들어간 경우는 붙이지 않는다
 * (메가리자몽X / Mega Charizard X)
 */
const getFormName = (
  poke: Pick<BaseStatsPoke, 'form'>,
  language: NameLanguage,
): string | null =>
  poke.form?.shortKo ? getLocalizedName(poke.form, language) : null;

export type { NameLanguage, NameLanguageOption };

export {
  NAME_LANGUAGES,
  DEFAULT_NAME_LANGUAGE,
  NAME_LANGUAGE_OPTIONS,
  getNameLanguageLabel,
  SEARCH_PLACEHOLDER,
  getLocalizedName,
  getBaseName,
  getFormName,
};
