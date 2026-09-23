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

export default function MoveListV4({ moves }: MoveListProps) {
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
        <div className="flex flex-col ">
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
      <div
        className={cn(
          'group relative rounded-xl flex flex-col gap-5 py-5',
          'md:grid md:grid-cols-12 md:py-6',
          '[@media(hover:hover)]:hover:bg-muted/70 -mx-2 px-2 md:-mx-3 md:px-3',
          'before:absolute before:inset-x-2 md:before:inset-x-3 before:top-0 before:h-px before:bg-border first:before:hidden',
          '[@media(hover:hover)]:hover:before:opacity-0 [@media(hover:hover)]:[div:hover+&]:before:opacity-0',
          'has-[a:focus-visible]:before:opacity-0 [div:has(a:focus-visible)+&]:before:opacity-0',
        )}
      >
        <div className="flex justify-between md:flex-col gap-y-3.5 md:col-span-3 md:justify-center">
          <div className="flex flex-col gap-1">
            <Link
              href={`/move/${move.identifier}`}
              className={cn(
                'font-semibold break-keep text-lg',
                'outline-none after:absolute after:inset-0 after:rounded-xl',
                'focus-visible:after:ring-[3px] focus-visible:after:ring-ring/50',
              )}
            >
              {move.nameKo}
            </Link>

            <p className="text-sm break-keep text-foreground/70 ">
              <span>{move.nameEn}</span>
              {' / '}
              <span>{move.nameJa}</span>
            </p>
          </div>
        </div>
        <div className="md:col-span-4 flex flex-col gap-3 justify-center ">
          <div className="flex gap-3 pt-2">
            <TypeBadge
              type={{
                identifier: move.typeIdentifier,
                nameKo: move.typeNameKo,
              }}
              className="h-7.75 w-22.25 shrink-0 rounded-4xl px-2 text-sm"
            />
            <DamageClassBadge
              damageClass={{
                identifier: move.damageClassIdentifier,
                nameKo: move.damageClassNameKo,
              }}
              className="h-7.75 w-22.25 shrink-0 rounded-4xl px-2 text-sm"
            />
          </div>
          {/* <div className="flex gap-1.5">
   
            <div className="flex gap-3.5 px-3 py-1.5 bg-muted rounded-2xl text-md ">
              <div className="flex gap-1 w-full">
                <div className="text-foreground/70">타입</div>
                <div className="text-center flex-1 font-medium">
                  {move.typeNameKo || '-'}
                </div>
              </div>
            </div>
            <div className="flex gap-3.5 px-3 py-1.5 bg-muted rounded-2xl text-md ">
              <div className="flex gap-1 w-full">
                <div className="text-foreground/70">분류</div>
                <div className="text-center flex-1 font-medium">
                  {move.damageClassNameKo || '-'}
                </div>
              </div>
            </div>
          </div> */}
          <div className="flex gap-3">
            <div className="flex gap-3.5 px-3 py-1.5 bg-muted rounded-2xl text-md ">
              <div className="flex gap-1 w-full">
                <div className="text-foreground/70">위력</div>
                <div className="text-center flex-1 font-medium">
                  {move.power || '-'}
                </div>
              </div>
            </div>
            <div className="flex gap-3.5 px-3 py-1.5 bg-muted rounded-2xl text-md ">
              <div className="flex gap-1 w-full">
                <div className="text-foreground/70">명중</div>
                <div className="text-center flex-1 font-medium">
                  {move.accuracy || '-'}
                </div>
              </div>
            </div>
            <div className="flex gap-3.5 px-3 py-1.5 bg-muted rounded-2xl text-md ">
              <div className="flex gap-1 w-full">
                <div className="text-foreground/70">PP</div>
                <div className="text-center flex-1 font-medium">
                  {move.pp || '-'}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-5 flex flex-col gap-5 md:gap-3.5 justify-center">
          <p className="md:flex md:items-center leading-relaxed break-keep text-foreground/70 ">
            {move.description}
          </p>
        </div>
        {/* <div className="h-full hidden md:flex items-center justify-end ">
          <div className="text-muted-foreground size-9 flex items-center justify-center ">
            <ChevronRightIcon className="size-5.5" />
          </div>
        </div> */}
      </div>
    </>
  );
}
