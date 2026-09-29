'use client';

import type { AbilityDetail } from '@/_entities/ability';

import DataTable from '../data-table';
import { useAbilitySort } from '../../model/ability-sort';
import { ABILITY_COLUMNS } from './columns';

interface AbilityTableProps {
  abilities: AbilityDetail[];
}

export default function AbilityTable({ abilities }: AbilityTableProps) {
  const { sortState, toggleSort } = useAbilitySort();

  return (
    <DataTable
      columns={ABILITY_COLUMNS}
      rows={abilities}
      getRowKey={(ability) => ability.identifier}
      sortState={sortState}
      onSort={toggleSort}
    />
  );
}
