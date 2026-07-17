'use client';

import type { Ability } from '@/entities/ability/model';
import { cn } from '@/shared/lib/cn';

import NameFilter from './name-filter';
import AppearedFilter from './appeared-filter';
import useAbilityList from './useAbilityList';
import AbilityList from './ability-list';
import SheetMobile from './sheet-mobile';

interface MainContainerProps {
  abilities: Ability[];
}

export default function MainContainer({ abilities }: MainContainerProps) {
  const {
    inputValue,
    setInputValue,
    resetFilter,
    selectedAppearedGens,
    toggleAppearedGen,
    filteredAbilities,
    count,
    appearedGens,
    isChampions,
    toggleChampions,
  } = useAbilityList(abilities);

  return (
    <div className="flex flex-col lg:flex-row mt-10">
      <div
        className={cn(
          // 'mr-10 3xl:mr-30 hidden lg:block pr-5 3xl:pr-10 pt-1 overflow-auto lg:w-68 3xl:w-88 sticky z-10 top-25 h-[calc(100dvh-165px)]',
          'mr-10 xl:mr-16  hidden lg:block pr-5 3xl:pr-10 pt-1 lg:w-68 3xl:w-76',
        )}
      >
        <AppearedFilter
          selectedAppearedGens={selectedAppearedGens}
          resetFilter={resetFilter}
          toggleAppearedGen={toggleAppearedGen}
          appearedGens={appearedGens}
          isChampions={isChampions}
          toggleChampions={toggleChampions}
        />
      </div>
      <div className={cn('flex flex-col gap-y-6 flex-1 pt-1 w-full', '')}>
        <div className="flex flex-col md:flex-row md:justify-between lg:items-center gap-x-3 gap-y-6 sm:gap-y-9">
          <div className="flex gap-x-2 md:justify-end">
            <NameFilter
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onClear={() => setInputValue('')}
            />
            <SheetMobile>
              <AppearedFilter
                selectedAppearedGens={selectedAppearedGens}
                resetFilter={resetFilter}
                toggleAppearedGen={toggleAppearedGen}
                appearedGens={appearedGens}
                variant="mobile"
                isChampions={isChampions}
                toggleChampions={toggleChampions}
              />
            </SheetMobile>
          </div>
          <h2 className="text-base text-foreground/70 font-medium">
            {count}개의 특성
          </h2>
        </div>
        <AbilityList abilities={filteredAbilities} />
      </div>
    </div>
  );
}
