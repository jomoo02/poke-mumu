import Link from 'next/link';

import { PokeSprite } from '@/entities/poke-v2/ui';
import { formatNumber } from '@/shared/lib/format';
import { TypeIcon } from '@/entities/type/ui';
import { cn } from '@/shared/lib/cn';

import type { PokeLinkPoke } from '../model';
import { bgVariants } from './utils';

interface PokeLinkVerticalProps {
  poke: PokeLinkPoke;
  formatLength?: number;
  className?: string;
  showForm?: boolean;
}

export function PokeLinkVertical({
  poke,
  className,
  formatLength = 4,
  showForm = true,
}: PokeLinkVerticalProps) {
  const { nameKo, form, type1, type2, dexNumber } = poke;

  const bg = bgVariants[type1.identifier];

  const name =
    showForm && form && form.shortKo ? `${nameKo} (${form.shortKo})` : nameKo;

  return (
    <div
      className={cn(
        'flex flex-col items-center',
        'w-full group relative isolate rounded-4xl',
        // 'w-full max-w-[150px] mx-auto',
        className,
      )}
    >
      <div
        aria-hidden
        className={cn(
          'absolute -inset-3 -z-10 rounded-4xl pointer-events-none',
          'scale-0 origin-center',
          'transition-transform duration-250 ease-out',
          'group-hover:scale-100',
          bg,
        )}
      />
      <div className="relative bg-muted/70 group-hover:bg-transparent duration-250 rounded-4xl p-2 w-full flex justify-center items-center aspect-square">
        <PokeSprite poke={poke} className="size-18" alt=" " />
        {/* <div className="size-18" /> */}
      </div>

      <div className="relative font-medium tabular-nums text-foreground/70 pt-1.5 text-md text-center">
        No.{formatNumber(dexNumber, formatLength)}
      </div>

      <div className="w-full overflow-hidden p-1 -m-1 flex flex-col">
        <div className="flex justify-center">
          <Link
            href={`/pokedex/${poke.pokeKey}`}
            className={cn(
              'truncate outline-none rounded-sm font-medium text-md',
              'focus-visible:ring-[3px] focus-visible:ring-ring/50',
              'after:absolute after:-inset-1 after:z-10',
            )}
          >
            {name}
          </Link>
        </div>
      </div>
      <div className="flex justify-center gap-1 items-center shrink-0 pt-1.5">
        <TypeIcon type={type1} className="size-7 p-0.5 rounded-md" />
        {type2 ? (
          <TypeIcon type={type2} className="size-7 p-0.5 rounded-md" />
        ) : (
          <div className="size-7" />
        )}
      </div>
    </div>
  );
}
