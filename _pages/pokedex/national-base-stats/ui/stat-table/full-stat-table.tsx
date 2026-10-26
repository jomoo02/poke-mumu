'use client';

import { memo, useRef } from 'react';

import { cn } from '@/_shared/lib/cn';

import type { BaseStatsPoke } from '../../model/base-stats-poke';
import type { NameLanguage } from '../../model/name-language';

import StatTableHead from './stat-table-head';
import StatTableRow from './stat-table-row';
import { PENDING_BODY_CLASS, type StatTableProps } from './stat-table-props';
import {
  ROW_HEIGHT_VARS_CLASS,
  TABLE_GROUP_CLASS,
  TABLE_VARS,
} from './table-layout';
import { useScrollToTableTop } from './use-scroll-to-table-top';

// 화면 밖 행은 그리기·레이아웃을 건너뛴다. 행 높이가 --row-h로 정해져 있어 건너뛰어도 자리는 그대로다.
// 앞 30행은 늘 그린다: 정렬 때 행 요소가 자리를 옮기는데(key = pokeKey), 그리기를 건너뛰던 행이
// 화면 안으로 옮겨지면 브라우저가 다음 프레임에야 그려 한 번 깜빡인다. 정렬·필터 뒤엔 테이블 맨 위로 가므로
// 그때 보이는 앞쪽 자리(큰 화면 약 13행, 좁은 화면 약 8행 + 여유)를 늘 그려 둔다
const LAZY_ROW_CLASS =
  '[&>[role=row]:nth-child(n+31)]:[content-visibility:auto]';

/**
 * 전부 그리는 테이블 (넓은 본문. pokemondb와 같은 방식). 브라우저 찾기(Ctrl+F)·뒤로 가기 위치 복원이 그대로 된다.
 * @container 안에 둔다 (본문 폭으로 레이아웃·행 높이가 바뀐다)
 */
export default function FullStatTable({
  pokes,
  sortState,
  shownSortState,
  language,
  isPending,
  onSort,
}: StatTableProps) {
  const scopeRef = useRef<HTMLDivElement>(null);

  useScrollToTableTop(pokes, scopeRef);

  return (
    <div
      ref={scopeRef}
      role="table"
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
        role="rowgroup"
        className={cn(
          'isolate',
          LAZY_ROW_CLASS,
          isPending && PENDING_BODY_CLASS,
        )}
      >
        <StatTableRows pokes={pokes} language={language} />
      </div>
    </div>
  );
}

interface StatTableRowsProps {
  pokes: BaseStatsPoke[];
  language: NameLanguage;
}

// 머리글·흐림만 바뀌는 렌더(조건을 바꾼 직후)에선 행 목록을 건너뛴다
const StatTableRows = memo(function StatTableRows({
  pokes,
  language,
}: StatTableRowsProps) {
  return pokes.map((poke) => (
    <StatTableRow key={poke.pokeKey} poke={poke} language={language} />
  ));
});
