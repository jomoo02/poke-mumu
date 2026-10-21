'use client';

import { parseAsStringLiteral, useQueryState } from 'nuqs';

// 목록 그리기 방식 (?list=, 비교용으로 강제할 수 있다)
// - auto(기본): 본문 폭으로 고른다. 넓은 본문(테이블)은 full, 좁은 본문(카드)은 virtual
//   데스크탑은 전체 그려도 정렬이 빠르고(M2 약 90ms) 브라우저 찾기(Ctrl+F)가 전부 된다.
//   모바일은 실기기에서 전체 그리기 정렬이 가끔 크게 늦어 가상화한다
//   (docs/decisions/2026-10-20-mobile-sort-sheet-virtualization.md)
// - full: 전부 그리고 화면 밖 행은 content-visibility: auto로 그리기를 건너뛴다
// - virtual: 보이는 행만 그린다 (@tanstack/react-virtual)
const LIST_MODES = ['auto', 'full', 'virtual'] as const;

type ListMode = (typeof LIST_MODES)[number];

const listModeParser = parseAsStringLiteral(LIST_MODES).withDefault('auto');

export function useListMode() {
  const [listMode] = useQueryState('list', listModeParser);

  return listMode;
}

export type { ListMode };
