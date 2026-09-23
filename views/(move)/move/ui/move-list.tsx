'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';

import type { Move } from '@/entities/move/model';
import MoveItem from './move-item';
import { useRouter } from 'next/navigation';
import { useMoveList } from '../model/move-list/useMoveList';

const HEIGHT = 246;

const MIN_COLUMN_WIDTH = 280;

const GAP = 24;
const ROW_STRIDE = HEIGHT + GAP;

const computeColumnCount = (width: number) => {
  return Math.max(1, Math.floor((width + GAP) / (MIN_COLUMN_WIDTH + GAP)));
};

interface MoveListProps {
  moves: Move[];
}

export default function MoveList({ moves }: MoveListProps) {
  const { bfcacheId } = useRouter();

  const filteredMoves = useMoveList(moves);

  return <VirtualMoveList key={bfcacheId} moves={filteredMoves} />;
}

function VirtualMoveList({ moves }: MoveListProps) {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [columnCount, setColumnCount] = useState(1);

  const listOffsetRef = useRef(0);
  useLayoutEffect(() => {
    listOffsetRef.current = listRef.current?.offsetTop ?? 0;
  }, []);
  useLayoutEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const calc = () => {
      // setScrollMargin(el.getBoundingClientRect().top + window.scrollY);
      setColumnCount(computeColumnCount(el.clientWidth));
    };

    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const rowCount = Math.ceil(moves.length / columnCount);

  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => ROW_STRIDE,
    overscan: 5,
    scrollMargin: listOffsetRef.current,
    // 가상화가 mount 시 initialOffset(=이전 페이지의 잔여 window.scrollY)으로
    // window를 스스로 되돌리는 것을 막는다. 이 self-scroll이 Next의 스크롤
    // 처리(push=top 리셋 / pop=복원)를 덮어써서, 다른 페이지에서 스크롤을 내린 뒤
    // 이 페이지로 이동하면 그 위치로 착지하는 버그를 유발한다.
    // 이 목록은 프로그래매틱 스크롤(scrollToIndex 등)을 쓰지 않으므로 no-op으로 안전.
    scrollToFn: () => {},
    // initialOffset: () => 0,
  });

  const totalHeight = virtualizer.getTotalSize() - GAP;

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
        const rowItems = moves.slice(start, start + columnCount);

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
              className="grid gap-6"
              style={{
                gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
              }}
            >
              {rowItems.map((move) => (
                <MoveItem key={move.identifier} move={move} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
