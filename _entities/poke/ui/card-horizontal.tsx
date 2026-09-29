import Link from 'next/link';

import { cn } from '@/_shared/lib/cn';
import { Skeleton, SkeletonLine } from '@/_shared/ui/skeleton';
import { TypeIcon, getTypeColor } from '@/_entities/type/@x/poke';

import { getPokeHref, type Poke } from '../model/poke';
import { formatDexNumber, getPokeName } from '../model/poke-label';
import { PokeSprite } from './sprite';

interface PokeCardHorizontalProps {
  poke: Poke;
  showForm?: boolean;
  className?: string;
}

export function PokeCardHorizontal({
  poke,
  showForm = true,
  className,
}: PokeCardHorizontalProps) {
  const { type1, type2 } = poke;

  return (
    <div className={cn('group relative isolate w-full', className)}>
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute -inset-x-2.5 -inset-y-1 -z-10 rounded-xl',
          'scale-0 origin-center',
          '[@media(hover:hover)]:group-hover:scale-100',
          getTypeColor(type1.identifier).soft,
        )}
      />
      <div className="flex w-full items-center gap-x-3.5">
        <div
          className={cn(
            'rounded-2xl bg-muted/70 p-1.75',
            '[@media(hover:hover)]:group-hover:bg-transparent',
          )}
        >
          <PokeSprite poke={poke} alt="" className="size-12.5" />
        </div>

        <div className="-m-2 flex flex-1 flex-col justify-center overflow-hidden p-2">
          <div className="truncate text-sm font-medium tabular-nums text-foreground/70">
            {formatDexNumber(poke.dexNumber)}
          </div>
          <Link
            href={getPokeHref(poke)}
            className={cn(
              '-mx-1 min-w-0 truncate rounded-sm px-1 outline-none',
              'focus-visible:ring-[3px] focus-visible:ring-ring/50',
              // 카드 전체를 클릭 영역으로
              'after:absolute after:-inset-1 after:z-10',
            )}
          >
            {getPokeName(poke, { withForm: showForm })}
          </Link>
        </div>

        <div className="grid grid-cols-2 items-center gap-1">
          <TypeIcon type={type1} />
          {type2 && <TypeIcon type={type2} />}
        </div>
      </div>
    </div>
  );
}

// PokeCardHorizontal과 같은 크기. 카드 레이아웃을 바꾸면 함께 맞춘다
export function PokeCardHorizontalSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn('flex w-full items-center gap-x-3.5', className)}
    >
      {/* 스프라이트 50px + p-1.75 */}
      <Skeleton className="size-16 rounded-2xl" />
      <div className="flex flex-1 flex-col">
        <div className="text-sm">
          <SkeletonLine className="w-16" />
        </div>
        <SkeletonLine className="w-24" />
      </div>
      <div className="grid grid-cols-2 gap-1">
        <Skeleton className="size-7" />
        <Skeleton className="size-7" />
      </div>
    </div>
  );
}
