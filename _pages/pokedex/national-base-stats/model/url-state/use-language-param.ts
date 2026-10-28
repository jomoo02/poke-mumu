import type { NameLanguage } from '../name-language';
import { useListParams } from './use-list-params';

// 이름 표기 언어 (?lang=). 이름순 정렬·검색 결과가 언어마다 달라 바꾸면 1페이지로
export function useLanguageParam() {
  const { params, writeList } = useListParams();

  const language = params.lang;

  const setLanguage = (next: NameLanguage) => {
    if (next === language) {
      return;
    }

    writeList({ lang: next });
  };

  return { language, setLanguage };
}
