'use client';

import Link from 'next/link';

import type { Move } from '@/entities/move/model';
import { TypeIcon } from '@/entities/type/ui';
import { DamageClassIcon } from '@/entities/damage-class/ui';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardGroup,
} from '@/shared/ui/card';

import useMoveList from './useMoveList';

interface MoveListProps {
  moves: Move[];
}

export default function MoveList({ moves }: MoveListProps) {
  const { filteredMoves } = useMoveList(moves);

  return (
    <div className="flex flex-col gap-6">
      <div aria-live="polite" className="text-sm text-foreground/70">
        {filteredMoves.length}개의 기술
      </div>
      {filteredMoves.length === 0 ? (
        <div className="font-medium text-muted-foreground">
          일치하는 기술이 없습니다
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {filteredMoves.map((move) => (
            <MoveItem move={move} key={move.identifier} />
          ))}
        </div>
      )}
    </div>
  );
}

interface MoveItemProps {
  move: Move;
}

function MoveItem({ move }: MoveItemProps) {
  return (
    <Card
      variant={'link'}
      render={<Link href={`/move/${move.identifier}`} />}
      className="h-50"
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
        <CardGroup>
          <div className="grid grid-cols-3 gap-3">
            <MoveItemValue subject="위력" value={move.power} />
            <MoveItemValue subject="명중률" value={move.accuracy} />
            <MoveItemValue subject="PP" value={move.pp} />
          </div>
        </CardGroup>
        <CardGroup>
          <p className="text-md text-balance text-muted-foreground break-keep line-clamp-2">
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
    <p className="text-md">
      <span className="text-foreground/70">{`${subject}: `}</span>
      <span>{value ? value : '-'}</span>
    </p>
  );
}
