import Link from 'next/link';

import { PokeSprite } from '@/app/entities/poke/ui';
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
    <div className="flex flex-col h-full  bg-background">
      <Link
        href={href}
        className="hover:bg-accent rounded-xl border border-border shadow-sm outline-ring shadow-border"
      >
        <div className="p-4">
          <PokeSprite poke={poke} className="size-18 " priority />
        </div>
      </Link>
      <div className="font-medium text-muted-foreground pt-2 pl-1">
        {fomattedDexNumber}
      </div>
      <Link
        href={href}
        className="font-medium hover:underline outline-ring text-foreground active:underline underline-offset-2 decoration-foreground pl-1"
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
