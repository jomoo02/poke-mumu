import { Suspense } from 'react';

import { getAllAbility } from '@/entities/ability/api';

import MainContainer from './ui/main-container';

export default async function AbilityPageView() {
  const abilities = await getAllAbility();

  const description = `3세대에 등장한 시스템, 5세대부터 숨겨진 특성(드림 특성) 추가`;

  return (
    <div className="max-w-365 mx-auto py-12 w-full min-h-svh flex flex-col gap-6 px-5 md:px-8 lg:px-10 3xl:px-2.5">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">특성</h1>
        <div className="pt-3 text-muted-foreground">
          <p className="break-keep text-balance">{description}</p>
        </div>
      </div>
      <Suspense>
        <MainContainer abilities={abilities} />
      </Suspense>
    </div>
  );
}
