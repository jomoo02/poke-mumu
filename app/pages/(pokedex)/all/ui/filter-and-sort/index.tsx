import { useState } from 'react';
import { RotateCwIcon, SlidersHorizontalIcon } from 'lucide-react';

import { Type } from '@/app/entities/type/model';
import { Button } from '@/app/shared/ui/button';

import { isDefaultSort, SortOption } from '../../model';
import TypePillList from './type-pill-list';
import SortPill from './sort-pill';
import FilterAndSortDrawer from './filter-and-sort-drawer';

interface FilterAndSortProps {
  allTypes: Type[];
  filterTypes: Type[];
  onToggleType: (type: Type) => void;
  sortOption: SortOption;
  resetSortOption: () => void;
  onSortOptionChange: (sort: SortOption) => void;
  onResetConditions: () => void;
  totalCount: number;
  filteredCount: number;
}

export default function FilterAndSort({
  allTypes,
  filterTypes,
  onToggleType,
  sortOption,
  resetSortOption,
  onSortOptionChange,
  onResetConditions,
  totalCount,
  filteredCount,
}: FilterAndSortProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isDefaultSortOption = isDefaultSort(sortOption);

  const isRoateView = filterTypes.length > 0 || !isDefaultSortOption;

  const content =
    filteredCount === totalCount
      ? `${totalCount} Pokémon`
      : `${filteredCount} of ${totalCount} Pokémon`;

  return (
    <>
      <div className="flex items-center gap-4 py-4">
        {isRoateView && (
          <Button
            className="size-10"
            variant={'outline'}
            onClick={onResetConditions}
          >
            <RotateCwIcon className="size-4" />
          </Button>
        )}
        <div className="flex flex-wrap gap-1">
          <TypePillList types={filterTypes} onRemove={onToggleType} />
          {!isDefaultSortOption && (
            <SortPill sort={sortOption} onReset={resetSortOption} />
          )}
        </div>
        <span className="ml-auto text-sm text-muted-foreground text-pretty text-center">
          {content}
        </span>
        <div className="w-px h-7 bg-border" />
        <Button
          variant="outline"
          className="size-10 sm:w-auto sm:h-10 sm:px-3"
          onClick={() => setDrawerOpen(true)}
        >
          <span className="hidden sm:inline">필터 & 정렬</span>
          <SlidersHorizontalIcon className="size-4" />
        </Button>
      </div>
      <FilterAndSortDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        allTypes={allTypes}
        filterTypes={filterTypes}
        onToggleType={onToggleType}
        sortOption={sortOption}
        onSortOptionChange={onSortOptionChange}
        filteredCount={filteredCount}
        onResetConditions={onResetConditions}
      />
    </>
  );
}
