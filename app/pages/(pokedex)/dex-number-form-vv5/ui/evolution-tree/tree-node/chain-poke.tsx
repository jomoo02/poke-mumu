import Link from 'next/link';

import { PokeArtwork, PokeSprite } from '@/app/entities/poke/ui';
import { formatNumber } from '@/app/shared/lib/format';

import { type ChainNodeView } from '../../../model';

interface ChainPokeProps {
  poke: ChainNodeView;
}

export default function ChainPoke({ poke }: ChainPokeProps) {
  const { dexNumber, name, form, pokeKey } = poke;

  // const src = '/pokeball.svg';
  const href = `/pokedex/${dexNumber}/${pokeKey}`;
  const fomattedDexNumber = `No.${formatNumber(dexNumber)}`;

  return (
    <div className="flex flex-col h-full justify-center bg-background p-3">
      <Link href={href} className="hover:bg-accent rounded-xl outline-ring">
        <div className="p-2">
          <PokeArtwork
            poke={poke}
            // className="size-18"
            className="size-26 xs:size-28 sm:size-32 xl:size-36"
            priority
          />
        </div>
      </Link>
      <div className="flex flex-col pt-2">
        {' '}
        <div className="font-medium text-muted-foreground ">
          {fomattedDexNumber}
        </div>
        <Link
          href={href}
          className="font-medium hover:underline outline-ring text-foreground active:underline underline-offset-2 decoration-foreground text-lg"
        >
          {name}
        </Link>
        {form && (
          <div className="text-sm text-muted-foreground font-medium truncate  ">
            {form}
          </div>
        )}
      </div>
    </div>
  );
}
