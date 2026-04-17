import { MachineType, MoveMethod, MoveView } from '../../../model';
import useTable from '@/app/shared/model/useTable';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/app/shared/ui/table';
import { getTableColumns, getSorting, getTitle } from './config';
import { cn } from '@/app/shared/lib/cn';
import { Fragment } from 'react/jsx-runtime';

interface MoveTableProps {
  moves: MoveView[];
  versionGroupId: number;
  method: MoveMethod;
  machineType?: MachineType;
}

export default function MoveTable({
  moves,
  versionGroupId,
  method,
  machineType,
}: MoveTableProps) {
  const columns = getTableColumns(method, versionGroupId);

  const sortingId = getSorting(method);

  const title = getTitle(method, machineType);

  const table = useTable({
    data: moves,
    columns: columns,
    sorting: { id: sortingId, isDesc: false },
  });

  return (
    <div className="flex flex-col gap-6">
      <h4 className="text-xl font-semibold">{title}</h4>
      <div className="overflow-hidden border rounded-2xl">
        <Table className="">
          <TableBody className="">
            {table.rows.map((row) => (
              <Fragment key={row.id}>
                <TableRow className="">
                  {table.getVisibleColumns().map((col) => (
                    <TableCell key={col.id} className={cn('text-md px-4')}>
                      {col.cell({ row })}
                    </TableCell>
                  ))}
                </TableRow>
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
