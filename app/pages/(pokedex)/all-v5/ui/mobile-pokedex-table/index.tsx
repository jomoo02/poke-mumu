import { RefObject } from 'react';

import { cn } from '@/app/shared/lib/cn';

import PokedexTableBody from './pokedex-table-body';
import PokedexTableHeader from './pokedex-table-header';
import PokedexTableFooter from './pokedex-table-footer';
import {
  type Direction,
  type NationalPokeView,
  type SortKey,
} from '../../model';

interface PokedexTableProps {
  pokes: NationalPokeView[];
  totalPokeCount: number;
  bodyRef: RefObject<HTMLDivElement | null>;
  onClickHeader: (target: string) => void;
  onScroll: () => void;
  sortKey: SortKey;
  direction: Direction;
}

export default function MobilePokedexTable({
  pokes,
  bodyRef,
  onClickHeader,
  onScroll,
  sortKey,
  direction,
  totalPokeCount,
}: PokedexTableProps) {
  return (
    <>
      <div className={cn('sticky top-16 bg-card z-20 w-full')}>
        <PokedexTableHeader
          onClick={onClickHeader}
          sortKey={sortKey}
          direction={direction}
        />
      </div>

      <PokedexTableBody pokes={pokes} ref={bodyRef} onScroll={onScroll} />
      <PokedexTableFooter count={pokes.length} total={totalPokeCount} />
    </>
  );
}
