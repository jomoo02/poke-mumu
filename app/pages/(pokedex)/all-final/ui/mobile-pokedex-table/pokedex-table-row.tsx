import { cn } from '@/app/shared/lib/cn';

import { columns } from './config';
import { type NationalPokeView } from '../../model';

interface PokedexTableRowProps {
  poke: NationalPokeView;
}

export default function PokedexTableRow({ poke }: PokedexTableRowProps) {
  return (
    <div className="h-full w-full flex  group hover:bg-muted">
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
