'use client';

import { parseAsStringLiteral, useQueryState } from 'nuqs';

// 목록 그리기 방식 비교용 (?list=). 측정이 끝나면 하나만 남긴다
// - full: 전부 그리고 화면 밖 행은 content-visibility: auto로 그리기를 건너뛴다
// - virtual: 보이는 행만 그린다 (@tanstack/react-virtual)
const LIST_MODES = ['full', 'virtual'] as const;

type ListMode = (typeof LIST_MODES)[number];

const listModeParser = parseAsStringLiteral(LIST_MODES).withDefault('full');

export function useListMode() {
  const [listMode] = useQueryState('list', listModeParser);

  return listMode;
}

export type { ListMode };
