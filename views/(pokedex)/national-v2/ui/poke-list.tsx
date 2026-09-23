'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';

import {
  PokeLinkHorizontal,
  PokeLinkVertical,
} from '@/features/poke-link-v2/ui';

import type { NationalPoke } from '../model/national-poke';

const MIN_COLUMN_WIDTH = 128; // minmax(128px, 1fr)

// 모바일: 1열 가로형 (폭 무관 고정 높이)
const MOBILE_ROW_HEIGHT = 64;

// 데스크탑: N열 세로형 (스프라이트 aspect-square → 높이 = 컬럼폭 + 하단 고정영역)
const DESKTOP_BELOW_SPRITE = 82;

// 브레이크포인트별 gap (gap-4 / sm:gap-6 / md:gap-12)
const GAP_MOBILE = 16;
const GAP_SM = 24;
const GAP_MD = 48;

type Layout = {
  isDesktop: boolean;
  columnCount: number;
  rowHeight: number;
  gap: number;
};

function computeLayout(width: number): Layout {
  // 모바일: < 640px → 1열 가로형
  if (!window.matchMedia('(min-width: 640px)').matches) {
    return {
      isDesktop: false,
      columnCount: 1,
      rowHeight: MOBILE_ROW_HEIGHT,
      gap: GAP_MOBILE,
    };
  }

  // 데스크탑 gap: 768px 경계로 sm/md 분기
  const gap = window.matchMedia('(min-width: 768px)').matches ? GAP_MD : GAP_SM;

  const columnCount = Math.max(
    1,
    Math.floor((width + gap) / (MIN_COLUMN_WIDTH + gap)),
  );
  const columnWidth = (width - gap * (columnCount - 1)) / columnCount;
  const rowHeight = columnWidth + DESKTOP_BELOW_SPRITE;

  return { isDesktop: true, columnCount, rowHeight, gap };
}

interface PokeListProps {
  pokes: NationalPoke[];
}

export default function PokeList({ pokes }: PokeListProps) {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [layout, setLayout] = useState<Layout>({
    isDesktop: false,
    columnCount: 1,
    rowHeight: MOBILE_ROW_HEIGHT,
    gap: GAP_MOBILE,
  });
  const [scrollMargin, setScrollMargin] = useState(0);

  useLayoutEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const calc = () => {
      setScrollMargin(el.getBoundingClientRect().top + window.scrollY);
      setLayout(computeLayout(el.clientWidth));
    };

    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { isDesktop, columnCount, rowHeight, gap } = layout;

  const rowCount = Math.ceil(pokes.length / columnCount);
  const stride = rowHeight + gap;

  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => stride,
    overscan: 5,
    scrollMargin,
    // 가상화가 mount 시 이전 페이지의 잔여 window.scrollY로 창을 스스로 되돌리는 것을 막는다.
    // (스크롤은 라우터가 관리 — push=top / pop=복원). 프로그래매틱 스크롤 미사용이라 안전.
    scrollToFn: () => {},
  });

  const totalHeight = virtualizer.getTotalSize() - gap; // 마지막 행 gap 제거

  return (
    <div
      ref={listRef}
      style={{
        height: `${totalHeight}px`,
        width: '100%',
        position: 'relative',
      }}
    >
      {virtualizer.getVirtualItems().map((virtualRow) => {
        const start = virtualRow.index * columnCount;
        const rowItems = pokes.slice(start, start + columnCount);

        return (
          <div
            key={virtualRow.key}
            data-index={virtualRow.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${
                virtualRow.start - virtualizer.options.scrollMargin
              }px)`,
            }}
          >
            <div
              className="grid"
              style={{
                columnGap: `${gap}px`,
                height: isDesktop ? undefined : `${MOBILE_ROW_HEIGHT}px`,
                gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
              }}
            >
              {rowItems.map((poke) =>
                isDesktop ? (
                  <PokeLinkVertical
                    key={poke.pokeKey}
                    poke={poke}
                    formatLength={3}
                    showForm={true}
                    className="min-w-0"
                  />
                ) : (
                  <PokeLinkHorizontal
                    key={poke.pokeKey}
                    poke={poke}
                    formatLength={3}
                    showForm={true}
                    className="h-full min-w-0"
                  />
                ),
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
