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

import { type RestMethod, type MoveView } from '../../../model';
import { basicColumns } from './table-columns';

interface RestProps {
  method: RestMethod;
  moves: MoveView[];
}
const methodTitleMap: Record<RestMethod, string> = {
  evolution: '진화 시 배우는 기술',
  form: '폼체인지로 배우는 기술',
  egg: '유전으로 배우는 기술',
  tutor: 'NPC로부터 배울 수 있는 기술',
  reminder: '떠올리기로 배우는 기술',
  pre: '이전 진화에서 얻을 수 있는 기술',
};
export default function Rest({ moves, method }: RestProps) {
  const table = useTable({
    data: moves,
    columns: [...basicColumns],
    sorting: { id: 'name', isDesc: false },
  });

  const title = methodTitleMap[method] || '기술';
  return (
    <div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
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
