'use client';

import { parseAsStringLiteral, useQueryState } from 'nuqs';

import {
  DEFAULT_NAME_LANGUAGE,
  NAME_LANGUAGES,
} from '@/_pages/pokedex/national-base-stats/model/name-language';

// ?lang=en|ja. 검색 결과가 언어에 따라 달라 공유 링크가 같은 결과를 보이도록 URL에 둔다.
// 기본값(한국어)은 URL에 쓰지 않는다 (nuqs clearOnDefault)
const nameLanguageParser = parseAsStringLiteral(NAME_LANGUAGES).withDefault(
  DEFAULT_NAME_LANGUAGE,
);

export function useNameLanguage() {
  const [language, setLanguage] = useQueryState('lang', nameLanguageParser);

  return { language, setLanguage };
}
