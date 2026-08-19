import Link from 'next/link';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardGroup,
} from '@/shared/ui/card';
import type { Move } from '@/entities/move/model';
import { TypeIcon } from '@/entities/type/ui';
import { DamageClassIcon } from '@/entities/damage-class/ui';

interface MoveItemProps {
  move: Move;
}

export default function MoveItem({ move }: MoveItemProps) {
  return (
    <Card
      variant={'link'}
      render={<Link href={`/move/${move.identifier}`} />}
      className="h-61.5"
    >
      <CardHeader>
        <CardTitle className="flex justify-between items-start gap-x-2">
          {move.nameKo}
          <div className="flex gap-x-1.5">
            <TypeIcon
              type={{
                identifier: move.typeIdentifier,
                nameKo: move.typeNameKo,
              }}
            />
            <DamageClassIcon
              damageClass={{
                identifier: move.damageClassIdentifier,
                nameKo: move.damageClassNameKo,
              }}
            />
          </div>
        </CardTitle>
        <CardDescription className="line-clamp-1 tabular-nums">
          {`${move.nameEn} / ${move.nameJa}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CardGroup className="grid grid-cols-3 gap-2.5">
          <MoveItemValue subject="위력" value={move.power} />
          <MoveItemValue subject="명중" value={move.accuracy} />
          <MoveItemValue subject="PP" value={move.pp} />
        </CardGroup>
        <CardGroup>
          <p className="text-md text-pretty text-foreground/70 break-keep line-clamp-2">
            {move.description}
          </p>
        </CardGroup>
      </CardContent>
    </Card>
  );
}

interface MoveItemValueProps {
  subject: string;
  value: string | number | null;
}

function MoveItemValue({ subject, value }: MoveItemValueProps) {
  return (
    <div className="text-sm p-1 gap-0.5 bg-muted/70 rounded-xl flex flex-col items-center justify-center py-3">
      <span className="text-foreground/70">{`${subject}`}</span>
      <span>{value ? value : '-'}</span>
    </div>
  );
}
