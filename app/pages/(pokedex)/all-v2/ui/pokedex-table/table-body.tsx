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
}: {
  pokes: NationalPokeView[];
  ref: RefObject<HTMLDivElement | null>;
  onScroll: () => void;
}) {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [scrollMargin, setScrollMargin] = useState(0);
  // 추가
  useLayoutEffect(() => {
    if (parentRef.current) {
      setScrollMargin(ref.current?.offsetTop ?? 0);
    }
  }, [ref]);

  const scrollToFn: VirtualizerOptions<Window, HTMLDivElement>['scrollToFn'] =
    useCallback((offset, canSmooth, instance) => {
      const run = () => {
        windowScroll(0, canSmooth, instance);
      };

      requestAnimationFrame(run);
    }, []);

  const rowVirtualizer = useWindowVirtualizer({
    count: pokes.length,
    estimateSize: () => 72,
    overscan: 10,
    // getScrollElement: () => parentRef.current,
    scrollMargin: scrollMargin,
    scrollToFn,
  });

  useEffect(() => {
    rowVirtualizer.scrollToIndex(0);
  }, [pokes, rowVirtualizer]);

  const virtualRows = rowVirtualizer.getVirtualItems();

  return (
    <div ref={ref} className=" overflow-auto" onScroll={onScroll}>
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {/* <div
          style={{
            position: 'sticky',
            top: 72,
            left: 0,
            bottom: 0,
            width: 100,
            zIndex: 2,
          }}
        >
          <div
            style={{
              position: 'relative',
              width: 100,
              height: pokes.length,
            }}
          >
            {virtualRows.map((virtualRow) => (
              <div
                key={virtualRow.key}
                style={{
                  position: 'absolute',
                  top: virtualRow.start,
                  left: 0,
                  width: 100,
                  height: virtualRow.size,
                  backgroundColor: 'white',
                  borderBottom: '1px solid gray',
                  borderRight: '1px solid gray',
                  paddingLeft: 10,
                }}
              >
                Sticky Row {virtualRow.index}
              </div>
            ))}
          </div>
        </div> */}
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
              // width: 'max-content',
              // width: '100%',
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
