import Link from 'next/link';
import type { CSSProperties } from 'react';

import { cn } from '@/_shared/lib/cn';
import { getMoveHref, type Move } from '@/_entities/move';

import MoveNameCell from './move-name-cell';
import { renderCell } from './move-cells';
import {
  CELL_ALIGN_CLASS,
  CELL_CLASS,
  LG_GRID_CLASS,
  REST_COLUMNS,
  REST_GRID_CLASS,
  LEAD_COLUMNS,
  getLeadCellClass,
} from './table-layout';

interface MoveTableRowProps {
  move: Move;
  // aria-rowindex (헤더가 1)
  rowIndex: number;
  isLast: boolean;
  // 가상화 위치 (absolute + translateY)
  style: CSSProperties;
}

/*
 * 쌓임 순서 (스크롤 박스가 isolate라 이 안에서만 비교된다)
 * - 행 오버레이 링크 z-2: 앞 칸 위까지 덮어 행 어디를 눌러도 이동. 투명이라 아래가 다 보인다
 * - 앞 칸(#·이름, sticky) z-1: 가로 스크롤로 밀려오는 나머지 칸을 가린다
 * - 나머지 칸: 위치 지정 없음
 */
export default function MoveTableRow({
  move,
  rowIndex,
  isLast,
  style,
}: MoveTableRowProps) {
  const href = getMoveHref(move);

  return (
    <div
      role="row"
      aria-rowindex={rowIndex}
      style={style}
      className={cn(
        'group absolute inset-x-0 top-0 flex border-b',
        isLast && 'border-b-0',
        LG_GRID_CLASS,
        '[@media(hover:hover)]:hover:bg-muted/70',
      )}
    >
      {/* 포인터 전용. 키보드·스크린리더는 이름 링크를 쓴다 */}
      <Link
        href={href}
        aria-hidden
        tabIndex={-1}
        prefetch={false}
        className="absolute inset-0 z-2"
      />
      {/* lg 미만: #·이름을 묶은 불투명 sticky 칸. hover 땐 행과 같은 색(배경 위 muted/70)을 before로 겹쳐 맞춘다.
          lg 이상: contents로 풀려 /move와 같은 일반 grid 칸 */}
      <div
        role="none"
        className={cn(
          'sticky left-0 z-1 flex w-(--lead-w) shrink-0 bg-background',
          'before:absolute before:inset-0 before:-z-1 before:bg-muted/70 before:opacity-0',
          '[@media(hover:hover)]:group-hover:before:opacity-100',
          'lg:contents lg:before:hidden',
        )}
      >
        {LEAD_COLUMNS.map((column) => (
          <div
            key={column.id}
            role="cell"
            className={cn(
              CELL_CLASS,
              'flex flex-col justify-center lg:block',
              getLeadCellClass(column),
            )}
          >
            {column.id === 'name' ? (
              <MoveNameCell move={move} />
            ) : (
              renderCell(column.id, move, column.cell)
            )}
          </div>
        ))}
      </div>
      <div role="none" className={cn(REST_GRID_CLASS, 'flex-1')}>
        {REST_COLUMNS.map((column) => (
          <div
            key={column.id}
            role="cell"
            className={cn(
              CELL_CLASS,
              CELL_ALIGN_CLASS[column.align ?? 'left'],
              column.cellClassName,
            )}
          >
            {renderCell(column.id, move, column.cell)}
          </div>
        ))}
      </div>
    </div>
  );
}
