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
import { Fragment } from 'react/jsx-runtime';

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
    <div className="">
      <h4 className="text-xl font-semibold mb-4 ">레벨 업으로 익히는 기술</h4>
      <div className="border rounded-lg overflow-hidden">
        <Table className="">
          <TableHeader>
            <TableRow className="bg-muted/50">
              {table.getVisibleColumns().map((header) => (
                <TableHead
                  key={header.id}
                  className={cn(
                    'text-sm px-1',
                    // header.id === 'name' ? 'w-full' : '',
                    // header.id === 'level'
                    //   ? 'flex justify-end items-center pl-0'
                    //   : '',
                  )}
                >
                  {header.render()}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {table.rows.map((row) => (
              <Fragment key={row.id}>
                <TableRow className="">
                  {table.getVisibleColumns().map((col) => (
                    <TableCell key={col.id} className={cn('text-sm px-3')}>
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
