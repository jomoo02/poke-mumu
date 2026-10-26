'use client';

import FullStatTable from './full-stat-table';
import type { StatTableProps } from './stat-table-props';
import VirtualStatTable from './virtual-stat-table';

interface StatTableComponentProps extends StatTableProps {
  // 본문(@container)이 넓은가 (useIsWideContainer)
  isWide: boolean;
}

/**
 * 전국도감 종족값 표. 본문 폭으로 그리기 방식을 고른다
 * (docs/decisions/2026-10-20-mobile-sort-sheet-virtualization.md):
 * - 넓은 본문(테이블): 전부 그린다. 데스크탑은 정렬이 빠르고(M2 약 90ms) 브라우저 찾기(Ctrl+F)가 전부 된다
 * - 좁은 본문(카드): 보이는 행만 그린다. 실기기 모바일에서 전체 그리기 정렬이 가끔 크게 늦었다
 * @container 안에 둔다 (본문 폭으로 레이아웃·행 높이가 바뀐다)
 */
export default function StatTable({
  isWide,
  ...props
}: StatTableComponentProps) {
  return isWide ? (
    <FullStatTable {...props} />
  ) : (
    <VirtualStatTable {...props} />
  );
}
