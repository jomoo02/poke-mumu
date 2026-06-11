import { PokeSprite } from '@/entities/poke/ui';
import { formatNumber } from '@/shared/lib/format';
import { TypeIcon } from '@/entities/type/ui';
import { cn } from '@/shared/lib/cn';

import type { PokeItemFeature } from '../model';
import Link from 'next/link';

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
          'block w-full group',
          // 'relative isolate rounded-2xl',
          // 'before:absolute before:-inset-2 before:z-1 before:rounded-2xl',
          // 'before:bg-muted before:origin-center',
          // 'before:scale-0 before:transition-transform before:duration-100 before:ease-out',
          // 'hover:before:scale-100',
        )}
      >
        <div className="flex gap-x-3.5 relative z-10 items-center">
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
      </Link>

      <div className="grid grid-cols-2 gap-1.5 items-center pr-2.5 shrink-0">
        <TypeIcon type={type1} className="size-7  rounded-md " />

        {type2 && <TypeIcon type={type2} className="size-7 rounded-md" />}
      </div>
    </div>
  );
}

interface PokeItemProps {
  poke: PokeItemFeature;
  formatLength?: number;
  className?: string;
  showForm?: boolean;
}
export function NationalPokeItem({
  poke,
  className,
  formatLength = 4,
  showForm = true,
}: PokeItemProps) {
  const { nameKo, form, type1, type2, dexNumber } = poke;

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <Link
        href={`/pokedex/${poke.pokeKey}`}
        className={cn(
          'block w-full group',
          // 'relative before:absolute before:-inset-2 before:rounded-4xl before:z-0',
          // 'before:transition-colors hover:before:bg-muted',

          'relative isolate rounded-4xl',
          'before:absolute before:-inset-2 before:z-1 before:rounded-4xl',
          'before:bg-muted before:origin-center',
          'before:scale-0 before:transition-transform before:duration-100 before:ease-out',
          'hover:before:scale-100',
        )}
      >
        <div className="bg-muted/50  duration-100 rounded-4xl  p-2 w-full flex justify-center items-center aspect-square relative z-10">
          <PokeSprite poke={poke} className="size-20" />
        </div>
        <div className="font-medium tabular-nums text-foreground/70 pt-1.5 text-center relative z-10">
          No.{formatNumber(dexNumber, formatLength)}
        </div>
        <div className="flex flex-col flex-1 overflow-hidden text-center relative z-10">
          <div className="font-medium truncate">{nameKo}</div>
          {showForm && (
            <div className="text-foreground/70 text-md truncate">{form}</div>
          )}
        </div>
      </Link>

      <div className="grid grid-cols-2 gap-2 items-center shrink-0 pt-3">
        <TypeIcon type={type1} className="size-7.5  rounded-md " />

        {type2 && <TypeIcon type={type2} className="size-7.5 rounded-md" />}
      </div>
    </div>
  );
}
