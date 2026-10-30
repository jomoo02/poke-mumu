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
}

// 배열 순서가 선택 목록의 순서다
const NAME_LANGUAGE_OPTIONS: readonly NameLanguageOption[] = [
  { value: 'ko', label: '한국어' },
  { value: 'en', label: '영어' },
  { value: 'ja', label: '일본어' },
];

const getNameLanguageOption = (language: NameLanguage): NameLanguageOption =>
  NAME_LANGUAGE_OPTIONS.find((option) => option.value === language) ??
  NAME_LANGUAGE_OPTIONS[0];

const getNameLanguageLabel = (language: NameLanguage): string =>
  getNameLanguageOption(language).label;

// 검색창 안내 글자 (언어와 상관없이 같다).
// '이'와 '름' 사이에 폭 없는 공백(U+200B): iOS Safari가 '이름'을 보고 키보드 위에 연락처 자동 완성을 띄우는 것을 막는다
// 검색창 앞에 이름 표기 버튼이 있어 입력 칸이 좁다 (375px 화면에서 약 170px)
const SEARCH_PLACEHOLDER = '이\u200B름·도감번호 검색';

export type { NameLanguage, NameLanguageOption };

export {
  NAME_LANGUAGES,
  DEFAULT_NAME_LANGUAGE,
  NAME_LANGUAGE_OPTIONS,
  getNameLanguageLabel,
  SEARCH_PLACEHOLDER,
};
