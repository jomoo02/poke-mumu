import Link from 'next/link';

import { cn } from '@/_shared/lib/cn';
import { TypeIcon, getTypeColor } from '@/_entities/type/@x/poke';

import { getPokeHref, type Poke } from '../model/poke';
import { formatDexNumber, getPokeName } from '../model/poke-label';
import { PokeSprite } from './sprite';

interface PokeCardVerticalProps {
  poke: Poke;
  showForm?: boolean;
  className?: string;
}

export function PokeCardVertical({
  poke,
  showForm = true,
  className,
}: PokeCardVerticalProps) {
  const { type1, type2 } = poke;

  return (
    <div
      className={cn(
        'group relative isolate flex w-full flex-col items-center rounded-4xl',
        className,
      )}
    >
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute -inset-3 -z-10 rounded-4xl',
          'scale-0 origin-center transition-transform duration-250 ease-out',
          '[@media(hover:hover)]:group-hover:scale-100',
          getTypeColor(type1.identifier).soft,
        )}
      />
      <div
        className={cn(
          'relative flex aspect-square w-full items-center justify-center rounded-4xl bg-muted/70 p-2',
          'duration-250 [@media(hover:hover)]:group-hover:bg-transparent',
        )}
      >
        <PokeSprite poke={poke} alt="" className="size-18" />
      </div>

      <div className="pt-1.5 text-center font-medium tabular-nums text-foreground/70">
        {formatDexNumber(poke.dexNumber)}
      </div>

      <div className="-m-1 flex w-full justify-center overflow-hidden p-1">
        <Link
          href={getPokeHref(poke)}
          className={cn(
            'truncate rounded-sm font-medium outline-none',
            'focus-visible:ring-[3px] focus-visible:ring-ring/50',
            // 카드 전체를 클릭 영역으로
            'after:absolute after:-inset-1 after:z-10',
          )}
        >
          {getPokeName(poke, { withForm: showForm })}
        </Link>
      </div>

      <div className="flex shrink-0 items-center justify-center gap-1 pt-1.5">
        <TypeIcon type={type1} />
        {/* 단일 타입도 카드 높이·정렬을 맞추기 위해 자리 유지 */}
        {type2 ? <TypeIcon type={type2} /> : <div className="size-7" />}
      </div>
    </div>
  );
}
