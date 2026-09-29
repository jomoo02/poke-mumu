import Link from 'next/link';

import { cn } from '@/_shared/lib/cn';
import { TypeIcon, getTypeColor } from '@/_entities/type/@x/poke';

import { getPokeHref, getPokeTypes, type Poke } from '../model/poke';
import { formatDexNumber, getPokeName } from '../model/poke-label';
import { PokeSprite } from './sprite';

interface PokeCardProps {
  poke: Poke;
  showForm?: boolean;
  className?: string;
}

// 모바일: 가로형(스프라이트 | 번호·이름 | 타입), sm 이상: 세로형
// 가로형·세로형 카드를 둘 다 렌더링하고 숨기는 대신 DOM 하나로 레이아웃만 전환
export function PokeCard({ poke, showForm = true, className }: PokeCardProps) {
  return (
    <div
      className={cn(
        'group relative isolate flex w-full items-center gap-x-3.5',
        'sm:flex-col sm:gap-x-0',
        className,
      )}
    >
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute -z-10 scale-0 origin-center',
          '-inset-x-3 -inset-y-1 rounded-xl sm:-inset-3 sm:rounded-4xl',
          'transition-transform duration-250 ease-out',
          '[@media(hover:hover)]:group-hover:scale-100',
          getTypeColor(poke.type1.identifier).soft,
        )}
      />

      <div
        className={cn(
          'shrink-0 rounded-2xl bg-muted/70 p-1.75 duration-250',
          'sm:flex sm:aspect-square sm:w-full sm:items-center sm:justify-center sm:rounded-4xl sm:p-2',
          '[@media(hover:hover)]:group-hover:bg-transparent',
        )}
      >
        <PokeSprite poke={poke} alt="" className="size-12.5 sm:size-18" />
      </div>

      <div className="-m-1 flex min-w-0 flex-1 flex-col overflow-hidden p-1 sm:w-full sm:items-center sm:pt-2.5">
        <span className="text-sm font-medium tabular-nums text-foreground/70 sm:text-base">
          {formatDexNumber(poke.dexNumber)}
        </span>
        <Link
          href={getPokeHref(poke)}
          className={cn(
            'max-w-full truncate rounded-sm font-medium outline-none',
            'focus-visible:ring-[3px] focus-visible:ring-ring/50',
            // 카드 전체를 클릭 영역으로
            'after:absolute after:-inset-1 after:z-10',
          )}
        >
          {getPokeName(poke, { withForm: showForm })}
        </Link>
      </div>

      <div className="grid shrink-0 grid-cols-2 gap-1 sm:flex sm:pt-1.5">
        {getPokeTypes(poke).map((type) => (
          <TypeIcon key={type.id} type={type} />
        ))}
      </div>
    </div>
  );
}
