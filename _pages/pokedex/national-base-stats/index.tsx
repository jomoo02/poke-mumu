import { Suspense } from 'react';

import {
  PageLayoutContainer,
  PageLayoutHeader,
  PageLayoutHeaderTitle,
  PageLayoutSection,
} from '@/_shared/ui/page-layout';
import { TypeIconPreload } from '@/_entities/type';
import { getAllType } from '@/_entities/type/index.server';

import { getBaseStatsPokes } from './api';
import NationalBaseStatsView from './ui/national-base-stats-view';
import NationalBaseStatsSkeleton from './ui/national-base-stats-skeleton';
import { toFilterTypes } from './model/poke-filter';

const TITLE = '전국도감 종족값';

// 제목은 상수라 Suspense 밖에서 바로 그린다
export default function NationalBaseStatsPage() {
  return (
    <PageLayoutContainer>
      {/* 필터·정렬·페이지 이동으로 처음 나타나는 아이콘이 깜빡이지 않게 전부 미리 받는다 */}
      <TypeIconPreload />
      <PageLayoutHeader>
        <PageLayoutHeaderTitle>{TITLE}</PageLayoutHeaderTitle>
      </PageLayoutHeader>
      <Suspense fallback={<NationalBaseStatsSkeleton />}>
        <NationalBaseStatsContent />
      </Suspense>
    </PageLayoutContainer>
  );
}

// 데이터(포켓몬·타입 목록)와 URL(검색·필터·정렬·페이지)에 의존하는 부분
async function NationalBaseStatsContent() {
  const [pokes, types] = await Promise.all([getBaseStatsPokes(), getAllType()]);

  return (
    <PageLayoutSection className="mt-2">
      <NationalBaseStatsView pokes={pokes} types={toFilterTypes(types)} />
    </PageLayoutSection>
  );
}
