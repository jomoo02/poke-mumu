'use client';

import { type AbilityView } from '../model';
import useAbilityList from '../model/useAbilityList';
import AbilityList from './ability-list';
import AbilityListV2 from './ability-list-v2';
import NameFilter from './name-filter';
import SortSelect from './sort-select';

interface MainContainerProps {
  abilities: AbilityView[];
}

export default function MainContainer({ abilities }: MainContainerProps) {
  const {
    filteredAbilities,
    inputValue,
    changeInputValue,
    clearInputValue,
    sortOption,
    setSortOption,
  } = useAbilityList(abilities);
  return (
    <>
      <div className="flex items-center justify-between gap-6">
        <NameFilter
          value={inputValue}
          onChange={(e) => changeInputValue(e.target.value)}
          clearInputValue={clearInputValue}
        />

        <SortSelect setSortOption={setSortOption} value={sortOption} />
      </div>

      <AbilityListV2 abilities={filteredAbilities} />
    </>
  );
}
