import { memo } from 'react';

import { TableCell, TableRow } from '@/app/shared/ui/table';
import { cn } from '@/app/shared/lib/cn';

import { NationalPokeView } from '../../model';
import { columns } from './config';

const PokedexRow = memo(
  function PokedexRow({ poke }: { poke: NationalPokeView }) {
    return (
      <TableRow
        key={poke.pokeKey}
        // style={{
        //   willChange: 'transform',
        //   contain: 'layout paint',
        //   transform: 'translateZ(0)',
        // }}
        className="h-20 hover:bg-muted/70"
      >
        {columns.map((col) => (
          <TableCell
            key={col.id}
            className={cn(
              'border-b px-3 sm:px-4 lg:px-3 xl:px-4 text-sm xl:text-base',
              col.align === 'right' ? 'text-right' : '',
              col.className,
            )}
          >
            {col.cell(poke)}
          </TableCell>
        ))}
      </TableRow>
    );
  },
  (prev, next) => prev.poke.pokeKey === next.poke.pokeKey,
);

export default PokedexRow;
