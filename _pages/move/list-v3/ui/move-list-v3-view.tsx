'use client';

import type { Move } from '@/_entities/move';
import type { Type } from '@/_entities/type';
import type { DamageClass } from '@/_entities/damage-class';

import MoveToolbar from './toolbar';
import MoveResults from './results';
import SortSheetSwitch from './sort-sheet-switch';
import { useAllMoveResults } from '../model/use-all-move-results';

interface MoveListV3ViewProps {
  moves: Move[];
  // 필터 선택지 (게임 표시 순서로 정렬된 상태)
  types: Type[];
  damageClasses: DamageClass[];
}

// 위: 툴바(검색 / 필터·개수·정렬) / 아래: 결과(테이블·카드). 페이지네이션 없이 전체를 그린다
export default function MoveListV3View({
  moves,
  types,
  damageClasses,
}: MoveListV3ViewProps) {
  const { moves: resultMoves, totalCount } = useAllMoveResults(moves);

  return (
    <div className="flex flex-col gap-6">
      <MoveToolbar
        types={types}
        damageClasses={damageClasses}
        totalCount={totalCount}
      />
      <SortSheetSwitch />
      <MoveResults moves={resultMoves} />
    </div>
  );
}
