import { parseAsStringLiteral } from 'nuqs/server';

import { DEFAULT_NAME_LANGUAGE, NAME_LANGUAGES } from './name-language-option';

// 이름 표기 언어 (?lang=)
const languageSearchParams = {
  lang: parseAsStringLiteral(NAME_LANGUAGES).withDefault(DEFAULT_NAME_LANGUAGE),
};

export { languageSearchParams };
