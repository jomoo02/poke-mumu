import { RefObject } from 'react';

import { cn } from '@/app/shared/lib/cn';

import PokedexTableBody from './pokedex-table-body';
import PokedexTableHeader from './pokedex-table-header';

import {
  type Direction,
  type NationalPokeView,
  type SortKey,
} from '../../model';

interface PokedexTableProps {
  pokes: NationalPokeView[];
  totalPokeCount: number;

  onClickHeader: (target: string) => void;

  sortKey: SortKey;
  direction: Direction;
}

export default function MobilePokedexTable({
  pokes,

  onClickHeader,

  sortKey,
  direction,
}: PokedexTableProps) {
  return (
    <>
      <div className={cn('sticky top-14 bg-card z-20 w-full')}>
        <PokedexTableHeader
          onClick={onClickHeader}
          sortKey={sortKey}
          direction={direction}
        />
      </div>

      <PokedexTableBody pokes={pokes} />
    </>
  );
}
