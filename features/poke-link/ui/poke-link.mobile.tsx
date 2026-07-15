import Link from 'next/link';

import { PokeSprite } from '@/entities/poke/ui';
import { formatNumber } from '@/shared/lib/format';
import { TypeIcon } from '@/entities/type/ui';
import { cn } from '@/shared/lib/cn';

import { bgVariants } from './util';
import type { PokeLinkPoke } from '../model';

interface PokeLinkMobileProps {
  poke: PokeLinkPoke;
  className?: string;
  formatLength?: number;
  showForm?: boolean;
}

export function PokeLinkMobile({
  poke,
  className,
  formatLength = 4,
  showForm = true,
}: PokeLinkMobileProps) {
  const { nameKo, form, type1, type2, dexNumber } = poke;

  const bg = bgVariants[type1.identifier];

  return (
    <div className={cn('relative w-full isolate group', className)}>
      <div
        aria-hidden
        className={cn(
          'absolute -inset-x-3 -inset-y-1 -z-10 rounded-xl pointer-events-none',
          'scale-0 origin-center',
          'group-hover:scale-100',
          bg,
        )}
      />
      <div className="flex gap-x-3.5 items-center">
        <div
          className={cn(
            'bg-muted/50 rounded-2xl p-2',
            'group-hover:bg-transparent',
          )}
        >
          <PokeSprite poke={poke} className="size-11.5 2xs:size-12" />
        </div>
        <div className="text-md flex font-medium tabular-nums text-foreground/70">
          {formatNumber(dexNumber, formatLength)}
        </div>
        <div className="w-full overflow-hidden p-2 -m-2 flex flex-col justify-center">
          <Link
            href={`/pokedex/${poke.pokeKey}`}
            className={cn(
              ' truncate outline-none rounded-sm px-1 -mx-1',
              'focus-visible:ring-[3px] focus-visible:ring-ring/50',
              'after:absolute after:-inset-1 after:z-10',
            )}
          >
            {nameKo}
          </Link>

          {showForm && (
            <div className="text-foreground/70 text-sm truncate">{form}</div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-1 items-center shrink-0">
          <TypeIcon type={type1} className="size-7 p-0.5 rounded-md " />

          {type2 && (
            <TypeIcon type={type2} className="size-7 p-0.5 rounded-md" />
          )}
        </div>
      </div>

      {/* <Link
        href={`/pokedex/${poke.pokeKey}`}
        className={cn('flex items-center gap-x-3.5')}
      >
        <div className="flex gap-x-3.5 z-10 items-center flex-1">
          <div className="bg-muted/50 rounded-2xl p-2">
            <PokeSprite poke={poke} className="size-11.5 2xs:size-12" />
          </div>
          <div className="text-md flex font-medium tabular-nums text-foreground/70">
            {formatNumber(dexNumber, formatLength)}
          </div>
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="font-medium truncate">
              {nameKo}sdsds;dls;ld;sld;sldls;ds
            </div>
            {showForm && (
              <div className="text-foreground/70 text-sm truncate">{form}</div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1 items-center shrink-0">
          <TypeIcon type={type1} className="size-7 p-0.5 rounded-md " />

          {type2 && (
            <TypeIcon type={type2} className="size-7 p-0.5 rounded-md" />
          )}
        </div>
      </Link> */}
    </div>
  );
}
