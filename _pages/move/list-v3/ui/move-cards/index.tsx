'use client';

import { useCallback } from 'react';

import type { Move } from '@/_entities/move';
import { useWindowVirtualList } from '@/_shared/lib/window-virtual-list';

import MoveCard from './move-card';

// 카드 높이: py-5(40) + 번호·이름 두 줄·간격 83 + gap-5(20) + 수치 줄 20
const CARD_HEIGHT = 163;

const estimateSize = () => CARD_HEIGHT;

interface MoveCardsProps {
  moves: Move[];
}

// 검색·필터·정렬을 거친 전체 기술을 페이지 스크롤로 보여주고, 화면 근처 카드만 그린다
export default function MoveCards({ moves }: MoveCardsProps) {
  const getItemKey = useCallback(
    (index: number) => moves[index].identifier,
    [moves],
  );

  const { listRef, virtualizer, scrollMargin } =
    useWindowVirtualList<HTMLUListElement>({
      count: moves.length,
      estimateSize,
      getItemKey,
    });

  return (
    // role=list: Safari VoiceOver는 list-style 없는 ul을 목록으로 안 읽는다
    <ul
      ref={listRef}
      role="list"
      className="relative"
      style={{ height: virtualizer.getTotalSize() }}
    >
      {virtualizer.getVirtualItems().map((item) => (
        <MoveCard
          key={item.key}
          ref={virtualizer.measureElement}
          data-index={item.index}
          // 일부 카드만 그리므로 전체 개수와 순번을 알린다
          aria-setsize={moves.length}
          aria-posinset={item.index + 1}
          move={moves[item.index]}
          isFirst={item.index === 0}
          className="absolute inset-x-0 top-0"
          style={{ transform: `translateY(${item.start - scrollMargin}px)` }}
        />
      ))}
    </ul>
  );
}
