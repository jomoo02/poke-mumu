'use client';

import type { Ability } from '@/entities/ability/model';
import { Pagination } from '@/shared/ui/pagination';

import AbilitySearch from './ability-search';
import AbilityTable from './ability-table';
import { useAbilities } from '../lib/ability-list';
import { usePage } from '../lib/ability-pagination';

interface AbilityViewClientProps {
  abilities: Ability[];
}

export default function AbilityViewClient({
  abilities,
}: AbilityViewClientProps) {
  const { pageAbilities, page, totalPages, totalCount } =
    useAbilities(abilities);
  const { goToPage } = usePage();

  return (
    <div className="flex flex-col gap-6">
      <AbilitySearch />

      <p aria-live="polite" className="text-sm text-foreground/70">
        {totalCount}개의 특성
      </p>

      {totalCount === 0 ? (
        <p className="py-6 font-medium text-muted-foreground">
          일치하는 특성이 없습니다
        </p>
      ) : (
        <AbilityTable abilities={pageAbilities} />
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={goToPage}
        className="mt-4"
      />
    </div>
  );
}
