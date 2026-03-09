import { cn } from '@/app/shared/lib/cn';

import {
  type Direction,
  type NationalPokeView,
  type SortKey,
} from '../../model';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/shared/ui/table';
import Link from 'next/link';
import { PokeSprite } from '@/app/entities/poke/ui';
import { formatNumber } from '@/app/shared/lib/format';
import { TypeBadge } from '@/app/entities/type/ui';
import { ArrowDownUpIcon, ArrowUpIcon } from 'lucide-react';
import { Button } from '@/app/shared/ui/button';
import PokedexRow from './pokedex-row';
import { columns } from './config';

interface PokedexProps {
  pokes: NationalPokeView[];
  sortKey: SortKey;
  direction: Direction;
  onClickHeader: (target: string) => void;
}

export default function PokedexNoVirtual({
  pokes,
  sortKey,
  direction,
  onClickHeader,
}: PokedexProps) {
  return (
    <div className="w-full relative">
      <table className="relative w-full border-separate border-spacing-0">
        <TableHeader>
          <TableRow className="">
            {columns.map((head) => (
              <TableHead
                key={head.id}
                className={cn(
                  ' sticky top-14 z-2 bg-card border-b text-sm py-1',
                  head.align === 'right' ? 'text-right' : '',
                  head.sortable === false
                    ? 'px-3 sm:px-4 lg:px-3 xl:px-4'
                    : 'px-1.5 sm:px-2 lg:px-1.5 xl:px-2',
                  head.className,
                  head.id === 'name' ? '' : '',
                )}
              >
                {!(head.sortable === false) ? (
                  <Button
                    variant={'ghost'}
                    size={'lg'}
                    onClick={() => onClickHeader(head.id)}
                    className={cn(
                      sortKey === head.id ? 'bg-muted' : '',
                      'gap-1',
                    )}
                  >
                    {head.label}
                    {sortKey === head.id ? (
                      <ArrowUpIcon
                        className={cn(
                          'size-3.25  transition-transform transform duration-400',

                          direction === 'desc' ? 'rotate-180' : '',
                        )}
                      />
                    ) : (
                      <ArrowDownUpIcon className="size-3.25" />
                    )}
                  </Button>
                ) : (
                  <>{head.label}</>
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {pokes.map((poke) => (
            <PokedexRow key={poke.pokeKey} poke={poke} />
          ))}
        </TableBody>
      </table>
    </div>
  );
}
