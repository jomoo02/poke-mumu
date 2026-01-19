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

import { type MoveView } from '../../../model';
import { levelUpColumn, basicColumns } from './table-columns';

interface LevelUpProps {
  moves: MoveView[];
}

export default function LevelUp({ moves }: LevelUpProps) {
  const table = useTable({
    data: moves,
    columns: [levelUpColumn, ...basicColumns],
    sorting: { id: 'level', isDesc: false },
  });

  return (
    <div>
      <h4 className="text-xl font-semibold mb-4">레벨 업으로 익히는 기술</h4>
      <Table>
        <TableHeader>
          <TableRow>
            {table.getVisibleColumns().map((header) => (
              <TableHead
                key={header.id}
                className={cn(
                  'py-1 h-12 text-sm border-border px-2',
                  'first:pl-0  last:pr-0',
                )}
              >
                {header.render()}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.rows.map((row) => (
            <TableRow key={row.id} className={cn('border-border')}>
              {table.getVisibleColumns().map((col) => (
                <TableCell
                  key={col.id}
                  className={cn('first:pl-2 last:pr-2', ' py-3 text-sm')}
                >
                  {col.cell({ row })}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
