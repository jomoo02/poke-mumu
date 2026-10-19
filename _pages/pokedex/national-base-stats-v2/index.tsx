import { Suspense } from 'react';

import {
  PageLayoutContainer,
  PageLayoutHeader,
  PageLayoutHeaderTitle,
  PageLayoutSection,
} from '@/_shared/ui/page-layout';
import { TypeIconPreload } from '@/_entities/type';
import { getAllType } from '@/_entities/type/index.server';
// 비교용 테스트 페이지라 전국도감 종족값의 조회·필터 선택지 변환·스켈레톤을 그대로 쓴다
import { getBaseStatsPokes } from '@/_pages/pokedex/national-base-stats/api';
import { toFilterTypes } from '@/_pages/pokedex/national-base-stats/model/poke-filter';
import NationalBaseStatsSkeleton from '@/_pages/pokedex/national-base-stats/ui/national-base-stats-skeleton';

import NationalBaseStatsV2View from './ui/national-base-stats-v2-view';

const TITLE = '전국도감 종족값';

/**
 * /pokedex/national-base-stats-v2: 종족값 테이블 가상화 비교용 테스트 페이지 (사이드바 메뉴 없음, URL로만 접근).
 * 페이지네이션 없이 전체를 window 가상화로 그리고, 좁은 본문도 리스트 대신 테이블
 * (#·이름 칸 고정 + 가로 스크롤, 헤더는 CSS scroll-driven animation으로 동기화)
 */
export default function NationalBaseStatsV2Page() {
  return (
    <PageLayoutContainer>
      <TypeIconPreload />
      <PageLayoutHeader>
        <PageLayoutHeaderTitle>{TITLE}</PageLayoutHeaderTitle>
      </PageLayoutHeader>
      <Suspense fallback={<NationalBaseStatsSkeleton />}>
        <NationalBaseStatsV2Content />
      </Suspense>
    </PageLayoutContainer>
  );
}

async function NationalBaseStatsV2Content() {
  const [pokes, types] = await Promise.all([getBaseStatsPokes(), getAllType()]);

  return (
    <PageLayoutSection className="mt-2">
      <NationalBaseStatsV2View pokes={pokes} types={toFilterTypes(types)} />
    </PageLayoutSection>
  );
}
