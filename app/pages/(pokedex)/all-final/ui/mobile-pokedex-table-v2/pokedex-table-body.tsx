import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { RefObject, useLayoutEffect, useRef, useState } from 'react';

import { type NationalPokeView } from '../../model';
import PokedexTableRow from './pokedex-table-row';

export default function PokedexTableBody({
  pokes,
}: {
  pokes: NationalPokeView[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollMargin, setScrollMargin] = useState(0);

  useLayoutEffect(() => {
    if (ref.current) {
      setScrollMargin(ref.current?.offsetTop ?? 0);
    }
  }, [ref]);

  const rowVirtualizer = useWindowVirtualizer({
    count: pokes.length,
    estimateSize: () => 72,
    overscan: 10,
    scrollMargin: scrollMargin,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();

  return (
    <div ref={ref} className="overflow-auto">
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualRows.map((virtualRow) => (
          <div
            className="w-full"
            key={virtualRow.index}
            style={{
              position: 'absolute',
              transform: `translateY(${
                virtualRow.start - rowVirtualizer.options.scrollMargin
              }px)`,
              top: 0,
              left: 0,
              height: `${virtualRow.size}px`,
            }}
          >
            <PokedexTableRow poke={pokes[virtualRow.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}
