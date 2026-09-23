'use client';

import Link from 'next/link';
import { ChevronRightIcon } from 'lucide-react';

import type { Move } from '@/entities/move/model';
import { TypeIcon } from '@/entities/type/ui';
import { DamageClassIcon } from '@/entities/damage-class/ui';
import { cn } from '@/shared/lib/cn';
import { Pagination } from '@/shared/ui/pagination';

import useMoveList from './useMoveList';

interface MoveListProps {
  moves: Move[];
}

export default function MoveListV2({ moves }: MoveListProps) {
  const { filteredMoves, pagedMoves, currentPage, totalPages, goToPage } =
    useMoveList(moves);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-x-4 text-sm text-foreground/70">
        <span aria-live="polite">{filteredMoves.length}개의 기술</span>
        {totalPages > 1 && (
          <span className="tabular-nums">
            {currentPage} / {totalPages} 페이지
          </span>
        )}
      </div>
      {filteredMoves.length === 0 ? (
        <div className="font-medium text-muted-foreground">
          일치하는 기술이 없습니다
        </div>
      ) : (
        <>
          <div className="flex flex-col">
            {pagedMoves.map((move) => (
              <MoveItem key={move.identifier} move={move} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            className="pt-4"
          />
        </>
      )}
    </div>
  );
}

interface MoveItemProps {
  move: Move;
}

function MoveItem({ move }: MoveItemProps) {
  return (
    <div
      className={cn(
        'group relative rounded-xl flex flex-col gap-4 py-5',
        'md:grid md:grid-cols-8 md:gap-6 md:py-7',
        '[@media(hover:hover)]:hover:bg-muted/70 -mx-3 px-3',
        'before:absolute before:inset-x-3 before:top-0 before:h-px before:bg-border first:before:hidden',
        '[@media(hover:hover)]:hover:before:opacity-0 [@media(hover:hover)]:[div:hover+&]:before:opacity-0',
        'has-[a:focus-visible]:before:opacity-0 [div:has(a:focus-visible)+&]:before:opacity-0',
      )}
    >
      <div className="flex flex-col gap-2 md:col-span-2">
        <div className="flex items-start justify-between gap-x-2">
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
          <div className="flex shrink-0 gap-x-1.5">
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
        <p className="text-sm break-keep text-foreground/70">
          <span>{move.nameEn}</span>
          {' / '}
          <span>{move.nameJa}</span>
        </p>
      </div>
      <div className="flex flex-col gap-3 md:col-span-5">
        <dl className="flex gap-x-5 text-sm tabular-nums">
          <MoveItemValue subject="위력" value={move.power} />
          <MoveItemValue subject="명중" value={move.accuracy} />
          <MoveItemValue subject="PP" value={move.pp} />
        </dl>
        <p className="leading-relaxed break-keep text-pretty text-foreground/70">
          {move.description}
        </p>
      </div>
      <div className="h-full hidden md:flex items-center justify-end">
        <div className="text-muted-foreground size-9 flex items-center justify-center">
          <ChevronRightIcon className="size-5.5" />
        </div>
      </div>
    </div>
  );
}

interface MoveItemValueProps {
  subject: string;
  value: number | null;
}

function MoveItemValue({ subject, value }: MoveItemValueProps) {
  return (
    <div className="flex items-center gap-x-1.5">
      <dt className="text-foreground/70">{subject}</dt>
      <dd className="font-medium">{value ?? '-'}</dd>
    </div>
  );
}
