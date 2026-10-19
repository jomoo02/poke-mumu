'use client';

import { parseAsStringLiteral, useQueryState } from 'nuqs';

// md 미만 정렬 시트 비교용 (?sortui=)
// - radio: 위 정렬 방향 / 아래 정렬 기준 radio (기존)
// - split: 위 정렬 기준 / 아래 정렬 방향 버튼. 어느 칸을 눌러도 닫힘. 기준을 고르면 그 기준의 첫 방향
// - matrix: 기준마다 한 줄 [기준 | 첫 방향 | 반대 방향] 세그먼트 (통일안). 한 번 누르면 닫힘
// - menu: 시트 대신 정렬 메뉴(팝오버) 하나. 정렬 기준 + 순서(기준에 맞는 말). 모든 화면 폭에서 같은 메뉴
const SORT_SHEET_UIS = ['radio', 'split', 'matrix', 'menu'] as const;

type SortSheetUi = (typeof SORT_SHEET_UIS)[number];

const SORT_SHEET_UI_LABEL: Record<SortSheetUi, string> = {
  radio: 'radio',
  split: '분리형',
  matrix: '표형 (통일안)',
  menu: '정렬 메뉴',
};

const parser = parseAsStringLiteral(SORT_SHEET_UIS).withDefault('radio');

export function useSortSheetUi() {
  const [sortSheetUi, setSortSheetUi] = useQueryState('sortui', parser);

  return { sortSheetUi, setSortSheetUi };
}

export type { SortSheetUi };

export { SORT_SHEET_UIS, SORT_SHEET_UI_LABEL };
