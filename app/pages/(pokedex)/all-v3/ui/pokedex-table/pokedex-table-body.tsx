import { useWindowVirtualizer, useVirtualizer } from '@tanstack/react-virtual';
import { RefObject, useLayoutEffect, useRef, useState } from 'react';

import { type NationalPokeView } from '../../model';
import PokedexTableRow from './pokedex-table-row';

export default function PokedexTableBody({
  pokes,
  ref,
  onScroll,
  isScrolledX,
}: {
  pokes: NationalPokeView[];
  ref: RefObject<HTMLDivElement | null>;
  onScroll: () => void;
  isScrolledX: boolean;
}) {
  const [scrollMargin, setScrollMargin] = useState(0);

  useLayoutEffect(() => {
    if (ref.current) {
      setScrollMargin(ref.current.offsetTop);
      // setScrollMargin(ref.current?.offsetTop ?? 0);
    }
  }, [ref]);

  const rowVirtualizer = useVirtualizer({
    count: pokes.length,
    estimateSize: () => 72,
    overscan: 10,
    scrollMargin: scrollMargin,
    getScrollElement: () => ref.current,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const innerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={innerRef} className=" relative w-full" onScroll={onScroll}>
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
              top: virtualRow.start,
              left: 0,
              width: '100%',
              height: virtualRow.size,
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
