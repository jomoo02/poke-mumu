import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import {
  type Direction,
  type NationalPokeView,
  type SortKey,
} from '../../model';
import useXScroll from '../../model/useXScroll';

interface PokedexTableProps {
  pokes: NationalPokeView[];
  onClickHeader: (target: string) => void;
  sortKey: SortKey;
  direction: Direction;
}

import PokedexTableHeader from './pokedex-table-header';
import PokedexTableRow from './pokedex-table-row';

const LAYOUT_OFFSET = 245;

export default function PokedexTable({
  pokes,

  onClickHeader,

  sortKey,
  direction,
}: PokedexTableProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const isXScrolled = useXScroll(bodyRef);

  // eslint-disable-next-line react-hooks/incompatible-library
  const rowVirtualizer = useVirtualizer({
    count: pokes.length,
    estimateSize: () => 72,
    overscan: 10,
    getScrollElement: () => bodyRef.current,
  });

  return (
    <div className="w-full border-b">
      <div
        ref={bodyRef}
        className=" w-full relative overflow-auto "
        style={{
          height: `calc(100dvh - ${LAYOUT_OFFSET}px)`,
        }}
      >
        <PokedexTableHeader
          onClick={onClickHeader}
          direction={direction}
          sortKey={sortKey}
          isXScrolled={isXScrolled}
        />

        <div
          className="w-full relative "
          style={{
            height: rowVirtualizer.getTotalSize(),
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <div
              key={virtualRow.key}
              className="absolute w-full top-0 left-0"
              style={{
                transform: `translateY(${virtualRow.start}px)`,
                height: `${virtualRow.size}px`,
              }}
            >
              <PokedexTableRow
                poke={pokes[virtualRow.index]}
                isXScrolled={isXScrolled}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
