import type { ListMove } from '../move';
import {
  MOVE_FILTER_GROUPS,
  MOVE_FILTER_RULES,
  mapFilterGroups,
  type MoveFilterGroup,
  type MoveFilterOptions,
} from './filter-option';

// 그룹별로 고른 값 (고른 순서)
type MoveFilterValues = Record<MoveFilterGroup, string[]>;

// 그룹 하나: 선택지에 있는 값만, 중복 없이, 고른 순서대로
const parseGroup = (
  values: readonly string[],
  group: MoveFilterGroup,
  options: MoveFilterOptions,
): string[] =>
  values.filter(
    (value, index) =>
      values.indexOf(value) === index &&
      options[group].some((option) => option.value === value),
  );

// URL 값(그룹별 배열)을 유효한 선택으로. 키가 코드로 정해져 있어 모르는 그룹은 들어오지 않는다
const parseMoveFilter = (
  raw: MoveFilterValues,
  options: MoveFilterOptions,
): MoveFilterValues =>
  mapFilterGroups((group) => parseGroup(raw[group], group, options));

const isMoveFilterActive = (values: MoveFilterValues): boolean =>
  MOVE_FILTER_GROUPS.some((group) => values[group].length > 0);

// 그룹 하나의 조건: 고른 게 없으면 통과, 있으면 하나라도 가짐(OR)
const matchesGroup = (
  move: ListMove,
  group: MoveFilterGroup,
  selected: readonly string[],
): boolean => {
  if (selected.length === 0) {
    return true;
  }

  const values = MOVE_FILTER_RULES[group].getMoveValues(move);

  return selected.some((value) => values.includes(value));
};

// 모든 그룹의 조건을 만족하는 기술만 남긴다 (그룹 사이 AND). 고른 게 없으면 그대로
const filterMoves = (
  moves: ListMove[],
  values: MoveFilterValues,
): ListMove[] => {
  const activeGroups = MOVE_FILTER_GROUPS.filter(
    (group) => values[group].length > 0,
  );

  if (activeGroups.length === 0) {
    return moves;
  }

  return moves.filter((move) =>
    activeGroups.every((group) => matchesGroup(move, group, values[group])),
  );
};

// 그룹 하나에서 값 하나를 켜고 끈다: 있으면 빼고, 없으면 맨 뒤에 붙인 뒤 유효한 값만 남긴다
// (잘못된 값·중복이 URL에 이어지지 않고 첫 조작에 정리된다)
const toggleGroupValue = (
  values: readonly string[],
  value: string,
  group: MoveFilterGroup,
  options: MoveFilterOptions,
): string[] => {
  const current = parseGroup(values, group, options);
  const next = current.includes(value)
    ? current.filter((item) => item !== value)
    : [...current, value];

  return parseGroup(next, group, options);
};

export type { MoveFilterValues };

export { parseMoveFilter, isMoveFilterActive, toggleGroupValue, filterMoves };
