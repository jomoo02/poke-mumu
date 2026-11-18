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

export default function MoveMainPage() {
  return (
    <PageLayoutContainer>
      {/* 필터·정렬·페이지 이동으로 처음 나타나는 아이콘이 깜빡이지 않게 전부 미리 받는다 */}
      <TypeIconPreload />
      <DamageClassIconPreload />
      {/* 제목 아래 검색 줄 (전체 폭). 그 아래 필터 줄은 PageView의 툴바.
          -mb-3: 필터 줄과의 간격을 12px로 (컨테이너 gap-6을 줄인다) */}
      <PageLayoutHeader className="-mb-3 gap-6">
        <PageLayoutHeaderTitle>{PAGE_TITLE}</PageLayoutHeaderTitle>
        {/* 검색어는 URL에서 읽어 링크마다 다르다 → 제목(정적 셸)과 떼어 이 자리만 미룬다 */}
        <Suspense
          fallback={
            <Skeleton aria-hidden className="h-10.5 w-full rounded-4xl" />
          }
        >
          <SearchBar className="h-10.5 w-full" />
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
        {/* PageView는 URL(검색·필터·정렬·페이지)을 읽으므로 링크마다 다르다 → shared App Shell에 못 들어간다.
            경계를 여기 두어 캐시된 목록(moves)은 shell에 담기고, URL을 읽는 화면만 이 경계 뒤로 미룬다 */}
        <Suspense fallback={<PageViewSkeleton />}>
          <PageView moves={moves} />
        </Suspense>
      </FilterOptionsProvider>
    </PageLayoutSection>
  );
}
