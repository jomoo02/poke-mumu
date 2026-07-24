'use client';

import { memo } from 'react';
import Link from 'next/link';

import { DamageClassIconV2 } from '@/app/entities/damage-class/ui';
import type { Move } from '@/entities/move/model';
import { TypeIcon } from '@/entities/type/ui';
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
        <ul className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {filteredMoves.map((move) => (
            <li key={move.identifier}>
              <MoveItem move={move} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

interface MoveItemProps {
  move: Move;
}

const MoveItem = memo(function MoveItem({ move }: MoveItemProps) {
  return (
    <Card
      variant={'link'}
      render={<Link href={`/move/${move.identifier}`} />}
      className="h-55.5"
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
              className="size-7 p-0.5 rounded-md"
            />
            <DamageClassIconV2
              damageClass={move.damageClassIdentifier}
              className="size-7 p-0.75 rounded-md"
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
            <div className="flex flex-col gap-0.5">
              <div className="text-sm font-medium text-foreground/70">위력</div>
              <div className="text-md tabular-nums">
                {move.power ? move.power : '-'}
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="text-sm font-medium text-foreground/70">
                명중률
              </div>
              <div className="text-md tabular-nums">{move.accuracy ?? '-'}</div>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="text-sm font-medium text-foreground/70">PP</div>
              <div className="text-md tabular-nums">{move.pp ?? '-'}</div>
            </div>
          </div>
        </CardGroup>
        <CardGroup>
          <p className="text-md text-muted-foreground break-keep line-clamp-2">
            {move.description}
          </p>
        </CardGroup>
      </CardContent>
    </Card>
  );
});
