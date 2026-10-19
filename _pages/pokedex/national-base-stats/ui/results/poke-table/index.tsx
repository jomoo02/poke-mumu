'use client';

import { DataTable } from '@/_shared/ui/data-table';

import type { BaseStatsPoke } from '../../../model/base-stats-poke';
import { usePokeSort } from '../../../model/poke-sort';
import { POKE_COLUMNS, POKE_TABLE_ROW_CLASS } from './columns';

interface PokeTableProps {
  pokes: BaseStatsPoke[];
}

export default function PokeTable({ pokes }: PokeTableProps) {
  const { sortState, toggleSort } = usePokeSort();

  return (
    <DataTable
      columns={POKE_COLUMNS}
      rows={pokes}
      getRowKey={(poke) => poke.pokeKey}
      sortState={sortState}
      onSort={toggleSort}
      rowClassName={POKE_TABLE_ROW_CLASS}
    />
  );
}
