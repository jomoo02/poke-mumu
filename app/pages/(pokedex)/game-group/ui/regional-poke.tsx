import Link from 'next/link';

import { PokeSprite } from '@/app/entities/poke/ui';
import { formatNumber } from '@/app/shared/lib/format';
import { TypeBadge } from '@/app/entities/type/ui';

import { type RegionalPokeView } from '../model';

interface RegionalPokeProps {
  poke: RegionalPokeView;
  dexNumberMaxLength: number;
}

export default function RegionalPoke({
  poke,
  dexNumberMaxLength,
}: RegionalPokeProps) {
  const { name, type1, type2, dexNumber, regionalDexNumber, pokeKey } = poke;
  const formattedRegionDexNumber = formatNumber(
    regionalDexNumber,
    dexNumberMaxLength,
  );
  const href = `/pokedex/${dexNumber}/${pokeKey}`;

  return (
    <div className="flex flex-col gap-2">
      <Link
        href={href}
        className="flex flex-col items-center rounded-2xl hover:bg-accent active:bg-accent bg-card"
        aria-label={`${name} 상세 페이지로 이동`}
      >
        <div className="flex justify-center w-full p-4 z-10 ">
          <PokeSprite poke={poke} className="size-18" />
        </div>
        <div className="pb-4">
          <div className="">No.{formattedRegionDexNumber}</div>
          <div className="text-foreground min-w-0 truncate font-medium text-lg">
            {name}
          </div>
        </div>
      </Link>
      <div className="grid grid-cols-2 w-full gap-1.5 sm:gap-2">
        {type1 && (
          <TypeBadge type={type1} className="w-full max-w-40 mx-auto" />
        )}
        {type2 && (
          <TypeBadge type={type2} className="w-full max-w-40 mx-auto" />
        )}
      </div>
    </div>
  );
}
