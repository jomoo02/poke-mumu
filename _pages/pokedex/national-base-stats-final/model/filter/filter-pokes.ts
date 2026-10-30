import type { BaseStatsPoke } from '../base-stats-poke';
import {
  POKE_FILTER_GROUPS,
  POKE_FILTER_RULES,
  mapFilterGroups,
  type PokeFilterGroup,
  type PokeFilterOptions,
} from './filter-option';

// 그룹별로 고른 값 (고른 순서)
type PokeFilterValues = Record<PokeFilterGroup, string[]>;

// 그룹 하나: 선택지에 있는 값만, 중복 없이, 고른 순서대로. 최대 선택 수를 넘으면 나중에 고른 것부터 버린다
const parseGroup = (
  values: readonly string[],
  group: PokeFilterGroup,
  options: PokeFilterOptions,
): string[] => {
  const max = POKE_FILTER_RULES[group].max ?? Infinity;

  return values
    .filter(
      (value, index) =>
        values.indexOf(value) === index &&
        options[group].some((option) => option.value === value),
    )
    .slice(0, max);
};

// URL 값(그룹별 배열)을 유효한 선택으로. 키가 코드로 정해져 있어 모르는 그룹은 들어오지 않는다
const parsePokeFilter = (
  raw: PokeFilterValues,
  options: PokeFilterOptions,
): PokeFilterValues =>
  mapFilterGroups((group) => parseGroup(raw[group], group, options));

const isPokeFilterActive = (values: PokeFilterValues): boolean =>
  POKE_FILTER_GROUPS.some((group) => values[group].length > 0);

// 그룹 하나의 조건: 고른 게 없으면 통과. all은 모두 가짐(AND), any는 하나라도 가짐(OR)
const matchesGroup = (
  poke: BaseStatsPoke,
  group: PokeFilterGroup,
  selected: readonly string[],
): boolean => {
  if (selected.length === 0) {
    return true;
  }

  const { match, getPokeValues } = POKE_FILTER_RULES[group];
  const values = getPokeValues(poke);

  return match === 'all'
    ? selected.every((value) => values.includes(value))
    : selected.some((value) => values.includes(value));
};

// 모든 그룹의 조건을 만족하는 포켓몬만 남긴다 (그룹 사이 AND). 고른 게 없으면 그대로
const filterPokes = (
  pokes: BaseStatsPoke[],
  values: PokeFilterValues,
): BaseStatsPoke[] => {
  const activeGroups = POKE_FILTER_GROUPS.filter(
    (group) => values[group].length > 0,
  );

  if (activeGroups.length === 0) {
    return pokes;
  }

  return pokes.filter((poke) =>
    activeGroups.every((group) => matchesGroup(poke, group, values[group])),
  );
};

// 그룹 하나에서 값 하나를 켜고 끈다: 있으면 빼고, 없으면 맨 뒤에 붙인 뒤 유효한 값만 남긴다
// (잘못된 값·중복이 URL에 이어지지 않고 첫 조작에 정리된다)
const toggleGroupValue = (
  values: readonly string[],
  value: string,
  group: PokeFilterGroup,
  options: PokeFilterOptions,
): string[] => {
  const current = parseGroup(values, group, options);
  const next = current.includes(value)
    ? current.filter((item) => item !== value)
    : [...current, value];

  return parseGroup(next, group, options);
};

export type { PokeFilterValues };

export {
  parseGroup,
  parsePokeFilter,
  isPokeFilterActive,
  toggleGroupValue,
  filterPokes,
};
