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
import PokedexTableRow from './pokedex-table-row';

interface PokedexTableProps {
  pokes: NationalPokeView[];
  totalPokeCount: number;
  bodyRef: RefObject<HTMLDivElement | null>;
  headerRef: RefObject<HTMLDivElement | null>;
  onClickHeader: (target: string) => void;
  onScroll: () => void;
  sortKey: SortKey;
  direction: Direction;
  isScrolledX: boolean;
}

export default function PokedexTable({
  pokes,
  bodyRef,
  headerRef,
  onClickHeader,
  onScroll,
  sortKey,
  direction,
  isScrolledX,
  totalPokeCount,
}: PokedexTableProps) {
  return (
    <>
      <div className={cn('sticky top-14 bg-card z-20 w-full')}>
        <PokedexTableHeader
          ref={headerRef}
          onClick={onClickHeader}
          sortKey={sortKey}
          direction={direction}
          isScrolledX={isScrolledX}
        />
      </div>
      <div>
        {pokes.map((poke) => (
          <PokedexTableRow
            key={poke.pokeKey}
            poke={poke}
            isScrolledX={isScrolledX}
          />
        ))}
      </div>
      {/* <PokedexTableBody
        pokes={pokes}
        ref={bodyRef}
        onScroll={onScroll}
        isScrolledX={isScrolledX}
      /> */}
      <PokedexTableFooter count={pokes.length} total={totalPokeCount} />
    </>
  );
}
