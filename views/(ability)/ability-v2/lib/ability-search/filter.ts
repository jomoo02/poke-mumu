import type { Ability } from '@/entities/ability/model';
import { createSearchMatcher } from '@/shared/lib/search';

/**
 * 검색어로 특성을 필터링한다. 한글·영문·일본어 이름을 대상으로 매칭.
 * 순수 함수: searchParams를 모르고 keyword만 인자로 받는다.
 */
export function filterAbilities(
  abilities: Ability[],
  keyword: string,
): Ability[] {
  const matches = createSearchMatcher(keyword);

  return abilities.filter(({ nameKo, nameEn, nameJa }) =>
    matches(nameKo, nameEn, nameJa),
  );
}
