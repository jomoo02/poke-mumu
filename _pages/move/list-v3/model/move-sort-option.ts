import { toSortMatrixOptions } from '@/_shared/ui/sort-menu';
import {
  SORT_OPTIONS,
  type MoveSort,
  type SortOrder,
} from '@/_pages/move/list/model/move-sort';

// 정렬 메뉴 선택지 하나 = 기준 + 방향 (예: '위력 높은 순')
interface MoveSortChoice {
  // 'power-desc' (셀렉트 값·React key)
  key: string;
  label: string;
  sort: MoveSort;
}

// 메뉴 안의 묶음 (순서형·수치형)
interface MoveSortChoiceGroup {
  label: string;
  choices: readonly MoveSortChoice[];
}

const toKey = ({ sort, order }: MoveSort) => `${sort}-${order}`;

// 기준마다 '첫 방향 → 반대 방향' 두 선택지. 문구는 기존 정렬 이름(option.ts)을 쓰고,
// 번호만 메뉴에 '기술번호'가 보이게 바꾼다 (트리거에 '정렬:'이 없어 무엇의 순서인지 밝힌다)
const LABEL_OVERRIDE: Partial<Record<string, string>> = {
  'moveNumber-asc': '기술번호순',
  'moveNumber-desc': '기술번호 역순',
};

const toChoices = (kind: 'sequence' | 'amount'): MoveSortChoice[] =>
  SORT_OPTIONS.filter((option) => option.kind === kind).flatMap((option) => {
    // 순서형은 asc부터, 수치형은 desc(높은 순)부터
    const orders: SortOrder[] =
      kind === 'sequence' ? ['asc', 'desc'] : ['desc', 'asc'];

    return orders.map((order) => {
      const sort: MoveSort = { sort: option.key, order };
      const key = toKey(sort);

      return {
        key,
        label: LABEL_OVERRIDE[key] ?? option.sortLabel[sort.order],
        sort,
      };
    });
  });

const MOVE_SORT_GROUPS: readonly MoveSortChoiceGroup[] = [
  { label: '순서', choices: toChoices('sequence') },
  { label: '수치', choices: toChoices('amount') },
];

const MOVE_SORT_CHOICES: readonly MoveSortChoice[] = MOVE_SORT_GROUPS.flatMap(
  (group) => group.choices,
);

// 지금 정렬에 맞는 선택지. URL 값은 파서가 걸러 항상 있지만 없으면 첫 선택지(기본 정렬)
const findMoveSortChoice = (sortState: MoveSort): MoveSortChoice =>
  MOVE_SORT_CHOICES.find((choice) => choice.key === toKey(sortState)) ??
  MOVE_SORT_CHOICES[0];

// 표형 시트·정렬 메뉴: 기준마다 [첫 방향, 반대 방향]
const MOVE_SORT_MATRIX_OPTIONS = toSortMatrixOptions(SORT_OPTIONS);

export type { MoveSortChoice, MoveSortChoiceGroup };

export {
  MOVE_SORT_GROUPS,
  MOVE_SORT_CHOICES,
  MOVE_SORT_MATRIX_OPTIONS,
  findMoveSortChoice,
};
