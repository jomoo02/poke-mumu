import Link from 'next/link';

import { PokeSprite } from '@/app/entities/poke/ui';
import { formatNumber } from '@/app/shared/lib/format';

import { type RegionalPokeView } from '../../model';
import { cn } from '@/app/shared/lib/cn';

interface RegionaldexProps {
  pokes: RegionalPokeView[];
}

export default function RegionalDexList({ pokes }: RegionaldexProps) {
  const maxLength = `${Math.max(
    ...pokes.map(({ regionalDexNumber }) => regionalDexNumber),
  )}`.length;

  return (
    <div className="flex flex-col divide-y max-w-xl mx-auto w-full">
      {pokes.map((poke) => (
        <ListItem
          key={poke.pokeKey}
          poke={poke}
          dexNumberMaxLength={maxLength}
        />
      ))}
    </div>
  );
}

interface ListItemProps {
  poke: RegionalPokeView;
  dexNumberMaxLength: number;
}

function ListItem({ poke, dexNumberMaxLength }: ListItemProps) {
  const formattedRegionDexNumber = formatNumber(
    poke.regionalDexNumber,
    dexNumberMaxLength,
  );

  return (
    <Link
      href={`/pokedex/${poke.pokeKey}`}
      className={cn(
        'flex items-center gap-x-4 py-2.5 px-4 hover:bg-accent/70 active:bg-accent/70',
        'outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
      )}
    >
      <div className="p-2 bg-accent/50 rounded-2xl">
        <PokeSprite poke={poke} className="size-13" />
      </div>

      <div>
        <div className="text-sm  w-14 shrink-0">
          No.{formattedRegionDexNumber}
        </div>
        <div className="font-medium truncate flex-1">{poke.nameKo}</div>
      </div>
    </Link>
  );
}
