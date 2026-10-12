import { Suspense } from 'react';

import {
  PageLayoutContainer,
  PageLayoutHeader,
  PageLayoutHeaderTitle,
  PageLayoutSection,
} from '@/_shared/ui/page-layout';
import { getAllAbilityDetail } from '@/_entities/ability/index.server';

import AbilityListView from './ui/ability-list-view';
import AbilityListSkeleton from './ui/ability-list-skeleton';

// 제목은 상수라 Suspense 밖에서 바로 그린다
export default function AbilityListPage() {
  return (
    <PageLayoutContainer>
      <PageLayoutHeader>
        <PageLayoutHeaderTitle>특성</PageLayoutHeaderTitle>
      </PageLayoutHeader>
      <Suspense fallback={<AbilityListSkeleton />}>
        <AbilityListContent />
      </Suspense>
    </PageLayoutContainer>
  );
}

// 데이터(특성 목록)와 URL(검색·정렬·페이지)에 의존하는 부분
async function AbilityListContent() {
  const abilities = await getAllAbilityDetail();

  return (
    <PageLayoutSection className="mt-2">
      <AbilityListView abilities={abilities} />
    </PageLayoutSection>
  );
}
