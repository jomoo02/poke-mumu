import { useVirtualizer, useWindowVirtualizer } from '@tanstack/react-virtual';
import { RefObject, useLayoutEffect, useState } from 'react';

import { Direction, SortKey, type NationalPokeView } from '../../model';
import PokedexTableRow from './pokedex-table-row';
import PokedexTableHeader from './pokedex-table-header';
import Link from 'next/link';
import { PokeSprite } from '@/app/entities/poke/ui';
import { cn } from '@/app/shared/lib/cn';

export default function PokedexTableBody({
  pokes,
  ref,
  onScroll,
  isScrolledX,
  onClickHeader,
  direction,
  sortKey,
}: {
  pokes: NationalPokeView[];
  ref: RefObject<HTMLDivElement | null>;
  onScroll: () => void;
  isScrolledX: boolean;
  onClickHeader: (target: string) => void;
  direction: Direction;
  sortKey: SortKey;
}) {
  const [scrollMargin, setScrollMargin] = useState(0);

  useLayoutEffect(() => {
    if (ref.current) {
      setScrollMargin(ref.current?.offsetTop ?? 0);
    }
  }, [ref]);

  const rowVirtualizer = useVirtualizer({
    count: pokes.length,
    estimateSize: () => 72,
    overscan: 10,
    getScrollElement: () => ref.current,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();

  return (
    <div
      ref={ref}
      className="overflow-auto h-full  relative "
      onScroll={onScroll}
    >
      <div
        className="w-300 xl:w-full"
        style={{
          height: `${rowVirtualizer.getTotalSize() + 48}px`,
          // width: '1200px',
          position: 'relative',
        }}
      >
        <div className="bg-card sticky top-0 left-0 z-40 w-full flex">
          <div
            className={cn(
              'w-20 min-w-20  left-0 bg-card border-b  top-0 z-20 h-12 sticky',
              isScrolledX ? 'shadow-sm' : '',
            )}
          />
          <div className="left-20 top-0 absolute">
            <PokedexTableHeader
              onClick={onClickHeader}
              sortKey={sortKey}
              direction={direction}
            />
          </div>
        </div>
        <div
          style={{
            position: 'sticky',
            top: 48,
            left: 0,
            bottom: 0,
            width: 80,
            zIndex: 2,
          }}
        >
          <div
            style={{
              position: 'relative',
              width: 80,
              height: `${rowVirtualizer.getTotalSize()}px`,
            }}
          >
            {virtualRows.map((virtualRow) => (
              <div
                key={virtualRow.key}
                style={{
                  position: 'absolute',
                  top: virtualRow.start,
                  left: 0,
                  width: 80,
                  height: `${virtualRow.size}px`,
                }}
              >
                <div className="bg-card w-20 min-w-20 h-full flex justify-center items-center group-hover:bg-muted border-b">
                  <Link
                    href={`/pokedex/${pokes[virtualRow.index].dexNumber}/${pokes[virtualRow.index].pokeKey}`}
                  >
                    <PokeSprite
                      poke={pokes[virtualRow.index]}
                      className="size-12 md:size-14 "
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {virtualRows.map((virtualRow) => (
          <div
            key={virtualRow.index}
            // className="w-full"
            style={{
              position: 'absolute',
              transform: `translateY(${virtualRow.start}px)`,
              top: 48,
              left: 80,

              height: `${virtualRow.size}px`,
            }}
          >
            <PokedexTableRow
              poke={pokes[virtualRow.index]}
              isScrolledX={isScrolledX}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
