import { Suspense } from 'react';

import { getAllAbility } from '@/entities/ability/api';
import {
  PageLayoutContainer,
  PageLayoutHeader,
  PageLayoutHeaderDescription,
  PageLayoutHeaderTitle,
  PageLayoutSection,
} from '@/shared/ui/page-layout';

import { AbilityFilterSheet, AbilityFilterSideBar } from './ui/ability-filter';
import AbilitySearch from './ui/ability-search';
import AbilityList from './ui/ability-list';

export default async function AbilityPageView() {
  const abilities = await getAllAbility();

  const description = `3세대에 등장한 시스템, 5세대부터 숨겨진 특성(드림 특성) 추가`;

  return (
    <PageLayoutContainer>
      <PageLayoutHeader>
        <PageLayoutHeaderTitle>특성</PageLayoutHeaderTitle>
        <PageLayoutHeaderDescription>{description}</PageLayoutHeaderDescription>
      </PageLayoutHeader>
      <Suspense>
        <div className="flex flex-col lg:flex-row">
          <PageLayoutSection className="mr-10 xl:mr-18 hidden lg:block pr-4 3xl:pr-8 w-70 xl:w-80 3xl:w-88">
            <AbilityFilterSideBar />
          </PageLayoutSection>
          <PageLayoutSection className="flex flex-col gap-y-3 w-full">
            <div className="flex gap-x-2 w-full justify-between">
              <AbilitySearch />
              <AbilityFilterSheet />
            </div>
            <AbilityList abilities={abilities} />
          </PageLayoutSection>
        </div>
      </Suspense>
    </PageLayoutContainer>
  );
}
