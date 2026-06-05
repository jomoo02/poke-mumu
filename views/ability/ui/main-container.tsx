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
  } = useAbilityList(abilities);

  return (
    <div className="flex flex-col lg:flex-row pt-8 px-5 md:px-8 lg:px-10 3xl:px-2.5">
      <div className="mr-10 3xl:mr-30.5 hidden lg:block pr-5 pt-2  overflow-auto lg:w-68 3xl:w-91.25 sticky z-10 top-25 h-[calc(100dvh-200px)]">
        <AppearedFilter
          selectedAppearedGens={selectedAppearedGens}
          resetFilter={resetFilter}
          toggleAppearedGen={toggleAppearedGen}
          appearedGens={appearedGens}
        />
      </div>
      <div
        className={cn(
          'flex flex-col gap-y-6 flex-1 pt-2 w-full',
          'lg:max-w-[calc(100%-332px)] 3xl:max-w-[calc(100%-487px)]',
        )}
      >
        <div className="flex flex-col md:flex-row md:justify-between lg:items-center gap-3 gap-y-6">
          <h2 className="text-2xl font-bold">{count}개의 특성</h2>
          <div className="flex gap-x-4 md:justify-end">
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
              />
            </SheetMobile>
          </div>
        </div>
        <AbilityList abilities={filteredAbilities} />
      </div>
    </div>
  );
}
