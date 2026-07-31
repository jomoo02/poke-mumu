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
  showForm = false,
  formatLength = 4,
}: PokeLinkMobileProps) {
  const { nameKo, form, type1, type2, dexNumber } = poke;

  const bg = bgVariants[type1.identifier];
  const name = showForm && form ? `${nameKo} (${form})` : nameKo;

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
      <div className="flex gap-x-3.5 items-center w-full">
        <div
          className={cn(
            'bg-muted/70 rounded-2xl p-1.75',
            'group-hover:bg-transparent',
          )}
        >
          <PokeSprite poke={poke} className="size-12 2xs:size-12.5" />
        </div>

        <div className="flex-1 overflow-hidden p-2 -m-2 flex flex-col justify-center">
          <div
            className={cn(
              'text-sm flex font-medium tabular-nums text-foreground/70 truncate',
            )}
          >
            No.{formatNumber(dexNumber, formatLength)}
          </div>
          <Link
            href={`/pokedex/${poke.pokeKey}`}
            className={cn(
              'truncate outline-none rounded-sm px-1 -mx-1 min-w-0 text-md',
              'focus-visible:ring-[3px] focus-visible:ring-ring/50',
              'after:absolute after:-inset-1 after:z-10',
            )}
          >
            {name}
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-1 items-center">
          <TypeIcon type={type1} className="size-7 p-0.5 rounded-md " />
          {type2 && (
            <TypeIcon type={type2} className="size-7 p-0.5 rounded-md" />
          )}
        </div>
      </div>
    </div>
  );
}
