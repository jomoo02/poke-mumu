import Link from 'next/link';

import { PokeSprite } from '@/app/entities/poke/ui';
import { formatNumber } from '@/app/shared/lib/format';

import { type RegionalPokeView } from '../../model';
import { cn } from '@/app/shared/lib/cn';

interface RegionalDexGridProps {
  pokes: RegionalPokeView[];
}

export default function RegionalDexGrid({ pokes }: RegionalDexGridProps) {
  const maxLength = `${Math.max(
    ...pokes.map(({ regionalDexNumber }) => regionalDexNumber),
  )}`.length;

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3 sm:gap-6 max-w-7xl mx-auto w-full">
      {pokes.map((poke) => (
        <GridItem
          key={poke.pokeKey}
          poke={poke}
          dexNumberMaxLength={maxLength}
        />
      ))}
    </div>
  );
}

interface GridItemProps {
  poke: RegionalPokeView;
  dexNumberMaxLength: number;
}

function GridItem({ poke, dexNumberMaxLength }: GridItemProps) {
  const { nameKo, regionalDexNumber, pokeKey } = poke;

  const formattedRegionDexNumber = formatNumber(
    regionalDexNumber,
    dexNumberMaxLength,
  );

  const href = `/pokedex/${pokeKey}`;

  return (
    <Link
      href={href}
      className={cn(
        'flex flex-col items-center rounded-4xl hover:bg-accent active:bg-accent p-4 bg-accent/50 overflow-hidden',
        'outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
      )}
      aria-label={`${nameKo} 상세 페이지로 이동`}
    >
      <div className="flex justify-center w-full p-2 z-10 ">
        <PokeSprite poke={poke} className="size-13 sm:size-15" />
      </div>
      <div className="max-w-full">
        <div className="text-md text-center truncate">
          No.{formattedRegionDexNumber}
        </div>
        <div className="text-foreground min-w-0 truncate font-medium text-center">
          {nameKo}
        </div>
      </div>
    </Link>
  );
}
