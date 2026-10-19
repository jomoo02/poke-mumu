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

import StatTableHead from './stat-table-head';
import StatTableRow from './stat-table-row';
import { ROW_HEIGHT, ROW_HEIGHT_VARS_CLASS, TABLE_VARS } from './table-layout';
import { useCssRowHeight } from '../../model/use-css-row-height';
import { showsColumnHead, type SortUi } from '../../model/use-sort-ui';

const OVERSCAN = 8;

// 서버·첫 렌더에서 그릴 화면 높이 (hydration 전에도 첫 화면 행이 보이게)
const INITIAL_RECT = { width: 0, height: 1000 };

// 기본값은 클라이언트에서 window.scrollY라, 스크롤된 채로 새로고침하면 서버(맨 위)와 다른 행을 그려
// hydration이 어긋난다. 첫 렌더는 서버와 같게 0으로 두고, 마운트 후 실제 위치로 다시 그린다
const INITIAL_OFFSET = 0;

interface VirtualStatTableProps {
  pokes: BaseStatsPoke[];
  // 좁은 화면 정렬 UI (비교용)
  sortUi: SortUi;
  // 능력치(종족값 포함)로 정렬 중인지. 7칸 머리글 UI는 이때만 머리글을 보여 준다
  isStatSort: boolean;
  sortState: PokeSort;
  onSort: (sortKey: SortKey) => void;
}

// @container 안에 둔다 (본문 폭으로 레이아웃·행 높이가 바뀐다).
// 가로 스크롤이 없어 헤더는 window 기준 sticky 하나로 충분하다
export default function VirtualStatTable({
  pokes,
  sortUi,
  isStatSort,
  sortState,
  onSort,
}: VirtualStatTableProps) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
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
  // 7칸 머리글이 보이면 행 숫자에 라벨이 없고, 아니면(칩 바, 능력치순이 아닐 때) 숫자 위에 라벨이 붙는다
  // 항상 머리글(always)은 늘, 한 글자·세그먼트는 능력치순일 때만
  const showHead = showsColumnHead(sortUi, isStatSort);
  const rowHeight = useCssRowHeight(
    scopeRef,
    showHead ? ROW_HEIGHT.narrow : ROW_HEIGHT.narrowWithLabel,
  );

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
    const head = headRef.current;
    if (!scope || !head) {
      return;
    }

    // sticky top의 계산값 = --header-height(px)
    const headerHeight = parseFloat(getComputedStyle(head).top) || 0;
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
      className={cn(
        ROW_HEIGHT_VARS_CLASS[showHead ? 'plain' : 'labeled'],
        'w-full',
      )}
    >
      <StatTableHead
        ref={headRef}
        sortUi={sortUi}
        showColumnHead={showHead}
        sortState={sortState}
        onSort={onSort}
      />
      <div
        ref={bodyRef}
        role="rowgroup"
        className="relative isolate"
        style={{ height: `calc(${pokes.length} * var(--row-h))` }}
      >
        {virtualizer.getVirtualItems().map((item) => (
          <StatTableRow
            key={item.key}
            poke={pokes[item.index]}
            sortUi={sortUi}
            showStatLabel={!showHead}
            sortKey={sortState.sort}
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
  );
}
