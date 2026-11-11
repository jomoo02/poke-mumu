import { Suspense } from 'react';

import {
  PageLayoutContainer,
  PageLayoutHeader,
  PageLayoutHeaderTitle,
  PageLayoutSection,
} from '@/_shared/ui/page-layout';
import { TypeIconPreload } from '@/_entities/type';
import { getAllType } from '@/_entities/type/index.server';

import { getBaseStatsPokes } from './api/base-stats-poke';
import { getFormGroups } from './api/form-group';

import { PAGE_TITLE } from './config';
import PageView from './ui/page-view';
import PageViewSkeleton from './ui/page-view-skeleton';
// 서버: 선택지 모듈과 Provider만 직접 (model/filter의 public API는 URL 훅도 내보낸다)
import { toPokeFilterOptions } from './model/filter/filter-option';
import { FilterOptionsProvider } from './model/filter/filter-options-context';

export default function NationalBaseStatsPage() {
  return (
    <PageLayoutContainer>
      <TypeIconPreload />
      <PageLayoutHeader>
        <PageLayoutHeaderTitle>{PAGE_TITLE}</PageLayoutHeaderTitle>
      </PageLayoutHeader>
      {/* 데이터는 'use cache'라 보통 App Shell에 함께 들어가 이 fallback은 캐시가 비었을 때만 보인다 */}
      <Suspense
        fallback={
          <PageLayoutSection className="mt-0">
            <PageViewSkeleton />
          </PageLayoutSection>
        }
      >
        <NationalBaseStatsContent />
      </Suspense>
    </PageLayoutContainer>
  );
}

async function NationalBaseStatsContent() {
  const [pokes, types, formGroups] = await Promise.all([
    getBaseStatsPokes(),
    getAllType(),
    getFormGroups(),
  ]);

  return (
    <>
      <PageLayoutSection className="mt-0">
        <FilterOptionsProvider options={toPokeFilterOptions(types, formGroups)}>
          {/* PageView는 URL(검색·필터·정렬·페이지)을 읽으므로 링크마다 다르다 → shared App Shell에 못 들어간다.
            경계를 여기 두어 캐시된 목록(pokes)은 shell에 담기고, URL을 읽는 화면만 이 경계 뒤로 미룬다 */}
          <Suspense fallback={<PageViewSkeleton />}>
            <PageView pokes={pokes} />
          </Suspense>
        </FilterOptionsProvider>
      </PageLayoutSection>
    </>
  );
}
