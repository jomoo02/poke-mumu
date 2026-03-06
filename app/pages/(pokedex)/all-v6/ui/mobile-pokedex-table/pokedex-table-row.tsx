import Link from 'next/link';

import { cn } from '@/app/shared/lib/cn';
import { PokeSprite } from '@/app/entities/poke/ui';

import { columns } from './config';
import { type NationalPokeView } from '../../model';

interface PokedexTableRowProps {
  poke: NationalPokeView;
}

export default function PokedexTableRow({ poke }: PokedexTableRowProps) {
  return (
    <div className="h-full w-full flex  group hover:bg-muted">
      {/* <div className="bg-card w-18 min-w-20 h-full flex justify-center items-center group-hover:bg-muted border-b">
        <Link href={`/pokedex/${poke.dexNumber}/${poke.pokeKey}`}>
          <PokeSprite poke={poke} className="size-12 " />
        </Link>
      </div> */}
      {columns.map(({ id, cell, width, align }) => (
        <div
          key={id}
          className={cn(
            'px-4 flex items-center border-b',
            width,
            align === 'right' ? 'justify-end' : 'justify-start',
          )}
        >
          {cell(poke)}
        </div>
      ))}
    </div>
  );
}
