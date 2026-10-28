import { DEFAULT_NAME_LANGUAGE, type NameLanguage } from '../name-language';
import { isPokeFilterActive, type PokeFilterValues } from '../filter';

interface ResettableConditions {
  keyword: string;
  language: NameLanguage;
  filter: PokeFilterValues;
}

// 초기화할 게 있는가: 검색어·이름 언어·필터 중 하나라도 켜져 있으면.
// 정렬은 결과 줄의 보기 설정이라 세지 않는다 (결정 문서 2026-10-23)
const isResettable = ({
  keyword,
  language,
  filter,
}: ResettableConditions): boolean =>
  keyword !== '' ||
  language !== DEFAULT_NAME_LANGUAGE ||
  isPokeFilterActive(filter);

export { isResettable };
