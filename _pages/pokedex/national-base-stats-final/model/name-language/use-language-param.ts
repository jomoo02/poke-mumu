import { useListQueryStates } from '../url-state';
import { languageSearchParams } from './language-search-params';
import type { NameLanguage } from './name-language-option';

// 이름 표기 언어 (?lang=). 이름순 정렬·검색 결과가 언어마다 달라 바꾸면 1페이지로
export function useLanguageParam() {
  const [{ lang: language }, write] = useListQueryStates(languageSearchParams);

  const setLanguage = (next: NameLanguage) => {
    if (next === language) {
      return;
    }

    write({ lang: next });
  };

  return { language, setLanguage };
}
