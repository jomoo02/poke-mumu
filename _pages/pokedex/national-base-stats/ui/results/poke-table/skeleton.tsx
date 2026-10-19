import { DataTableSkeleton } from '@/_shared/ui/data-table';

import { POKE_COLUMNS, POKE_TABLE_ROW_CLASS } from './columns';

interface PokeTableSkeletonProps {
  rowCount: number;
}

export default function PokeTableSkeleton({
  rowCount,
}: PokeTableSkeletonProps) {
  return (
    <DataTableSkeleton
      columns={POKE_COLUMNS}
      rowCount={rowCount}
      rowClassName={POKE_TABLE_ROW_CLASS}
    />
  );
}
