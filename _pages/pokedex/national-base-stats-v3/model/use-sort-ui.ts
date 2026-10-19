'use client';

import { parseAsStringLiteral, useQueryState } from 'nuqs';

// 좁은 화면 정렬 UI 비교용 (?sortui=)
// - letter: 행 아랫줄(H A B C D S 합)과 같은 7칸 한 글자 머리글. 고른 칸은 알약 배경
// - segment: letter와 같은 7칸을 둥근 틀(세그먼트 컨트롤)로 감싸고 고른 칸만 띄운다
//   (letter·segment는 정렬 메뉴에서 '능력치순'을 골랐을 때만 머리글이 나타난다)
// - always: letter 모양 머리글을 항상 보여 준다. 머리글을 누르면 그 능력치로 정렬되고 메뉴는 '능력치순'이 된다
// - chip: 머리글 대신 sticky 칩 바. 행 능력치에 라벨을 붙이고 종족값은 윗줄 오른쪽
// - radio: 머리글 없이 정렬 버튼의 바텀시트(정렬 방향 / 정렬 기준 radio)로만 고른다 (/move와 같은 패턴).
//   행은 7칸(letter와 같은 자리)에 늘 라벨을 붙이고, 정렬 중인 칸만 칠한다. md 이상은 기존 정렬 메뉴
// - split: radio와 같고 시트만 위 정렬 기준 / 아래 정렬 방향 버튼. 어느 칸을 눌러도 닫힘
// - matrix: radio와 같고 시트만 기준마다 한 줄 [기준 | 첫 방향 | 반대 방향] 세그먼트 (통일안)
// - menu: radio와 같은 행에 시트 대신 정렬 메뉴(팝오버) 하나. 정렬 기준 + 순서. 모든 화면 폭에서 같은 메뉴
const SORT_UIS = [
  'letter',
  'segment',
  'always',
  'chip',
  'radio',
  'split',
  'matrix',
  'menu',
] as const;

type SortUi = (typeof SORT_UIS)[number];

const SORT_UI_LABEL: Record<SortUi, string> = {
  letter: '한 글자',
  segment: '세그먼트',
  always: '항상 머리글',
  chip: '칩 바',
  radio: '정렬 시트 (radio)',
  split: '정렬 시트 (분리형)',
  matrix: '정렬 시트 (표형)',
  menu: '정렬 메뉴',
};

// 머리글 없이 정렬 버튼(바텀시트·정렬 메뉴)으로만 고르는 UI
type SortSheetUi = Extract<SortUi, 'radio' | 'split' | 'matrix' | 'menu'>;

const isSortSheetUi = (sortUi: SortUi): sortUi is SortSheetUi =>
  sortUi === 'radio' ||
  sortUi === 'split' ||
  sortUi === 'matrix' ||
  sortUi === 'menu';

// 행 아랫줄이 7칸(H A B C D S 합)인 UI. 칩 바만 6칸 + 윗줄 종족값
const usesColumnHead = (sortUi: SortUi) => sortUi !== 'chip';

// 7칸 머리글을 지금 보여 줄지: 항상 머리글은 늘, 한 글자·세그먼트는 능력치순일 때만.
// 칩 바·정렬 시트는 머리글이 없다
const showsColumnHead = (sortUi: SortUi, isStatSort: boolean) =>
  sortUi === 'always' ||
  ((sortUi === 'letter' || sortUi === 'segment') && isStatSort);

const sortUiParser = parseAsStringLiteral(SORT_UIS).withDefault('letter');

export function useSortUi() {
  const [sortUi, setSortUi] = useQueryState('sortui', sortUiParser);

  return { sortUi, setSortUi };
}

export type { SortUi, SortSheetUi };

export {
  SORT_UIS,
  SORT_UI_LABEL,
  usesColumnHead,
  showsColumnHead,
  isSortSheetUi,
};
