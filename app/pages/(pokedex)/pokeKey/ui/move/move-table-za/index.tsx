// app/pages/(pokedex)/pokeKey/ui/move/move-table-za.tsx
import { Table, TableBody } from '@/app/shared/ui/table';
import type { PokeMoveZa } from '../../../model';
import MoveRowZa from './move-row-za';

interface MoveTableZaProps {
  moves: PokeMoveZa[];
}

export default function MoveTableZa({ moves }: MoveTableZaProps) {
  if (moves.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        조건에 맞는 기술이 없어요.
      </p>
    );
  }

  return (
    <div className="border rounded-4xl">
      <Table>
        <TableBody>
          {moves.map((m) => (
            <MoveRowZa
              key={`${m.move_id}-${m.identifier}-${m.learn_method_identifier}`}
              move={m}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
