'use client';

import { useDeferredValue, useMemo, useState } from 'react';

import type { Ability } from '@/entities/ability/model';

import AbilityList from './ability-list';
import NameFilter from './name-filter';
import SortSelect from './sort-select';
import {
  getSortOptionItems,
  sortAbilities,
  isSortOption,
  DEFAULT_SORT,
  type SortOption,
} from '../model/sort-ability';
// import AbilityListV2 from './ability-list-v2';

interface MainContainerProps {
  abilities: Ability[];
}

export default function MainContainer({ abilities }: MainContainerProps) {
  const [inputValue, setInputValue] = useState('');
  const filterValue = useDeferredValue(inputValue);

  const [sortOption, setSortOption] = useState<SortOption>(DEFAULT_SORT);

  const sortOptionItems = getSortOptionItems();

  const processedAbilities = useMemo(() => {
    const keyword = filterValue.trim().toLowerCase();

    const filteredAbilities = keyword
      ? abilities.filter(({ nameKo, nameEn, nameJa }) =>
          [nameKo, nameEn.toLowerCase(), nameJa].some(
            (v) => !!v?.includes(keyword),
          ),
        )
      : abilities;

    return sortAbilities(filteredAbilities, sortOption);
  }, [filterValue, abilities, sortOption]);

  const handleValueChangeSortSelect = (v: string) => {
    if (isSortOption(v)) {
      setSortOption(v);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <NameFilter
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onClear={() => setInputValue('')}
        />
        <SortSelect
          onValueChange={handleValueChangeSortSelect}
          value={sortOption}
          items={sortOptionItems}
        />
      </div>
      {/* <AbilityList abilities={processedAbilities} /> */}
      <AbilityList abilities={processedAbilities} />
    </>
  );
}
