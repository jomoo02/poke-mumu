'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';

import { type NationalPokeView } from '../model';
import PokeCard from './poke-card';

// ── 상수 ─────────────────────────────────────────────────────────────────────

const CARD_HEIGHT = 439;
const GAP = 24; // gap-6 = 1.5rem = 24px

const BREAKPOINTS = [
  { query: '(min-width: 1280px)', cols: 4 },
  { query: '(min-width: 1024px)', cols: 3 },
  { query: '(min-width: 640px)', cols: 2 },
] as const;

// tailwind 브레이크포인트 (sm: 640, lg: 1024, xl: 1280)
function getColCount(): number {
  for (const { query, cols } of BREAKPOINTS) {
    if (window.matchMedia(query).matches) return cols;
  }
  return 1;
}

function chunk<T>(arr: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    rows.push(arr.slice(i, i + size));
  }
  return rows;
}

// ── Hook: 브레이크포인트별 열 수 ─────────────────────────────────────────────

function useGridCols() {
  const [cols, setCols] = useState<number>(1);

  useLayoutEffect(() => {
    // 초기값 설정
    setCols(getColCount());

    const mqls = BREAKPOINTS.map(({ query }) => {
      const mql = window.matchMedia(query);
      const onChange = () => setCols(getColCount());
      mql.addEventListener('change', onChange);
      return { mql, onChange };
    });

    return () => {
      mqls.forEach(({ mql, onChange }) => {
        mql.removeEventListener('change', onChange);
      });
    };
  }, []);

  return cols;
}

// ── Props ─────────────────────────────────────────────────────────────────────

interface PokeCardGridProps {
  pokes: NationalPokeView[];
}

// ── 컴포넌트 ─────────────────────────────────────────────────────────────────

export default function PokeCardGrid({ pokes }: PokeCardGridProps) {
  const cols = useGridCols();
  const rows = chunk(pokes, cols);

  // 컨테이너 ref — virtualizer offset 계산용
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

  // 열 수 변경 시 스크롤 위치 초기화
  // const prevCols = useRef(cols);
  // useEffect(() => {
  //   if (prevCols.current !== cols) {
  //     window.scrollTo({ top: 0 });
  //     prevCols.current = cols;
  //   }
  // }, [cols]);

  const virtualItems = virtualizer.getVirtualItems();
  const totalHeight = virtualizer.getTotalSize();

  return (
    <div ref={containerRef} className="px-4 sm:px-6 xl:px-14">
      {/* 전체 높이 확보 */}
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
