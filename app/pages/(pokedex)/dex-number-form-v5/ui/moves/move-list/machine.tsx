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

import {
  type MachineType,
  type MoveView,
  type MoveMethod,
} from '../../../model';
import { getTableColumns } from '../move-table';

interface MachineProps {
  machineType: MachineType;
  moves: MoveView[];
  versionGroupId: number;
}

const METHOD: MoveMethod = 'machine';

const titleMap: Record<string, string> = {
  TM: '기술머신 TM으로 배우는 기술',
  HM: '기술머신 HM으로 배우는 기술',
  TR: '기술머신 TR로 배우는 기술',
};

export default function Machine({
  moves,
  machineType,
  versionGroupId,
}: MachineProps) {
  const columns = getTableColumns(METHOD, versionGroupId);

  const table = useTable({
    data: moves,
    columns,
    sorting: { id: 'machine', isDesc: false },
  });

  const title = titleMap[machineType] || '기술';

  return (
    <div>
      <h4 className="text-xl font-semibold mb-4">{title}</h4>
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
                {header.id === 'machine' ? (
                  <>{header.render(machineType)}</>
                ) : (
                  <> {header.render()}</>
                )}
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
