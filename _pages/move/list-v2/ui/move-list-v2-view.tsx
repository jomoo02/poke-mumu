'use client';

import type { Move } from '@/_entities/move';
import type { Type } from '@/_entities/type';
import type { DamageClass } from '@/_entities/damage-class';
// 비교용 테스트 페이지라 /move 목록의 툴바·결과 머리·빈 상태를 그대로 쓴다
import MoveToolbar from '@/_pages/move/list/ui/toolbar';
import MoveResultsHeader from '@/_pages/move/list/ui/results/results-header';
import MoveEmpty from '@/_pages/move/list/ui/results/move-empty';

import VirtualMoveTable from './virtual-move-table';
import { useAllMoveResults } from '../model/use-all-move-results';

interface MoveListV2ViewProps {
  moves: Move[];
  // 필터 선택지 (게임 표시 순서로 정렬된 상태)
  types: Type[];
  damageClasses: DamageClass[];
}

// 위: 툴바(검색·필터) / 아래: 결과(개수·정렬, 가상화 테이블). 페이지네이션 없음
export default function MoveListV2View({
  moves,
  types,
  damageClasses,
}: MoveListV2ViewProps) {
  const {
    moves: resultMoves,
    sortState,
    toggleSort,
  } = useAllMoveResults(moves);

  const totalCount = resultMoves.length;

  return (
    <div className="flex flex-col gap-6">
      <MoveToolbar
        types={types}
        damageClasses={damageClasses}
        totalCount={totalCount}
      />
      <MoveResultsHeader totalCount={totalCount} />
      {totalCount === 0 ? (
        <MoveEmpty />
      ) : (
        <section className="w-full">
          <VirtualMoveTable
            moves={resultMoves}
            sortState={sortState}
            onSort={toggleSort}
          />
        </section>
      )}
    </div>
  );
}
