import { Suspense } from 'react';

import { getAllAbility } from '@/entities/ability/api';

import MainContainer from './ui/main-container';
import { PageContainer } from '@/shared/ui/container';

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
        <MainContainer abilities={abilities} />
      </Suspense>
    </PageContainer>
  );
}
