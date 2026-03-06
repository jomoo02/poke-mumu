import Link from 'next/link';

import { cn } from '@/app/shared/lib/cn';
import { PokeSprite } from '@/app/entities/poke/ui';

import { columns } from './config';
import { type NationalPokeView } from '../../model';

interface PokedexTableRowProps {
  poke: NationalPokeView;
  isScrolledX: boolean;
}

export default function PokedexTableRow({
  poke,
  isScrolledX,
}: PokedexTableRowProps) {
  return (
    <div className="h-full w-full flex  group hover:bg-muted min-w-300 2xl:min-w-350 ">
      <div
        className={cn(
          'sticky left-0 border-b h-full',
          isScrolledX && 'shadow-sm',
        )}
      >
        <div className="bg-card w-20 min-w-20 md:w-26 shrink-0  md:min-w-26 h-full flex justify-center items-center group-hover:bg-muted">
          <Link href={`/pokedex/${poke.dexNumber}/${poke.pokeKey}`}>
            <PokeSprite poke={poke} className="size-12 md:size-14 " />
          </Link>
        </div>
      </div>
      {columns.map(({ id, cell, width, align }) => (
        <div
          key={id}
          className={cn(
            'px-4 flex items-center border-b ',
            width,
            id === 'name' ? '' : 'shrink-0',
            align === 'right' ? 'justify-end' : 'justify-start',
          )}
        >
          {cell(poke)}
        </div>
      ))}
    </div>
  );
}
