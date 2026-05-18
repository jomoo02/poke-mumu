// app/pages/(pokedex)/pokeKey/ui/move/move-table.tsx
import { Table, TableBody } from '@/app/shared/ui/table';
import type { PokeMoveVm } from '../../../model';
import MoveRow from './move-row';

interface MoveTableProps {
  moves: PokeMoveVm[];
}

export default function MoveTable({ moves }: MoveTableProps) {
  if (moves.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        조건에 맞는 기술이 없어요.
      </p>
    );
  }

  return (
    <div className="border rounded-4xl bg-card">
      <Table>
        <TableBody>
          {moves.map((m) => (
            <MoveRow
              key={`${m.move_id}-${m.learn_method_identifier}-${m.level ?? ''}-${m.machine_number ?? ''}`}
              move={m}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
