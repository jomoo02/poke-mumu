'use client';

import { useLayoutEffect, useRef } from 'react';

import { cn } from '@/_shared/lib/cn';
import type { BaseStatsPoke } from '@/_pages/pokedex/national-base-stats/model/base-stats-poke';
import type {
  PokeSort,
  SortKey,
} from '@/_pages/pokedex/national-base-stats/model/poke-sort';

import StatTableHead from './stat-table-head';
import StatTableRow from './stat-table-row';
import { ROW_HEIGHT_VARS_CLASS, TABLE_VARS } from './table-layout';
import { showsColumnHead, type SortUi } from '../../model/use-sort-ui';

// 바디 행은 화면 밖이면 그리기를 건너뛴다. 행 높이가 --row-h로 정해져 있어 건너뛰어도 자리는 그대로다.
// 앞 30행은 늘 그린다: 정렬 때 행 요소가 자리를 옮기는데(key = pokeKey), 그리기를 건너뛰던 행이
// 화면 안으로 옮겨지면 브라우저가 다음 프레임에야 그려 한 번 깜빡인다. 정렬·필터 뒤엔 테이블 맨 위로 가므로
// 그때 보이는 앞쪽 자리(큰 화면 약 13행, 좁은 화면 약 8행 + 여유)를 늘 그려 둔다
const LAZY_ROW_CLASS =
  '[&>[role=row]:nth-child(n+31)]:[content-visibility:auto]';

interface LazyStatTableProps {
  pokes: BaseStatsPoke[];
  // 좁은 화면 정렬 UI (비교용)
  sortUi: SortUi;
  isStatSort: boolean;
  sortState: PokeSort;
  onSort: (sortKey: SortKey) => void;
}

// 가상화 테이블(index.tsx)과 같은 머리글·행을 쓰고, 행을 전부 일반 흐름으로 그리는 비교용 테이블.
// @container 안에 둔다 (본문 폭으로 레이아웃·행 높이가 바뀐다)
export default function LazyStatTable({
  pokes,
  sortUi,
  isStatSort,
  sortState,
  onSort,
}: LazyStatTableProps) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  // 7칸 머리글이 보이면 행 숫자에 라벨이 없고, 아니면 숫자 위에 라벨이 붙는다 (index.tsx와 같다)
  const showHead = showsColumnHead(sortUi, isStatSort);

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
      <div role="rowgroup" className={cn('isolate', LAZY_ROW_CLASS)}>
        {pokes.map((poke, index) => (
          <StatTableRow
            key={poke.pokeKey}
            poke={poke}
            sortUi={sortUi}
            showStatLabel={!showHead}
            sortKey={sortState.sort}
            rowIndex={index + 2}
            isLast={index === pokes.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
