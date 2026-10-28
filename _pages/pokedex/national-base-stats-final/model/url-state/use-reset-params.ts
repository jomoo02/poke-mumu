import { useMemo } from 'react';

import { parsePokeFilter, type PokeFilterOptions } from '../filter';
import { isResettable } from './resettable';
import { useListParams } from './use-list-params';

/**
 * 검색어·이름 언어·필터를 한 번에 처음으로 (필터 줄의 초기화, 빈 결과의 초기화). 정렬은 둔다.
 * 언어만 되돌리면 그 언어로 친 검색어가 남아 0건이 되므로 검색어도 함께 지운다
 */
export function useResetParams(options: PokeFilterOptions) {
  const { params, writeList } = useListParams();

  const { search, lang, type, form, gen } = params;

  const isActive = useMemo(
    () =>
      isResettable({
        keyword: search,
        language: lang,
        filter: parsePokeFilter({ type, form, gen }, options),
      }),
    [search, lang, type, form, gen, options],
  );

  // 이미 처음 상태면 URL을 다시 쓰지 않는다
  const reset = () => {
    if (!isActive) {
      return;
    }

    writeList({ search: null, lang: null, type: null, form: null, gen: null });
  };

  return { isActive, reset };
}
