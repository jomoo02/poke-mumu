'use client';

import {
  useCallback,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';

import { cn } from '@/_shared/lib/cn';
import type { BaseStatsPoke } from '@/_pages/pokedex/national-base-stats/model/base-stats-poke';
import type {
  PokeSort,
  SortKey,
} from '@/_pages/pokedex/national-base-stats/model/poke-sort';

import styles from './head-sync.module.css';
import PokeTableHead from './poke-table-head';
import PokeTableRow from './poke-table-row';
import { ROW_HEIGHT, ROW_HEIGHT_VARS_CLASS, TABLE_VARS } from './table-layout';
import { useHeadXSync } from '../../model/use-head-x-sync';
import { useCssRowHeight } from '../../model/use-css-row-height';

const OVERSCAN = 8;

// 서버·첫 렌더에서 그릴 화면 높이 (hydration 전에도 첫 화면 행이 보이게)
const INITIAL_RECT = { width: 0, height: 1000 };

// 기본값은 클라이언트에서 window.scrollY라, 스크롤된 채로 새로고침하면 서버(맨 위)와 다른 행을 그려
// hydration이 어긋난다. 첫 렌더는 서버와 같게 0으로 두고, 마운트 후 실제 위치로 다시 그린다
const INITIAL_OFFSET = 0;

interface VirtualPokeTableProps {
  pokes: BaseStatsPoke[];
  sortState: PokeSort;
  onSort: (sortKey: SortKey) => void;
}

// @container 안에 둔다 (본문 폭으로 레이아웃·행 높이가 바뀐다)
export default function VirtualPokeTable({
  pokes,
  sortState,
  onSort,
}: VirtualPokeTableProps) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const headRowRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useHeadXSync({ scopeRef, scrollerRef, trackRef });

  // 바디의 문서 기준 위치. 위쪽(툴바 등) 높이나 폭이 바뀌면 다시 잰다
  const [scrollMargin, setScrollMargin] = useState(0);

  useLayoutEffect(() => {
    const body = bodyRef.current;
    if (!body) {
      return;
    }

    const update = () =>
      setScrollMargin(body.getBoundingClientRect().top + window.scrollY);

    update();
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(document.body);

    return () => resizeObserver.disconnect();
  }, []);

  const getItemKey = useCallback(
    (index: number) => pokes[index].pokeKey,
    [pokes],
  );

  // 행 높이는 본문 폭에 따라 CSS(--row-h)가 정하고, 가상화 간격은 그 값을 읽어 맞춘다
  const rowHeight = useCssRowHeight(scopeRef, ROW_HEIGHT.narrow);

  const estimateSize = useCallback(() => rowHeight, [rowHeight]);

  const virtualizer = useWindowVirtualizer({
    count: pokes.length,
    estimateSize,
    overscan: OVERSCAN,
    scrollMargin,
    getItemKey,
    initialRect: INITIAL_RECT,
    initialOffset: INITIAL_OFFSET,
  });

  // 위치 계산은 캐시되므로 높이가 바뀌면 measure()로 비운다.
  // measure()는 보이는 행 범위가 같으면 다시 그리지 않아, 새 위치로 한 번 더 그린다 (페인트 전)
  const [, rerender] = useReducer((count: number) => count + 1, 0);
  const prevRowHeightRef = useRef(rowHeight);

  useLayoutEffect(() => {
    if (prevRowHeightRef.current === rowHeight) {
      return;
    }
    prevRowHeightRef.current = rowHeight;

    virtualizer.measure();
    rerender();
  }, [virtualizer, rowHeight]);

  // 검색·필터·정렬로 목록이 바뀌면 테이블 위(사이트 헤더 아래)로.
  // 이미 그보다 위에 있으면(툴바를 보고 있으면) 그대로 둔다
  const prevPokesRef = useRef(pokes);

  useLayoutEffect(() => {
    if (prevPokesRef.current === pokes) {
      return;
    }
    prevPokesRef.current = pokes;

    const scope = scopeRef.current;
    const headRow = headRowRef.current;
    if (!scope || !headRow) {
      return;
    }

    // sticky top의 계산값 = --header-height(px)
    const headerHeight = parseFloat(getComputedStyle(headRow).top) || 0;
    const tableTop =
      scope.getBoundingClientRect().top + window.scrollY - headerHeight;

    if (window.scrollY > tableTop) {
      window.scrollTo({ top: tableTop });
    }
  }, [pokes]);

  return (
    <div
      ref={scopeRef}
      role="table"
      aria-rowcount={pokes.length + 1}
      style={TABLE_VARS}
      className={cn(styles.scope, ROW_HEIGHT_VARS_CLASS, 'w-full')}
    >
      <PokeTableHead
        ref={headRowRef}
        trackRef={trackRef}
        sortState={sortState}
        onSort={onSort}
      />
      <div
        ref={scrollerRef}
        className={cn(
          styles.scroller,
          'isolate overflow-x-auto overscroll-x-contain',
        )}
      >
        <div
          ref={bodyRef}
          role="rowgroup"
          className="relative min-w-[calc(var(--lead-w)+var(--rest-min))] @5xl:min-w-0"
          style={{ height: `calc(${pokes.length} * var(--row-h))` }}
        >
          {virtualizer.getVirtualItems().map((item) => (
            <PokeTableRow
              key={item.key}
              poke={pokes[item.index]}
              rowIndex={item.index + 2}
              isLast={item.index === pokes.length - 1}
              style={{
                // 모든 행 높이가 같아 위치 = 순번 × 행 높이
                transform: `translateY(calc(${item.index} * var(--row-h)))`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
