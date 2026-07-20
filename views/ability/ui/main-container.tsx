'use client';

import type { Ability } from '@/entities/ability/model';
import { cn } from '@/shared/lib/cn';

import { AbilityFilterSheet, AbilityFilterSideBar } from './ability-filter';
import AbilitySearch from './ability-search';
import { AbilitySearchProvider } from './ability-search/context';
import AbilityListV2 from './ability-list-v2';
import useAbilityList from './ability-list-v2/useAbilityList';

interface MainContainerProps {
  abilities: Ability[];
}

// Provider 경계. 검색어(로컬 state)를 입력창과 목록이 함께 쓴다.
// function MainContainer(props: MainContainerProps) {
//   return (
//     <AbilitySearchProvider>
//       <MainContainerInner {...props} />
//     </AbilitySearchProvider>
//   );
// }

export default function MainContainerInner({ abilities }: MainContainerProps) {
  const { count } = useAbilityList(abilities);

  return (
    <div className="flex flex-col lg:flex-row mt-10">
      <div
        className={cn(
          // 'mr-10 3xl:mr-30 hidden lg:block pr-5 3xl:pr-10 pt-1 overflow-auto lg:w-68 3xl:w-88 sticky z-10 top-25 h-[calc(100dvh-165px)]',
          'mr-10 xl:mr-16  hidden lg:block pr-5 3xl:pr-10 pt-1 lg:w-68 3xl:w-76',
        )}
      >
        <AbilityFilterSideBar />
      </div>
      <div className={cn('flex flex-col gap-y-6 flex-1 pt-1 w-full', '')}>
        <div className="flex flex-col md:flex-row md:justify-between lg:items-center gap-x-3 gap-y-6 sm:gap-y-9">
          <div className="flex gap-x-2 md:justify-end">
            <AbilitySearch />
            <AbilityFilterSheet />
          </div>
          <h2 className="text-base text-foreground/70 font-medium">
            {count}개의 특성
          </h2>
        </div>
        <AbilityListV2 abilities={abilities} />
      </div>
    </div>
  );
}
