import { DotIcon } from 'lucide-react';
import { MoveDetail } from '../model';
import { TypeBadge } from '@/app/entities/type/ui';
import {
  DamageClassBadge,
  DamageClassIcon,
} from '@/app/entities/damage-class/ui';

interface MoveProps {
  move: MoveDetail;
  description: string;
}

export default function Move({ move, description }: MoveProps) {
  const moveType = { nameKo: move.typeNameKo, identifier: move.typeIdentifier };
  return (
    <div className="flex flex-col gap-y-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">{move.nameKo}</h1>
        <div className="pt-1.5 text-muted-foreground flex items-center">
          <span>{move.nameEn}</span>
          <DotIcon className="size-4.5" />
          <span>{move.nameJa}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-3 gap-y-1.5 items-center">
        <TypeBadge type={moveType} />
        <DamageClassBadge
          damageClass={move.damageClassIdentifier}
          damageClassEntity={{
            identifier: move.damageClassIdentifier,
            nameKo: move.damageClassNameKo,
          }}
        />
        {/* <DamageClassIcon damageClass={move.damageClassIdentifier} /> */}
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-1.5 items-center">
        <div className="min-w-14 w-14">
          <div className="text-muted-foreground text-md">위력</div>
          <div className="font-medium">
            {move.power ? `${move.power}` : '-'}
          </div>
        </div>
        <div className="min-w-14 w-14">
          <div className="text-muted-foreground text-md">명중률</div>
          <div className="font-medium">
            {move.accuracy ? `${move.accuracy}` : '-'}
          </div>
        </div>
        <div className="min-w-14 w-14">
          <div className="text-muted-foreground text-md">PP</div>
          <div className="font-medium">{move.pp ? `${move.pp}` : '-'}</div>
        </div>
        <div className="min-w-14 w-14">
          <div className="text-muted-foreground text-md">첫 등장</div>
          <div className="font-medium">
            {move.generation ? `${move.generation}세대` : '-'}
          </div>
        </div>
      </div>
      <p className="md:max-w-[80%] text-pretty break-keep">{description}</p>
    </div>
  );
}
