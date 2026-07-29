import { DamageClassIcon } from '@/entities/damage-class/ui';
import { VersionMove } from '@/entities/move/model';
import { TypeIcon } from '@/entities/type/ui';
import {
  Card,
  CardContent,
  CardDescription,
  CardGroup,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import Link from 'next/link';

interface MoveItemProps {
  move: VersionMove;
}

export default function InitialMove({ move }: MoveItemProps) {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>초기값</CardTitle>
      </CardHeader>
      <CardContent>
        <CardGroup>
          <div className="text-lg">{move.nameKo}</div>
        </CardGroup>
        <CardGroup>
          <div className="grid grid-cols-3 gap-3">
            <MoveItemValue subject="타입" value={move.typeNameKo} />
            <MoveItemValue subject="분류" value={move.damageClassNameKo} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <MoveItemValue subject="위력" value={move.power} />
            <MoveItemValue subject="명중률" value={move.accuracy} />
            <MoveItemValue subject="PP" value={move.pp} />
          </div>
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
    <p>
      <span className="text-foreground/70">{`${subject}: `}</span>
      <span>{value ? value : '-'}</span>
    </p>
  );
}
