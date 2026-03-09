import { PokeSprite } from '@/app/entities/poke/ui';
import { TypeBadge } from '@/app/entities/type/ui';
import { TableCell, TableRow } from '@/app/shared/ui/table';
import Link from 'next/link';
import { NationalPokeView } from '../../model';
import { formatNumber } from '@/app/shared/lib/format';
import { memo } from 'react';
import { columns } from './config';
import { cn } from '@/app/shared/lib/cn';

const PokedexRow = memo(function PokedexRow({
  poke,
}: {
  poke: NationalPokeView;
}) {
  return (
    <TableRow key={poke.pokeKey} className="h-20 hover:bg-muted/70">
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
      {/* <TableCell>
        <div className="h-full flex items-center gap-4">
          <Link href={`/pokedex/${poke.dexNumber}/${poke.pokeKey}`}>
            <PokeSprite poke={poke} className="size-12 md:size-14 " />
          </Link>
          <div>#{formatNumber(poke.dexNumber)}</div>
        </div>
      </TableCell>
      <TableCell className="">
        <div className="flex flex-col justify-center overflow-hidden w-full">
          <Link
            href={`/pokedex/${poke.dexNumber}/${poke.pokeKey}`}
            className="w-full  p-1 pl-0 pb-0"
            aria-label={`${poke.name} 상세 페이지로 이동`}
          >
            <div className="text-foreground  truncate font-medium hover:underline active:underline">
              {poke.name}
            </div>
          </Link>
          <div className="text-muted-foreground text-sm sm:text-sm truncate font-medium">
            {poke.form}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-1 justify-center items-start w-full ">
          {poke.type1 && (
            <TypeBadge type={poke.type1} className="w-17.5 max-w-17.5 h-7.25" />
          )}
          {poke.type2 && (
            <TypeBadge type={poke.type2} className="w-17.5 max-w-17.5 h-7.25" />
          )}
        </div>
      </TableCell>
      <TableCell>{poke.total}</TableCell>
      <TableCell>{poke.hp}</TableCell>
      <TableCell>{poke.attack}</TableCell>
      <TableCell>{poke.defense}</TableCell>
      <TableCell>{poke.specialAttack}</TableCell>
      <TableCell>{poke.specialDefense}</TableCell>
      <TableCell>{poke.speed}</TableCell> */}
    </TableRow>
  );
});

export default PokedexRow;
