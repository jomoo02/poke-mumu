import { Suspense } from 'react';

import { getAllAbility } from '@/entities/ability/api';

import { PageContainer } from '@/shared/ui/container';

import { AbilityFilterSheet, AbilityFilterSideBar } from './ui/ability-filter';
import AbilitySearch from './ui/ability-search';
import AbilityList from './ui/ability-list';

export default async function AbilityPageView() {
  const abilities = await getAllAbility();

  const description = `3세대에 등장한 시스템, 5세대부터 숨겨진 특성(드림 특성) 추가`;

  return (
    <PageContainer>
      <div>
        <h1 className="text-4xl font-bold tracking-tight">특성</h1>
        <p className="pt-3 break-keep text-balance text-foreground/70">
          {description}
        </p>
      </div>
      <Suspense>
        <div className="flex flex-col lg:flex-row lg:mt-8">
          <section className="mr-10 xl:mr-18 hidden lg:block pr-5 3xl:pr-12 w-70 xl:w-80">
            <AbilityFilterSideBar />
          </section>
          <section className="flex flex-col gap-y-3 w-full">
            <div className="flex gap-x-2 w-full justify-between">
              <AbilitySearch />
              <AbilityFilterSheet />
            </div>
            <AbilityList abilities={abilities} />
          </section>
        </div>
      </Suspense>
    </PageContainer>
  );
}
