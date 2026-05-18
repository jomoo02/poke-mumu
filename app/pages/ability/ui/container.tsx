'use client';

import { type AbilityView } from '../model';
import useAbilityList from '../model/useAbilityList';
import AbilityList from './ability-list';
import NameFilter from './name-filter';
import SortSelect from './sort-select';

interface ContainerProps {
  abilities: AbilityView[];
}

export default function Container({ abilities }: ContainerProps) {
  const {
    filteredAbilities,
    inputValue,
    setInputValue,
    resetInputValue,
    sortOption,
    setSortOption,
  } = useAbilityList(abilities);
  return (
    <>
      <div className="flex items-center justify-between gap-6">
        <NameFilter
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          reset={resetInputValue}
          placeholder="Name..."
        />

        <SortSelect setSortOption={setSortOption} value={sortOption} />
      </div>

      <AbilityList abilities={filteredAbilities} />
    </>
  );
}
