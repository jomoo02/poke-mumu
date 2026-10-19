'use client';

import type { Move } from '@/_entities/move';
import { VirtualDataTable } from '@/_shared/ui/data-table';
import { useMoveSort } from '@/_pages/move/list/model/move-sort';

import { MOVE_COLUMNS } from './columns';

// 행 높이: 이름 두 줄 48 + 셀 패딩 28 + 아래 테두리 1
const ROW_HEIGHT = 77;

const getMoveKey = (move: Move) => move.identifier;

interface MoveTableProps {
  moves: Move[];
}

// 검색·필터·정렬을 거친 전체 기술(약 900개)을 페이지 스크롤로 보여주고, 화면 근처 행만 그린다
export default function MoveTable({ moves }: MoveTableProps) {
  const { sortState, toggleSort } = useMoveSort();

  return (
    <VirtualDataTable
      columns={MOVE_COLUMNS}
      rows={moves}
      getRowKey={getMoveKey}
      sortState={sortState}
      onSort={toggleSort}
      estimateRowHeight={ROW_HEIGHT}
    />
  );
}
