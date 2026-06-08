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
  const { viewMode, setViewMode } = useViewMode();

  const { sortedNatures, sortMode, setSortMode } = useSortNature();

  const { inputValue, filterdNatures, setInputValue } =
    useFilterNature(sortedNatures);

  const description1 = '포켓몬 능력치에 영향을 미치는 요소로, 총 25가지의 성격';
  const description2 = '상승 1.1배, 하락 0.9배';

  return (
    <div className="max-w-365 mx-auto py-12 w-full min-h-svh flex flex-col gap-6 px-5 md:px-8 lg:px-10 3xl:px-2.5">
      <div className="flex flex-col gap-y-3">
        <h1 className="text-4xl font-bold tracking-tight">성격</h1>
        <div>
          <p className="text-muted-foreground text-pretty break-keep md:max-w-[80%]">
            {description1}
          </p>
          <p className="text-muted-foreground text-pretty break-keep md:max-w-[80%]">
            {description2}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-x-6 gap-y-3">
        <NameFilter
          value={inputValue}
          onClear={() => setInputValue('')}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="flex flex-wrap gap-y-3 gap-x-1.5 md:gap-x-3.5 items-center justify-between">
          <SortModeSelect value={sortMode} onValueChange={setSortMode} />
          <div className="h-7 w-px bg-transparent md:bg-border" />
          <ViewModeTab viewMode={viewMode} onChageViewMode={setViewMode} />
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
