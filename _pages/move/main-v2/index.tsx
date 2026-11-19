import { Suspense } from 'react';

import {
  PageLayoutContainer,
  PageLayoutHeader,
  PageLayoutHeaderTitle,
  PageLayoutSection,
} from '@/_shared/ui/page-layout';
import { Skeleton } from '@/_shared/ui/skeleton';
import { TypeIconPreload } from '@/_entities/type';
import { getAllType } from '@/_entities/type/index.server';
import { DamageClassIconPreload } from '@/_entities/damage-class';
import { getAllDamageClass } from '@/_entities/damage-class/index.server';

import { getListMoves } from './api/move';
import { PAGE_TITLE } from './config';
import { toMoveFilterOptions } from './model/filter/filter-option';
import { FilterOptionsProvider } from './model/filter/filter-options-context';
import PageView from './ui/page-view';
import PageViewSkeleton from './ui/page-view-skeleton';
import SearchBar from './ui/search-bar';

export default function MoveMainPageV2() {
  // 간격: 제목 → 검색 24px (머리글 gap-6), 검색 → 필터 줄 12px (gap-y-3)
  return (
    <PageLayoutContainer className="gap-y-3">
      <TypeIconPreload />
      <DamageClassIconPreload />
      <PageLayoutHeader className="gap-6">
        <PageLayoutHeaderTitle>{PAGE_TITLE}</PageLayoutHeaderTitle>
        {/* 검색어는 URL에서 읽어 링크마다 다르다 → 제목(정적 셸)과 떼어 이 자리만 미룬다 */}
        <Suspense
          fallback={
            <Skeleton aria-hidden className="h-11 w-full rounded-4xl" />
          }
        >
          <SearchBar className="h-11 w-full" />
        </Suspense>
      </PageLayoutHeader>
      <Suspense
        fallback={
          <PageLayoutSection className="mt-0">
            <PageViewSkeleton />
          </PageLayoutSection>
        }
      >
        <MoveMainContent />
      </Suspense>
    </PageLayoutContainer>
  );
}

async function MoveMainContent() {
  const [moves, types, damageClasses] = await Promise.all([
    getListMoves(),
    getAllType(),
    getAllDamageClass(),
  ]);

  return (
    <PageLayoutSection className="mt-0">
      <FilterOptionsProvider
        options={toMoveFilterOptions(types, damageClasses)}
      >
        <Suspense fallback={<PageViewSkeleton />}>
          <PageView moves={moves} />
        </Suspense>
      </FilterOptionsProvider>
    </PageLayoutSection>
  );
}
