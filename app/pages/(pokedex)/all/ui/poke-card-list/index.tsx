import { useLayoutEffect, useRef, useState } from 'react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';

import PokeCard from './poke-card';
import { CARD_HEIGHT, GAP, chunk, useGridCols } from './config';
import { type NationalPokeView } from '../../model';

interface PokeCardListProps {
  pokes: NationalPokeView[];
}

export default function PokeCardList({ pokes }: PokeCardListProps) {
  const cols = useGridCols();

  const rows = chunk(pokes, cols);

  const containerRef = useRef<HTMLDivElement>(null);

  const [scrollMargin, setScrollMargin] = useState(0);

  useLayoutEffect(() => {
    if (containerRef.current) {
      setScrollMargin(containerRef.current?.offsetTop ?? 0);
    }
  }, [containerRef]);

  const virtualizer = useWindowVirtualizer({
    count: rows.length,
    estimateSize: () => CARD_HEIGHT + GAP,
    overscan: 10,
    scrollMargin: scrollMargin,
  });

  const virtualItems = virtualizer.getVirtualItems();
  const totalHeight = virtualizer.getTotalSize();

  return (
    <div ref={containerRef}>
      <div
        suppressHydrationWarning
        style={{ height: totalHeight, position: 'relative' }}
      >
        {virtualItems.map((virtualRow) => {
          const rowPokes = rows[virtualRow.index];
          const offsetTop = virtualRow.start - virtualizer.options.scrollMargin;

          return (
            <div
              key={virtualRow.key}
              style={{
                position: 'absolute',
                top: offsetTop,
                left: 0,
                right: 0,
                height: CARD_HEIGHT,
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {rowPokes.map((poke) => (
                <PokeCard key={poke.pokeKey} poke={poke} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
