import { Suspense } from 'react';

import {
  PageLayoutContainer,
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
import PageView from './ui/page-view';
import PageViewSkeleton from './ui/page-view-skeleton';

export { default as MoveBreadcrumb } from './ui/page-breadcrumb';

export default function MoveMainPageV3() {
  // 보이는 제목은 레이아웃의 breadcrumb (@breadcrumb/move). h1은 문서 구조·스크린리더용으로만 남긴다.
  // 위 여백 16: breadcrumb → 툴바(검색). breadcrumb 위 여백은 레이아웃 쪽이 가진다
  // md 미만 아래 여백 80: 목록 끝에서 페이지 번호 줄이 맨 위로 버튼(아래 19 + 높이 44)보다 위에 놓이게
  return (
    <PageLayoutContainer className="pt-0 lg:pt-0 pb-20 md:pb-8 lg:pb-12">
      <TypeIconPreload />
      <DamageClassIconPreload />
      <PageLayoutHeaderTitle className="sr-only">
        {PAGE_TITLE}
      </PageLayoutHeaderTitle>
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
