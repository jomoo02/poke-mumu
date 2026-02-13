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
  const fomattedDexNumber = `#${formatNumber(dexNumber)}`;

  return (
    <div className="flex flex-col h-full justify-center  bg-background">
      <Link
        href={href}
        className="hover:bg-accent rounded-xl outline-ring shadow-border"
      >
        <div className="flex justify-center items-center size-24 bg-muted/50 rounded-xl p-3 shadow-sm">
          <PokeSprite poke={poke} className="size-20" priority />
        </div>
      </Link>
      <div className="font-medium text-muted-foreground pt-1 text-sm">
        {fomattedDexNumber}
      </div>
      <Link
        href={href}
        className="font-medium hover:underline outline-ring text-foreground active:underline underline-offset-2 decoration-foreground"
      >
        {name}
      </Link>
      {form && (
        <div className="text-sm text-muted-foreground font-medium truncate pl-1 ">
          {form}
        </div>
      )}
    </div>
  );
}
