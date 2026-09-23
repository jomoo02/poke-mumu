'use client';

import type { AbilityDetail } from '@/_entities/ability/model';

import AbilityTable from './ability-table';
import AbilityPagination from './ability-pagination';
import AbilityList from './ability-list';
import AbilitySort from './ability-sort';
import { useAbilityList } from '../model/use-ability-list';

interface AbilityViewClientProps {
  abilities: AbilityDetail[];
}

export default function AbilityViewClient({
  abilities,
}: AbilityViewClientProps) {
  const { pageAbilities, page, totalPages, totalCount } =
    useAbilityList(abilities);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <p aria-live="polite" className="text-sm text-foreground/70">
          {totalCount}개의 특성
        </p>
        <div className="lg:hidden">
          <AbilitySort />
        </div>
      </div>

      {totalCount === 0 ? (
        <p className="py-6 font-medium text-muted-foreground">
          일치하는 특성이 없습니다
        </p>
      ) : (
        <>
          <section className="lg:block hidden w-full">
            <AbilityTable abilities={pageAbilities} />
          </section>
          <section className="lg:hidden -mt-2">
            <AbilityList abilities={pageAbilities} />
          </section>
          {/* 1페이지뿐이어도 표시한다. 검색 중 결과 수가 바뀔 때 레이아웃이 흔들리지 않게 */}
          <AbilityPagination
            page={page}
            totalPages={totalPages}
            className="mt-3"
          />
        </>
      )}
    </div>
  );
}
