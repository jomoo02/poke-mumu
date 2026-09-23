import { Suspense } from 'react';

import {
  PageLayoutContainer,
  PageLayoutHeader,
  PageLayoutHeaderDescription,
  PageLayoutHeaderTitle,
  PageLayoutSection,
} from '@/_shared/ui/page-layout';
import { getAllAbilityDetail } from '@/_entities/ability/api';

import AbilityViewClient from './ui/view-client';
import AbilitySearch from './ui/ability-search';
import AbilityListContentSkeleton from './ui/content-skeleton';

// 제목·설명은 상수라 Suspense 밖에서 바로 그린다
export default function AbilityListPage() {
  return (
    <PageLayoutContainer>
      <PageLayoutHeader>
        <PageLayoutHeaderTitle>특성</PageLayoutHeaderTitle>
        <PageLayoutHeaderDescription>
          모든 특성 목록
        </PageLayoutHeaderDescription>
      </PageLayoutHeader>
      <Suspense fallback={<AbilityListContentSkeleton />}>
        <AbilityListContent />
      </Suspense>
    </PageLayoutContainer>
  );
}

// 데이터(특성 목록)와 URL(검색·정렬·페이지)에 의존하는 부분
async function AbilityListContent() {
  const abilities = await getAllAbilityDetail();

  return (
    <>
      <PageLayoutSection className="mt-3">
        <AbilitySearch />
      </PageLayoutSection>
      <PageLayoutSection className="mt-0">
        <AbilityViewClient abilities={abilities} />
      </PageLayoutSection>
    </>
  );
}
