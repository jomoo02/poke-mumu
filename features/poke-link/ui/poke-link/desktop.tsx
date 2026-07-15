import Link from 'next/link';

import { PokeSprite } from '@/entities/poke/ui';
import { formatNumber } from '@/shared/lib/format';
import { TypeIcon } from '@/entities/type/ui';
import { cn } from '@/shared/lib/cn';

import type { PokeLinkPoke } from '../../model';
import { bgVariants } from '../util';

interface PokeItemProps {
  poke: PokeLinkPoke;
  formatLength?: number;
  className?: string;
  showForm?: boolean;
  showType?: boolean;
}

export function PokeLinkDesktop({
  poke,
  className,
  formatLength = 4,
  showForm = true,
  showType = true,
}: PokeItemProps) {
  const { nameKo, form, type1, type2, dexNumber } = poke;

  const bg = bgVariants[type1.identifier];

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="w-full group relative isolate rounded-4xl">
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
        <div className="relative bg-muted/50 group-hover:bg-transparent duration-250 rounded-4xl p-2 w-full flex justify-center items-center aspect-square">
          <PokeSprite poke={poke} className="size-18" alt=" " />
        </div>

        <div className="relative font-medium tabular-nums text-foreground/70 pt-1.5 text-md text-center">
          No.{formatNumber(dexNumber, formatLength)}
        </div>

        <div className="flex-1">
          <div className="flex justify-center">
            <Link
              href={`/pokedex/${poke.pokeKey}`}
              className="truncate outline-none rounded-sm px-1 font-medium
          focus-visible:ring-[3px] focus-visible:ring-ring/50
          after:absolute after:-inset-1 after:z-10"
            >
              {nameKo}
            </Link>
          </div>
          {showForm && (
            <div className="text-foreground/70 text-sm truncate min-h-5 text-center px-px">
              {form}
            </div>
          )}
        </div>

        {/* 타입 */}
        {showType && (
          <div className="relative flex justify-center gap-1 items-center shrink-0 pt-1.5">
            <TypeIcon type={type1} className="size-7 p-0.5 rounded-md" />
            {type2 ? (
              <TypeIcon type={type2} className="size-7 p-0.5 rounded-md" />
            ) : (
              <div className="size-7.5" />
            )}
          </div>
        )}
      </div>
    </div>
    // <div className={cn('flex flex-col items-center', className)}>
    //   <div
    //     className={cn(
    //       'w-full group relative isolate rounded-4xl',
    //       'before:absolute before:-inset-3 before:z-1 before:rounded-4xl', // z-1 → -z-10
    //       'before:origin-center before:scale-0',
    //       'before:transition-transform before:duration-200 before:ease-out',
    //       'hover:before:scale-100',
    //       bg,
    //     )}
    //   >
    //     <div className="relative bg-muted/50 group-hover:bg-transparent duration-200 rounded-4xl p-2 w-full flex justify-center items-center aspect-square">
    //       <PokeSprite poke={poke} className="size-20" />
    //     </div>

    //     <div className="relative font-medium tabular-nums text-foreground/70 pt-1.5 text-sm text-center">
    //       No.{formatNumber(dexNumber, formatLength)}
    //     </div>

    //     {/* 이름 = Link + overlay */}
    //     <div className="flex flex-col flex-1">
    //       <Link
    //         href={`/pokedex/${poke.pokeKey}`}
    //         className="text-lg truncate outline-none rounded-sm px-1 bg-muted
    //       focus-visible:ring-[3px] focus-visible:ring-ring/50
    //       after:absolute after:inset-3 after:z-10"
    //       >
    //         {nameKo}
    //       </Link>
    //       {showForm && (
    //         <div className="text-foreground/70 text-sm truncate min-h-5">
    //           {form}
    //         </div>
    //       )}
    //     </div>

    //     <div className="relative flex justify-center gap-2 items-center shrink-0 pt-1.5">
    //       <TypeIcon type={type1} className="size-7.5 rounded-md" />
    //       {type2 ? (
    //         <TypeIcon type={type2} className="size-7.5 rounded-md" />
    //       ) : (
    //         <div className="size-7.5" />
    //       )}
    //     </div>
    //   </div>
    // </div>

    // <div className={cn('flex flex-col items-center', className)}>
    //   <Link
    //     href={`/pokedex/${poke.pokeKey}`}
    //     className={cn(
    //       'block w-full group',
    //       'relative isolate rounded-4xl',
    //       'before:absolute before:-inset-3 before:z-1 before:rounded-4xl',
    //       ' before:origin-center',
    //       'before:scale-0 before:transition-transform before:duration-200 before:ease-out',
    //       'hover:before:scale-100',
    //       bg,
    //     )}
    //   >
    //     <div className="bg-muted/50 group-hover:bg-transparent duration-200 rounded-4xl p-2 w-full flex justify-center items-center aspect-square relative z-10">
    //       <PokeSprite poke={poke} className="size-20" />
    //     </div>

    //     <div className="font-medium tabular-nums text-foreground/70 pt-1.5 text-sm text-center relative z-10">
    //       No.{formatNumber(dexNumber, formatLength)}
    //     </div>
    //     <div className="flex flex-col flex-1 overflow-hidden text-center relative z-10">
    //       <div className="text-lg truncate">{nameKo}</div>
    //       {showForm && (
    //         <div className="text-foreground/70 text-sm truncate min-h-5">
    //           {form}
    //         </div>
    //       )}
    //     </div>

    //     <div className="flex justify-center gap-2 items-center shrink-0 pt-1.5 relative z-10">
    //       <TypeIcon type={type1} className="size-7.5  rounded-md " />

    //       {type2 ? (
    //         <TypeIcon type={type2} className="size-7.5 rounded-md" />
    //       ) : (
    //         <div className="size-7.5" />
    //       )}
    //     </div>
    //   </Link>
    // </div>
  );
}
