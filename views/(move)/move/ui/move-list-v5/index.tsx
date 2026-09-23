'use client';

import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/shared/lib/cn';
import type { Ability } from '@/entities/ability/model';
import { Button } from '@/shared/ui/button';
import { Pagination } from '@/shared/ui/pagination';

import type { Move } from '@/entities/move/model';
import { TypeBadge, TypeIcon } from '@/entities/type/ui';
import { DamageClassBadge, DamageClassIcon } from '@/entities/damage-class/ui';

interface MoveListProps {
  moves: Move[];
}

export default function MoveListV5({ moves }: MoveListProps) {
  return (
    <div className="flex flex-col gap-6">
      <div aria-live="polite" className="text-sm text-foreground/70">
        {moves.length}개의 특성
      </div>
      {moves.length === 0 ? (
        <div className="font-medium text-muted-foreground">
          일치하는 특성이 없습니다
        </div>
      ) : (
        // <div className="grid sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3  gap-6">
          {moves.map((move, idx) => (
            <MoveItem key={move.identifier} move={move} />
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
    <>
      <Link
        href={`/move/${move.identifier}`}
        className={cn(
          'p-5 g-accent/50 rounded-4xl border',
          'flex flex-col gap-5 overflow-hidden',
          'bg-card',
          '[@media(hover:hover)]:hover:bg-accent',
        )}
      >
        <div className="flex flex-col gap-1 overflow-hidden">
          <div className="flex justify-between w-full">
            <div className="flex gap-2 flex-1">
              <div className="font-medium text-lg min-w-0 truncate">
                {move.nameKo}
              </div>
            </div>
            <div className="flex gap-1">
              {' '}
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
          </div>

          <p className="min-w-0 truncate text-sm text-foreground/70">
            {`${move.nameEn} / ${move.nameJa}`}
          </p>
        </div>

        {/* <div className="flex gap-1.5 shrink-0"></div> */}
        <div className="grid grid-cols-3 gap-3">
          <Item label="위력" value={move.power} />
          <Item label="명중" value={move.accuracy} />
          <Item label="PP" value={move.pp} />
        </div>
      </Link>
    </>
  );
}

function Item({ label, value }: { label: string; value: number | null }) {
  return (
    <div className=" flex gap-1.5 items-center justify-center bg-muted p-1 rounded-2xl">
      <div className="text-foreground/70 text-sm font-medium">{label}</div>
      <div className="text-sm">{value || '-'}</div>
    </div>
  );
}
