import { Suspense } from 'react';

import {
  PageLayoutContainer,
  PageLayoutHeader,
  PageLayoutHeaderTitle,
  PageLayoutSection,
} from '@/_shared/ui/page-layout';
import { TypeIconPreload } from '@/_entities/type';
import { getAllType } from '@/_entities/type/index.server';
import { DamageClassIconPreload } from '@/_entities/damage-class';
import { getAllDamageClass } from '@/_entities/damage-class/index.server';

import { getListMoves } from './api/move';
import { PAGE_TITLE } from './config';
import { toMoveFilterOptions } from './model/filter/filter-option';
import { FilterOptionsProvider } from './model/filter/filter-options-context';
import ActiveFilterSummary from './ui/active-filter-summary';
import PageView from './ui/page-view';
import PageViewSkeleton from './ui/page-view-skeleton';

export default function MoveMainPage() {
  return (
    <PageLayoutContainer>
      {/* 필터·정렬·페이지 이동으로 처음 나타나는 아이콘이 깜빡이지 않게 전부 미리 받는다 */}
      <TypeIconPreload />
      <DamageClassIconPreload />
      <PageLayoutHeader>
        {/* 제목은 App Shell에 담고, 옆의 지금 필터(URL을 읽음)만 나중에 채운다. 같은 줄이라 나타나도 밀리지 않는다 */}
        <div className="flex min-w-0 items-baseline gap-3">
          <PageLayoutHeaderTitle className="shrink-0">
            {PAGE_TITLE}
          </PageLayoutHeaderTitle>
          <Suspense fallback={null}>
            <MoveFilterSummary />
          </Suspense>
        </div>
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

// 제목 옆 지금 필터. 선택지 이름이 필요해 같은 조회('use cache')를 한 번 더 부른다 (캐시라 비용 없음)
async function MoveFilterSummary() {
  const [types, damageClasses] = await Promise.all([
    getAllType(),
    getAllDamageClass(),
  ]);

  return (
    <FilterOptionsProvider options={toMoveFilterOptions(types, damageClasses)}>
      <ActiveFilterSummary />
    </FilterOptionsProvider>
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
