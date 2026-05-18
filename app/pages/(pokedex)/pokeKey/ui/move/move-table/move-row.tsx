import { TypeIconV3 } from '@/app/entities/type/ui';
import {
  DamageClassIcon,
  DamageClassIconV2,
} from '@/app/entities/damage-class/ui';
import { TableRow, TableCell } from '@/app/shared/ui/table';
import { type PokeMoveVm } from '../../../model';
import LearnMethodBadge from '../learn-method-badge';

interface MoveRowProps {
  move: PokeMoveVm;
}

export default function MoveRow({ move }: MoveRowProps) {
  const type = { identifier: move.type_identifier, nameKo: move.type_name_ko };

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
          {/* <DamageClassIcon damageClass={move.damage_class_identifier} /> */}
          <DamageClassIconV2 damageClass={move.damage_class_identifier} />
        </div>
      </TableCell>
      <TableCell className="p-4 text-center">
        <div className="w-16">
          <div className="text-muted-foreground text-xs">위력</div>
          <div className="tabular-nums">{move.power ?? '-'}</div>
        </div>
      </TableCell>
      <TableCell className="p-4 text-center">
        <div className="w-16">
          <div className="text-muted-foreground text-xs">명중률</div>
          <div className="tabular-nums">
            {move.accuracy != null ? move.accuracy : '-'}
          </div>
        </div>
      </TableCell>
      <TableCell className="p-4 text-center">
        <div className="w-16">
          <div className="text-muted-foreground text-xs">PP</div>
          <div className="tabular-nums">{move.pp ?? '-'}</div>
        </div>
      </TableCell>

      <TableCell className="p-4">
        {/* <div className="text-muted-foreground text-xs">설명</div> */}

        <p className="line-clamp-2 text-sm whitespace-normal text-pretty break-keep min-w-52 text-muted-foreground">
          {move.description ?? '-'}
        </p>
      </TableCell>
    </TableRow>
  );
}
