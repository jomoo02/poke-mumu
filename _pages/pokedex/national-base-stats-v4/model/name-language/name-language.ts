import type { BaseStatsPoke } from '@/_pages/pokedex/national-base-stats/model/base-stats-poke';
import type { PokeSort } from '@/_pages/pokedex/national-base-stats/model/poke-sort';
import { sortPokes } from '@/_pages/pokedex/national-base-stats/model/poke-sort';
import type { NameLanguage } from '@/_pages/pokedex/national-base-stats/model/name-language';

// 정의·이름 함수·검색은 정식 slice로 옮겼다. 정렬은 3-4(poke-sort)에서 옮긴다

const NAME_COLLATOR: Record<Exclude<NameLanguage, 'ko'>, Intl.Collator> = {
  en: new Intl.Collator('en', { numeric: true, sensitivity: 'base' }),
  ja: new Intl.Collator('ja', { numeric: true }),
};

// 기본 정렬 순서: 도감 번호 → 같은 번호 안의 폼 순서 (poke-sort의 동점 처리와 같다)
const compareDexOrder = (a: BaseStatsPoke, b: BaseStatsPoke) =>
  a.dexNumber - b.dexNumber || a.sortOrder - b.sortOrder;

/**
 * 정렬. 이름순은 고른 언어의 이름(폼을 붙이지 않은 이름)으로, 나머지는 기존 정렬(sortPokes) 그대로.
 * 이름이 같으면(같은 포켓몬의 폼) 기본 정렬 순서로, 동점도 방향을 따라 뒤집는다 (sortPokes와 같다)
 */
const sortPokesByLanguage = (
  pokes: readonly BaseStatsPoke[],
  sortState: PokeSort,
  language: NameLanguage,
): BaseStatsPoke[] => {
  if (sortState.sort !== 'name' || language === 'ko') {
    return sortPokes(pokes, sortState);
  }

  const collator = NAME_COLLATOR[language];
  const direction = sortState.order === 'asc' ? 1 : -1;
  const getName = (poke: BaseStatsPoke) =>
    language === 'en' ? poke.nameEn : poke.nameJa;

  return [...pokes].sort(
    (a, b) =>
      (collator.compare(getName(a), getName(b)) || compareDexOrder(a, b)) *
      direction,
  );
};

export { sortPokesByLanguage };
