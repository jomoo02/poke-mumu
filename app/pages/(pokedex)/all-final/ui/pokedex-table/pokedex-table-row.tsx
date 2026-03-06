import Link from 'next/link';

import { cn } from '@/app/shared/lib/cn';
import { PokeSprite } from '@/app/entities/poke/ui';

import { columns } from './config';
import { type NationalPokeView } from '../../model';

interface PokedexTableRowProps {
  poke: NationalPokeView;
  isXScrolled: boolean;
}

export default function PokedexTableRow({
  poke,
  isXScrolled,
}: PokedexTableRowProps) {
  return (
    <div className="h-full w-full flex group hover:bg-muted min-w-330">
      <div
        className={cn(
          'sticky left-0 border-b h-full',
          isXScrolled && 'shadow-sm',
        )}
      >
        <div className="bg-card w-26 shrink-0 min-w-26 h-full flex justify-center items-center group-hover:bg-muted">
          <Link href={`/pokedex/${poke.dexNumber}/${poke.pokeKey}`}>
            <PokeSprite poke={poke} className="size-14 " />
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
            id === 'total' ? 'font-medium' : '',
            align === 'right' ? 'justify-end' : 'justify-start',
          )}
        >
          {cell(poke)}
        </div>
      ))}
    </div>
  );
}
