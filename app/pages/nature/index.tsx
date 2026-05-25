'use client';

import { Input } from '@/app/shared/ui/input';

import useViewMode from './model/useViewMode';
import useSortNature from './model/useSortNature';
import useFilterNature from './model/useFilterNature';
import ViewModeTab from './ui/view-mode-tab';
import NatureListGrid from './ui/nature-list-grid';
import NatureListList from './ui/nature-list-list';
import SortModeSelect from './ui/sort-mode-select';
import { CircleXIcon, XIcon } from 'lucide-react';
import { Button } from '@/app/shared/ui/button';

export default function NaturePage() {
  const { viewMode, chageViewMode } = useViewMode();

  const { sortedNatures, sortMode, changeSortMode } = useSortNature();

  const { inputValue, changeInputValue, filterdNatures, resetInputValue } =
    useFilterNature(sortedNatures);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-0 py-10 w-full min-h-svh flex flex-col gap-6">
      <div className="flex flex-col gap-y-3">
        <h1 className="text-4xl font-bold tracking-tight">성격</h1>
        <p className="text-muted-foreground text-pretty break-keep md:max-w-[80%]">
          포켓몬 능력치에 영향을 미치는 요소로, 총 25가지의 성격이 있습니다.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-x-6 gap-y-3">
        <div className="sm:max-w-md w-full relative">
          <Input
            value={inputValue}
            id="nature-search"
            placeholder="명랑, Jolly, ようき"
            name="natures-input"
            autoComplete="new-password"
            onChange={changeInputValue}
            className="pr-10"
          />

          {inputValue.length > 0 && (
            <Button
              tabIndex={-1}
              variant={'ghost'}
              onClick={resetInputValue}
              className="absolute top-0 bottom-0 right-1 size-10 px-0 my-auto hover:bg-transparent dark:hover:bg-transparent transition-none"
            >
              <XIcon className="size-4.5 text-muted-foreground" />
            </Button>
          )}
        </div>
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
