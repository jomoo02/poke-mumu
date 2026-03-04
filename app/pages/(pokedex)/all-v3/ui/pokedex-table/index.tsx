import { RefObject } from 'react';

import { cn } from '@/app/shared/lib/cn';

import PokedexTableBody from './pokedex-table-body';
import PokedexTableHeader from './pokedex-table-header';
import PokedexTableFooter from './pokedex-table-footer';
import {
  type Direction,
  type NationalPokeView,
  type SortKey,
} from '../../model';

interface PokedexTableProps {
  pokes: NationalPokeView[];
  totalPokeCount: number;
  bodyRef: RefObject<HTMLDivElement | null>;
  headerRef: RefObject<HTMLDivElement | null>;
  onClickHeader: (target: string) => void;
  onScroll: () => void;
  sortKey: SortKey;
  direction: Direction;
  isScrolledX: boolean;
}

export default function PokedexTable({
  pokes,
  bodyRef,
  headerRef,
  onClickHeader,
  onScroll,
  sortKey,
  direction,
  isScrolledX,
  totalPokeCount,
}: PokedexTableProps) {
  return (
    <div
      className="relative"
      style={
        {
          /* wrapper 필요 시 유지 */
        }
      }
    >
      {/* 실제 스크롤 컨테이너: 뷰포트 높이 기준으로 고정 */}
      <div
        className="overflow-auto" // 세로/가로 모두 스크롤 허용
        // style={{
        //   position: 'fixed', // 또는 absolute (상황에 맞게)
        //   top: '240px', // 상단 고정 요소가 있으면 맞춤
        //   left: 0,
        //   right: 0,
        //   bottom: 0,
        //   WebkitOverflowScrolling: 'touch', // iOS 관성
        // }}
        ref={bodyRef} // containerRef 전달
      >
        <div className={cn('sticky top-0 bg-card z-20 w-full')}>
          <PokedexTableHeader
            ref={headerRef}
            onClick={onClickHeader}
            sortKey={sortKey}
            direction={direction}
            isScrolledX={isScrolledX}
          />
        </div>
        <PokedexTableBody
          pokes={pokes}
          ref={bodyRef}
          onScroll={onScroll}
          isScrolledX={isScrolledX}
        />
        <PokedexTableFooter count={pokes.length} total={totalPokeCount} />
      </div>
    </div>
  );
}
