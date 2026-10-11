import { DataTableSkeleton } from '@/_shared/ui/data-table';
import { ABILITY_COLUMNS } from './columns';

interface AbilityTableSkeletonProps {
  rowCount: number;
}

export default function AbilityTableSkeleton({
  rowCount,
}: AbilityTableSkeletonProps) {
  return <DataTableSkeleton columns={ABILITY_COLUMNS} rowCount={rowCount} />;
}
