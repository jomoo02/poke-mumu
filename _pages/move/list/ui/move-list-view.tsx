'use client';

import type { Move } from '@/_entities/move';
import type { Type } from '@/_entities/type';
import type { DamageClass } from '@/_entities/damage-class';

import MoveToolbar from './toolbar';
import MoveResults from './results';
import { useMoveResults } from '../model/use-move-results';

interface MoveListViewProps {
  moves: Move[];
  // 필터 선택지 (게임 표시 순서로 정렬된 상태)
  types: Type[];
  damageClasses: DamageClass[];
}

// 위: 툴바(검색·필터) / 아래: 결과(개수·정렬, 테이블·카드, 페이지네이션)
export default function MoveListView({
  moves,
  types,
  damageClasses,
}: MoveListViewProps) {
  const { pageMoves, page, totalPages, totalCount } = useMoveResults(moves);

  return (
    <div className="flex flex-col gap-6">
      <MoveToolbar
        types={types}
        damageClasses={damageClasses}
        totalCount={totalCount}
      />
      <MoveResults
        moves={pageMoves}
        page={page}
        totalPages={totalPages}
        totalCount={totalCount}
      />
    </div>
  );
}
