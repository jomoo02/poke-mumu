'use client';

import type { Move } from '@/_entities/move';

import { DataTable } from '@/_shared/ui/data-table';
import { useMoveSort } from '../../model/move-sort';
import { MOVE_COLUMNS } from './columns';

interface MoveTableProps {
  moves: Move[];
}

export default function MoveTable({ moves }: MoveTableProps) {
  const { sortState, toggleSort } = useMoveSort();

  return (
    <DataTable
      columns={MOVE_COLUMNS}
      rows={moves}
      getRowKey={(move) => move.identifier}
      sortState={sortState}
      onSort={toggleSort}
    />
  );
}
