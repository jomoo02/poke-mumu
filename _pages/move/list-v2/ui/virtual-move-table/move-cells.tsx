import type { ReactNode } from 'react';

import type { Move } from '@/_entities/move';
import { TypeIcon, TypeIconLabel } from '@/_entities/type';
import {
  DamageClassIcon,
  DamageClassIconLabel,
} from '@/_entities/damage-class';
import MoveStatValue from '@/_pages/move/list/ui/results/move-stat-value';

// 숫자·빈 값 글자: lg 미만은 text-sm, lg 이상은 /move와 같은 text-md
const VALUE_TEXT_CLASS = 'text-md max-lg:text-sm';

const renderStat = (value: number | null) => (
  <MoveStatValue value={value} className={VALUE_TEXT_CLASS} />
);

/*
 * /move 열의 셀을 lg 미만에 맞게 바꾼 것
 * - #·위력·명중·PP: lg 미만 text-sm
 * - 타입·분류: lg 미만은 아이콘만(접근 이름은 아이콘의 alt), lg 이상은 아이콘 + 이름.
 *   안 보이는 쪽은 display:none이라 스크린리더가 이름을 두 번 읽지 않는다
 */
const CELLS: Partial<Record<string, (move: Move) => ReactNode>> = {
  moveNumber: (move) => renderStat(move.moveNumber),
  type: (move) => (
    <>
      <TypeIcon type={move.type} className="lg:hidden" />
      <TypeIconLabel type={move.type} className="hidden lg:flex" />
    </>
  ),
  damageClass: (move) =>
    move.damageClass ? (
      <>
        <DamageClassIcon damageClass={move.damageClass} className="lg:hidden" />
        <DamageClassIconLabel
          damageClass={move.damageClass}
          className="hidden lg:flex"
        />
      </>
    ) : (
      // Z·다이맥스 기술은 분류가 없다. '-'는 스크린리더가 '대시'로 읽으므로 '없음'으로
      <span className={VALUE_TEXT_CLASS}>
        <span aria-hidden>-</span>
        <span className="sr-only">없음</span>
      </span>
    ),
  power: (move) => renderStat(move.power),
  accuracy: (move) => renderStat(move.accuracy),
  pp: (move) => renderStat(move.pp),
};

// 바꾼 셀이 없으면 /move 열의 셀을 그대로 쓴다
const renderCell = (
  columnId: string,
  move: Move,
  fallback: (move: Move) => ReactNode,
) => (CELLS[columnId] ?? fallback)(move);

export { renderCell };
