import {
  useWindowVirtualizer,
  VirtualizerOptions,
  windowScroll,
} from '@tanstack/react-virtual';
import { NationalPokeView } from '../../model';

import {
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import Poke from './poke';

export default function TableBody({
  pokes,
  ref,
  onScroll,
  filters,
}: {
  pokes: NationalPokeView[];
  ref: RefObject<HTMLDivElement | null>;
  onScroll: () => void;
  filters: string;
}) {
  const [scrollMargin, setScrollMargin] = useState(0);
  // 추가
  useLayoutEffect(() => {
    if (ref.current) {
      setScrollMargin(ref.current?.offsetTop ?? 0);
    }
  }, [ref]);

  // const scrollToFn: VirtualizerOptions<Window, HTMLDivElement>['scrollToFn'] =
  //   useCallback((offset, canSmooth, instance) => {
  //     const run = () => {
  //       windowScroll(0, canSmooth, instance);
  //     };

  //     requestAnimationFrame(run);
  //   }, []);

  const rowVirtualizer = useWindowVirtualizer({
    count: pokes.length,
    estimateSize: () => 72,
    overscan: 10,
    scrollMargin: scrollMargin,

    // scrollToFn,
  });

  const prevFiltersRef = useRef(filters);

  useEffect(() => {
    const prev = prevFiltersRef.current;

    const isChanged = prev !== filters;
    // const isChanged = prev.type !== filters.type || prev.name !== filters.name;

    if (isChanged) {
      window.scrollTo({ top: 0 });
    }

    prevFiltersRef.current = filters;
  }, [filters]);

  const virtualRows = rowVirtualizer.getVirtualItems();

  return (
    <div ref={ref} className="overflow-auto" onScroll={onScroll}>
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualRows.map((virtualRow) => (
          <div
            className="w-max xl:w-full"
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
            <Poke poke={pokes[virtualRow.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}
