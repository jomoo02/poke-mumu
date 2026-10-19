'use client';

import { parseAsStringLiteral, useQueryState } from 'nuqs';

// 목록 그리기 방식 비교용 (?list=)
// - virtual: 보이는 행만 그린다 (@tanstack/react-virtual)
// - lazy: 전부 그리고 화면 밖 행은 content-visibility: auto로 그리기를 건너뛴다
const LIST_MODES = ['virtual', 'lazy'] as const;

type ListMode = (typeof LIST_MODES)[number];

const LIST_MODE_LABEL: Record<ListMode, string> = {
  virtual: '가상화',
  lazy: 'content-visibility',
};

const listModeParser = parseAsStringLiteral(LIST_MODES).withDefault('virtual');

export function useListMode() {
  const [listMode, setListMode] = useQueryState('list', listModeParser);

  return { listMode, setListMode };
}

export type { ListMode };

export { LIST_MODES, LIST_MODE_LABEL };
