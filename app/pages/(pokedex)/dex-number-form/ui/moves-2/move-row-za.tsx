import { TypeIcon, TypeIconV3 } from '@/app/entities/type/ui';
import { DamageClassIcon } from '@/app/entities/damage-class/ui';

import { type MoveViewNew } from '../../model/moves-2';
import { MoveRowChip } from './move-row-chip';

interface MoveRowProps {
  move: MoveViewNew;
}

export default function MoveRowZa({ move }: MoveRowProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b last:border-b-0 text-md">
      <div className="shrink-0 min-w-20">
        <MoveRowChip method={move.method} label={move.label} />
      </div>

      <div className=" min-w-32 md:min-w-44 font-medium">{move.name}</div>

      <div className="shrink-0 min-w-16 flex justify-center items-center">
        <TypeIconV3 type={move.type} className="size-7" />
      </div>

      <div className="shrink-0  min-w-16 flex justify-center items-center">
        <DamageClassIcon damageClass={move.damageClass} />
      </div>

      <div className="text-center min-w-20 shrink-0">
        <div className="text-xs text-muted-foreground">위력</div>
        <div>{move.power ?? '-'}</div>
      </div>

      <div className="text-center min-w-28">
        <div className="text-xs text-muted-foreground">재사용 시간</div>
        <div>{move.cooldown}</div>
      </div>

      <div className="flex-1 min-w-28">
        <div className="text-xs text-muted-foreground">설명</div>
        <div className="text-sm leading-relaxed">{move.description}</div>
      </div>
    </div>
  );
}
