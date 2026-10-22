import { useQueryStates } from 'nuqs';

import type { NameLanguage } from './name-language';
import { pokeSearchParams } from '../search-params';

const PARSERS = { lang: pokeSearchParams.lang };

export function useNameLanguage() {
  const [{ lang: language }, setParams] = useQueryStates(PARSERS);

  const setLanguage = (next: NameLanguage) => setParams({ lang: next });

  return { language, setLanguage };
}
