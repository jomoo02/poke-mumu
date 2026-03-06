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
import PokedexTableHeaderV2 from './pokedex-table-header-v2';
import TableV2 from './v2';

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
    <div className="w-full">
      <TableV2
        pokes={pokes}
        totalPokeCount={totalPokeCount}
        bodyRef={bodyRef}
        headerRef={headerRef}
        onClickHeader={onClickHeader}
        sortKey={sortKey}
        direction={direction}
        isScrolledX={isScrolledX}
      />
      {/* <PokedexTableFooter count={pokes.length} total={totalPokeCount} /> */}
      {/* <PokedexTableHeaderV2
        ref={headerRef}
        onClick={onClickHeader}
        sortKey={sortKey}
        direction={direction}
        isScrolledX={isScrolledX}
      /> */}
      {/* <div className={cn('sticky top-16 bg-card z-20 w-full')}>
        <PokedexTableHeader
          ref={headerRef}
          onClick={onClickHeader}
          sortKey={sortKey}
          direction={direction}
          isScrolledX={isScrolledX}
        />
      </div> */}

      {/* <PokedexTableBody
        pokes={pokes}
        ref={bodyRef}
        // onScroll={onScroll}
        isScrolledX={isScrolledX}
      />
      <PokedexTableFooter count={pokes.length} total={totalPokeCount} /> */}
    </div>
  );
}
