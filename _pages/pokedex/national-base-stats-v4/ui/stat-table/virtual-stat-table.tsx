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

import StatTableHead from './stat-table-head';
import StatTableRow from './stat-table-row';
import { PENDING_BODY_CLASS, type StatTableProps } from './stat-table-props';
import {
  ROW_HEIGHT,
  ROW_HEIGHT_VARS_CLASS,
  TABLE_GROUP_CLASS,
  TABLE_VARS,
} from './table-layout';
import { useScrollToTableTop } from './use-scroll-to-table-top';
import { useCssRowHeight } from '../../model/use-css-row-height';

const OVERSCAN = 8;

// 서버·첫 렌더에서 그릴 화면 높이 (hydration 전에도 첫 화면 행이 보이게)
const INITIAL_RECT = { width: 0, height: 1000 };

// 기본값은 클라이언트에서 window.scrollY라, 스크롤된 채로 새로고침하면 서버(맨 위)와 다른 행을 그려
// hydration이 어긋난다. 첫 렌더는 서버와 같게 0으로 두고, 마운트 후 실제 위치로 다시 그린다
const INITIAL_OFFSET = 0;

/**
 * 보이는 행만 그리는 테이블 (비교용, ?list=virtual).
 * @container 안에 둔다 (본문 폭으로 레이아웃·행 높이가 바뀐다)
 */
export default function VirtualStatTable({
  pokes,
  sortState,
  shownSortState,
  isPending,
  onSort,
}: StatTableProps) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

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

  useScrollToTableTop(pokes, scopeRef);

  return (
    <div
      ref={scopeRef}
      role="table"
      aria-rowcount={pokes.length + 1}
      aria-busy={isPending}
      data-sort={shownSortState.sort}
      style={TABLE_VARS}
      className={cn(
        TABLE_GROUP_CLASS,
        ROW_HEIGHT_VARS_CLASS,
        // 목록이 바뀌면 이만큼(사이트 헤더 아래)을 두고 테이블 위로 올린다 (useScrollToTableTop)
        'w-full scroll-mt-(--header-height)',
      )}
    >
      <StatTableHead sortState={sortState} onSort={onSort} />
      <div
        ref={bodyRef}
        role="rowgroup"
        className={cn(
          'relative isolate',
          isPending && PENDING_BODY_CLASS,
        )}
        style={{ height: `calc(${pokes.length} * var(--row-h))` }}
      >
        {virtualizer.getVirtualItems().map((item) => (
          <StatTableRow
            key={item.key}
            poke={pokes[item.index]}
            rowIndex={item.index + 2}
            style={{
              // 모든 행 높이가 같아 위치 = 순번 × 행 높이
              transform: `translateY(calc(${item.index} * var(--row-h)))`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
