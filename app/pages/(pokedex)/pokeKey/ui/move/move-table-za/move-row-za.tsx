// app/pages/(pokedex)/pokeKey/ui/move/move-row-za.tsx
import type { PokeMoveZa } from '../../../model';
import LearnMethodBadge from '../learn-method-badge';
import { TypeBadge, TypeIconV3 } from '@/app/entities/type/ui';
import { DamageClassIcon } from '@/app/entities/damage-class/ui';
import { TableCell, TableRow } from '@/app/shared/ui/table';

interface MoveRowZaProps {
  move: PokeMoveZa;
}

export default function MoveRowZa({ move }: MoveRowZaProps) {
  const type = {
    identifier: move.type_identifier,
    nameKo: move.type_name_ko,
  };
  return (
    <TableRow className="text-md">
      <TableCell className="p-4">
        <LearnMethodBadge
          identifier={move.learn_method_identifier}
          nameKo={move.learn_method_name_ko}
          level={move.level}
          machineType={move.machine_type}
          machineNumber={move.machine_number}
        />
      </TableCell>
      <TableCell className="p-4">
        <div className="font-medium min-w-35">
          {move.name_ko ?? move.identifier}
        </div>
      </TableCell>
      <TableCell className="p-4 shrink-0">
        <div className="w-12 shrink-0 flex justify-center items-center">
          <TypeIconV3 type={type} />
        </div>
      </TableCell>
      <TableCell className="p-4 ">
        <div className="w-12 shrink-0 flex justify-center items-center">
          <DamageClassIcon damageClass={move.damage_class_identifier} />
        </div>
      </TableCell>
      <TableCell className="p-4 text-center">
        <div className="w-16">
          <div className="text-muted-foreground text-xs">위력</div>
          <div className="tabular-nums">{move.power ?? '-'}</div>
        </div>
      </TableCell>
      <TableCell className="p-4 text-center">
        <div className="w-18">
          <div className="text-muted-foreground text-xs">재사용 시간</div>
          <div className="tabular-nums">
            {move.cooldown != null ? move.cooldown : '-'}
          </div>
        </div>
      </TableCell>

      <TableCell className="p-4">
        <div className="text-muted-foreground text-xs">설명</div>
        <p className="line-clamp-2 text-sm">{move.description ?? '-'}</p>
      </TableCell>
    </TableRow>
  );
}
