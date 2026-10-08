import { DataTableSkeleton } from '@/_shared/ui/data-table';
import { MOVE_COLUMNS } from './columns';

interface MoveTableSkeletonProps {
  rowCount: number;
}

export default function MoveTableSkeleton({
  rowCount,
}: MoveTableSkeletonProps) {
  return <DataTableSkeleton columns={MOVE_COLUMNS} rowCount={rowCount} />;
}
