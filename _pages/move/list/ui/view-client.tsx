'use client';

import { PaginationNav } from '@/_shared/ui/pagination';
import type { Move } from '@/_entities/move';
import type { Type } from '@/_entities/type';
import type { DamageClass } from '@/_entities/damage-class';

import MoveTable from './move-table';
import MoveList from './move-list';
import MoveToolbar from './move-toolbar';
import MoveSort from './move-sort';
import { useMoveList } from '../model/use-move-list';
import { SEARCH_PARAMS_KEY } from '../config/search-params';

interface MoveViewClientProps {
  moves: Move[];
  // 필터 선택지 (게임 표시 순서로 정렬된 상태)
  types: Type[];
  damageClasses: DamageClass[];
}

export default function MoveViewClient({
  moves,
  types,
  damageClasses,
}: MoveViewClientProps) {
  const { pageMoves, page, totalPages, totalCount } = useMoveList(moves);

  return (
    <div className="flex flex-col gap-6">
      <MoveToolbar types={types} damageClasses={damageClasses} />

      {/* 목록 머리 줄: 개수 + 정렬. lg 이상은 테이블 헤더로 정렬하므로 버튼을 숨긴다 */}
      <div className="flex flex-wrap items-center justify-between gap-6">
        <p aria-live="polite" className="text-sm text-foreground/70">
          {totalCount}개의 기술
        </p>
        <div className="lg:hidden">
          <MoveSort />
        </div>
      </div>

      {totalCount === 0 ? (
        <p className="py-6 font-medium text-muted-foreground">
          일치하는 기술이 없습니다
        </p>
      ) : (
        <>
          <section className="lg:block hidden w-full">
            <MoveTable moves={pageMoves} />
          </section>
          <section className="lg:hidden -mt-2">
            <MoveList moves={pageMoves} />
          </section>
          {/* 1페이지뿐이어도 표시한다. 검색 중 결과 수가 바뀔 때 레이아웃이 흔들리지 않게 */}
          <PaginationNav
            page={page}
            totalPages={totalPages}
            paramName={SEARCH_PARAMS_KEY.page}
            className="mt-3"
          />
        </>
      )}
    </div>
  );
}
