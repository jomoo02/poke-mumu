import Link from 'next/link';

import { PokeSprite } from '@/entities/poke/ui';
import { formatNumber } from '@/shared/lib/format';
import { TypeIcon } from '@/entities/type/ui';
import { cn } from '@/shared/lib/cn';

import type { PokeItemFeature } from '../model';

interface PokeItemProps {
  poke: PokeItemFeature;
  formatLength?: number;
  showForm?: boolean;
  className?: string;
}

export function PokeItem({
  poke,
  className,
  formatLength = 4,
  showForm = true,
}: PokeItemProps) {
  const { nameKo, form, type1, type2, dexNumber } = poke;

  return (
    <div
      className={cn(
        'flex items-center gap-x-3.5 w-full rounded-2xl',
        className,
      )}
    >
      <Link
        href={`/pokedex/${poke.pokeKey}`}
        className={cn(
          'w-full group flex',
          // 'relative isolate rounded-2xl',
          // 'before:absolute before:-inset-2 before:z-1 before:rounded-2xl',
          // 'before:bg-muted before:origin-center',
          // 'before:scale-0 before:transition-transform before:duration-100 before:ease-out',
          // 'hover:before:scale-100',
        )}
      >
        <div className="flex gap-x-3.5 relative z-10 items-center flex-1">
          <div className="bg-muted/50 rounded-2xl p-2">
            <PokeSprite poke={poke} className="size-11.5 2xs:size-12" />
          </div>
          <div className="text-md flex font-medium tabular-nums text-foreground/70">
            {formatNumber(dexNumber, formatLength)}
          </div>
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="font-medium truncate">{nameKo}</div>
            {showForm && (
              <div className="text-foreground/70 text-sm truncate">{form}</div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1.5 items-center pr-2.5 shrink-0">
          <TypeIcon type={type1} className="size-7  rounded-md " />

          {type2 && <TypeIcon type={type2} className="size-7 rounded-md" />}
        </div>
      </Link>
    </div>
  );
}

const bgVariants: Record<string, string> = {
  normal: 'before:bg-normal/10 dark:before:bg-normal/20',
  fire: 'before:bg-fire/10 dark:before:bg-fire/20',
  water: 'before:bg-water/10 dark:before:bg-water/20',
  grass: 'before:bg-grass/10 dark:before:bg-grass/20',
  electric: 'before:bg-electric/10 dark:before:bg-electric/20',
  ice: 'before:bg-ice/10 dark:before:bg-ice/20',
  fighting: 'before:bg-fighting/10 dark:before:bg-fighting/20',
  poison: 'before:bg-poison/10 dark:before:bg-poison/20',
  ground: 'before:bg-ground/10 dark:before:bg-ground/20',
  flying: 'before:bg-flying/10 dark:before:bg-flying/20',
  psychic: 'before:bg-psychic/10 dark:before:bg-psychic/20',
  bug: 'before:bg-bug/10 dark:before:bg-bug/20',
  rock: 'before:bg-rock/10 dark:before:bg-rock/20',
  ghost: 'before:bg-ghost/10 dark:before:bg-ghost/20',
  dragon: 'before:bg-dragon/10 dark:before:bg-dragon/20',
  dark: 'before:bg-dark/10 dark:before:bg-dark/20',
  steel: 'before:bg-steel/10 dark:before:bg-steel/20',
  fairy: 'before:bg-fairy/10 dark:before:bg-fairy/20',
  unknown: 'before:bg-unknown/10 dark:before:bg-unknown/20',
};

interface PokeItemProps {
  poke: PokeItemFeature;
  formatLength?: number;
  className?: string;
  showForm?: boolean;
  showType?: boolean;
}

export function NationalPokeItem({
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
      <Link
        href={`/pokedex/${poke.pokeKey}`}
        className={cn(
          'block w-full group',
          'relative isolate rounded-4xl',
          'before:absolute before:-inset-3 before:z-1 before:rounded-4xl',
          ' before:origin-center',
          'before:scale-0 before:transition-transform before:duration-200 before:ease-out',
          'hover:before:scale-100',
          bg,
        )}
      >
        <div className="bg-muted/50 group-hover:bg-transparent duration-200 rounded-4xl p-2 w-full flex justify-center items-center aspect-square relative z-10">
          <PokeSprite poke={poke} className="size-20" />
        </div>
        <div className="font-medium tabular-nums text-foreground/70 pt-1.5 text-sm text-center relative z-10">
          No.{formatNumber(dexNumber, formatLength)}
        </div>
        <div className="flex flex-col flex-1 overflow-hidden text-center relative z-10">
          <div className="text-lg truncate">{nameKo}</div>
          {showForm && (
            <div className="text-foreground/70 text-md truncate min-h-5.25">
              {form}
            </div>
          )}
        </div>
        {showType && (
          <div className="flex justify-center gap-2 items-center shrink-0 pt-1.5 relative z-10">
            <TypeIcon type={type1} className="size-7.5  rounded-md " />

            {type2 ? (
              <TypeIcon type={type2} className="size-7.5 rounded-md" />
            ) : (
              <div className="size-7.5" />
            )}
          </div>
        )}
      </Link>
    </div>
  );
}
