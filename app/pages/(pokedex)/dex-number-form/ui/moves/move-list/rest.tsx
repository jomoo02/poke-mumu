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
import { getTableColumns } from '../move-table';

interface RestProps {
  method: RestMethod;
  versionGroupId: string;
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

export default function Rest({ moves, method, versionGroupId }: RestProps) {
  const columns = getTableColumns(method, Number(versionGroupId));

  const table = useTable({
    data: moves,
    columns: [...columns],
    sorting: { id: 'name', isDesc: false },
  });

  const title = methodTitleMap[method] || '기술';
  return (
    <div className=" overflow-auto max-w-xl">
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <div className="border overflow-hidden rounded-lg">
        <Table className="bg-card">
          <TableHeader>
            <TableRow>
              {table.getVisibleColumns().map((header) => (
                <TableHead
                  key={header.id}
                  className={cn('text-sm border-border px-2')}
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
                  <TableCell key={col.id} className={cn('text-sm')}>
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
