import type { NameLanguage } from '../../model/name-language';

// 시트·팝오버 제목, 버튼 접근 이름 앞말
export const NAME_LANGUAGE_TITLE = '이름 표기';

// 시트·팝오버 설명
export const NAME_LANGUAGE_DESCRIPTION = '이름 표시·검색·이름순 정렬에 쓰여요';

// 시트·팝오버가 받는 값 (NameLanguageControl이 그대로 넘긴다)
export interface NameLanguagePanelProps {
  language: NameLanguage;
  onChange: (language: NameLanguage) => void;
}
