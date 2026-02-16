import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/app/shared/ui/table';
import { cn } from '@/app/shared/lib/cn';
import useTable from '@/app/shared/model/useTable';

import { type MoveMethod, type MoveView } from '../../../model';
import { getTableColumns } from '../move-table';

interface LevelUpProps {
  moves: MoveView[];
  versionGroupId: number;
}

const METHOD: MoveMethod = 'level_up';

export default function LevelUp({ moves, versionGroupId }: LevelUpProps) {
  const columns = getTableColumns(METHOD, versionGroupId);

  const table = useTable({
    data: moves,
    columns: columns,
    sorting: { id: 'level', isDesc: false },
  });

  return (
    <div className=" ">
      {/* <h4 className="text-xl font-semibold mb-4 ">레벨 업으로 익히는 기술</h4> */}
      {/* <div className="w-max">
        <div className="sticky top-30 z-20 w-max">
          <div className="flex  min-w-max">
            {table.getVisibleColumns().map((header) => (
              <div
                key={header.id}
                className={cn('text-sm border-border px-2 ')}
              >
                {header.render()}
              </div>
            ))}
          </div>
        </div>

        <div className=" flex flex-col ">
          {table.rows.map((row) => (
            <div
              key={row.id}
              className={cn('border-border inline-flex min-w-max')}
            >
              {table.getVisibleColumns().map((col) => (
                <div key={col.id} className="text-sm w-20">
                  {col.cell({ row })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div> */}

      <div className="border rounded-lg overflow-hidden max-w-xl">
        <Table className="">
          <TableHeader>
            <TableRow className="">
              {table.getVisibleColumns().map((header) => (
                <TableHead key={header.id} className={cn('text-sm px-2')}>
                  {header.render()}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {table.rows.map((row) => (
              <TableRow key={row.id}>
                {table.getVisibleColumns().map((col) => (
                  <TableCell key={col.id} className="text-sm px-2">
                    {col.cell({ row })}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
