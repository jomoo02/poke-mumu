import { Suspense } from 'react';

import {
  PageLayoutContainer,
  PageLayoutHeader,
  PageLayoutHeaderTitle,
  PageLayoutSection,
} from '@/_shared/ui/page-layout';
import { TypeIconPreload } from '@/_entities/type';
import { getAllType } from '@/_entities/type/index.server';
// 비교용 페이지라 전국도감 종족값의 조회·필터 선택지 변환·스켈레톤을 그대로 쓴다
import { getBaseStatsPokes } from '@/_pages/pokedex/national-base-stats/api';
import { toFilterTypes } from '@/_pages/pokedex/national-base-stats/model/poke-filter';
import NationalBaseStatsSkeleton from '@/_pages/pokedex/national-base-stats/ui/national-base-stats-skeleton';

import NationalBaseStatsV3View from './ui/national-base-stats-v3-view';

const TITLE = '전국도감 종족값';

/**
 * 전국도감 종족값 v3: 페이지네이션 없이 전체를 window 가상화로 그린다.
 * 좁은 본문은 가로 스크롤 테이블 대신 2줄 행(정보 / 능력치 7칸) + 정렬되는 sticky 능력치 헤더
 */
export default function NationalBaseStatsV3Page() {
  return (
    <PageLayoutContainer>
      <TypeIconPreload />
      <PageLayoutHeader>
        <PageLayoutHeaderTitle>{TITLE}</PageLayoutHeaderTitle>
      </PageLayoutHeader>
      <Suspense fallback={<NationalBaseStatsSkeleton />}>
        <NationalBaseStatsV3Content />
      </Suspense>
    </PageLayoutContainer>
  );
}

async function NationalBaseStatsV3Content() {
  const [pokes, types] = await Promise.all([getBaseStatsPokes(), getAllType()]);

  return (
    <PageLayoutSection className="mt-2">
      <NationalBaseStatsV3View pokes={pokes} types={toFilterTypes(types)} />
    </PageLayoutSection>
  );
}
