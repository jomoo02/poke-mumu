import { Suspense } from 'react';

import {
  PageLayoutContainer,
  PageLayoutHeader,
  PageLayoutHeaderTitle,
  PageLayoutSection,
} from '@/_shared/ui/page-layout';

import { getListAbilities } from './api/ability';
import { PAGE_TITLE } from './config';
import PageView from './ui/page-view';
import PageViewSkeleton from './ui/page-view-skeleton';

export default function AbilityMainPage() {
  return (
    <PageLayoutContainer>
      <PageLayoutHeader>
        <PageLayoutHeaderTitle>{PAGE_TITLE}</PageLayoutHeaderTitle>
      </PageLayoutHeader>
      <Suspense
        fallback={
          <PageLayoutSection className="mt-0">
            <PageViewSkeleton />
          </PageLayoutSection>
        }
      >
        <AbilityMainContent />
      </Suspense>
    </PageLayoutContainer>
  );
}

async function AbilityMainContent() {
  const abilities = await getListAbilities();

  return (
    <PageLayoutSection className="mt-0">
      {/* PageView는 URL(검색·정렬·페이지)을 읽으므로 링크마다 다르다 → shared App Shell에 못 들어간다.
          경계를 여기 두어 캐시된 목록(abilities)은 shell에 담기고, URL을 읽는 화면만 이 경계 뒤로 미룬다 */}
      <Suspense fallback={<PageViewSkeleton />}>
        <PageView abilities={abilities} />
      </Suspense>
    </PageLayoutSection>
  );
}
