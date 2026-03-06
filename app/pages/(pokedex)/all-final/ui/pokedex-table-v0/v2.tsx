import { RefObject } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Direction, NationalPokeView, SortKey } from '../../model';
import PokedexTableRow from './pokedex-table-row';
import PokedexTableHeader from './pokedex-table-header';
import PokedexTableHeaderV2 from './pokedex-table-header-v2';
import Link from 'next/link';
import { PokeSprite } from '@/app/entities/poke/ui';

interface PokedexTableProps {
  pokes: NationalPokeView[];
  totalPokeCount: number;
  bodyRef: RefObject<HTMLDivElement | null>;
  headerRef: RefObject<HTMLDivElement | null>;
  onClickHeader: (target: string) => void;
  // onScroll: () => void;
  sortKey: SortKey;
  direction: Direction;
  isScrolledX: boolean;
}

export default function TableV2({
  pokes,
  totalPokeCount,
  bodyRef,
  headerRef,
  onClickHeader,
  // onScroll,
  sortKey,
  direction,
}: PokedexTableProps) {
  const rowVirtualizer = useVirtualizer({
    count: pokes.length,
    estimateSize: () => 72,
    overscan: 10,
    getScrollElement: () => bodyRef.current,
  });

  return (
    <div
      ref={bodyRef}
      className="relative w-full"
      style={{
        height: 'calc(100dvh - 245px)',
        // width: '려ㅣ',
        overflow: 'auto',
      }}
    >
      <PokedexTableHeader
        ref={headerRef}
        onClick={onClickHeader}
        direction={direction}
        sortKey={sortKey}
        isScrolledX
      />

      <div
        className="w-full"
        style={{
          height: rowVirtualizer.getTotalSize(),
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.key}
            style={{
              position: 'absolute',
              transform: `translateY(${virtualRow.start}px)`,
              width: '100%',
              top: 0,
              left: 0,
              height: `${virtualRow.size}px`,
            }}
          >
            <PokedexTableRow
              poke={pokes[virtualRow.index]}
              isScrolledX={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
