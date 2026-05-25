'use client';

import useViewMode from './model/useViewMode';
import useSortNature from './model/useSortNature';
import useFilterNature from './model/useFilterNature';
import ViewModeTab from './ui/view-mode-tab';
import NatureListGrid from './ui/nature-list-grid';
import NatureListList from './ui/nature-list-list';
import SortModeSelect from './ui/sort-mode-select';
import NameFilter from './ui/name-filter';

export default function NaturePageView() {
  const { viewMode, chageViewMode } = useViewMode();

  const { sortedNatures, sortMode, changeSortMode } = useSortNature();

  const { inputValue, changeInputValue, filterdNatures, clearInputValue } =
    useFilterNature(sortedNatures);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-0 py-12 w-full min-h-svh flex flex-col gap-6">
      <div className="flex flex-col gap-y-3">
        <h1 className="text-4xl font-bold tracking-tight">성격</h1>
        <p className="text-muted-foreground text-pretty break-keep md:max-w-[80%]">
          포켓몬 능력치에 영향을 미치는 요소로, 총 25가지의 성격
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-x-6 gap-y-3">
        <NameFilter
          inputValue={inputValue}
          clearInputValue={clearInputValue}
          changeInputValue={changeInputValue}
        />
        <div className="flex items-center justify-between">
          <SortModeSelect sortMode={sortMode} changeSortMode={changeSortMode} />
          <div className="h-7 w-px bg-border hidden sm:block mx-3.5" />
          <ViewModeTab viewMode={viewMode} chageViewMode={chageViewMode} />
        </div>
      </div>

      {viewMode === 'grid' ? (
        <NatureListGrid natures={filterdNatures} sortMode={sortMode} />
      ) : (
        <NatureListList natures={filterdNatures} />
      )}
    </div>
  );
}
