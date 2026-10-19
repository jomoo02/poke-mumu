import { Suspense } from 'react';

import {
  PageLayoutContainer,
  PageLayoutHeader,
  PageLayoutHeaderTitle,
  PageLayoutSection,
} from '@/_shared/ui/page-layout';
import { TypeIconPreload } from '@/_entities/type';
import { getAllType } from '@/_entities/type/index.server';
// 정리 전까지 전국도감 종족값의 조회·필터 선택지 변환·스켈레톤을 그대로 쓴다
import { getBaseStatsPokes } from '@/_pages/pokedex/national-base-stats/api';
import { toFilterTypes } from '@/_pages/pokedex/national-base-stats/model/poke-filter';
import NationalBaseStatsSkeleton from '@/_pages/pokedex/national-base-stats/ui/national-base-stats-skeleton';

import NationalBaseStatsV4View from './ui/national-base-stats-v4-view';

const TITLE = '전국도감 종족값';

/**
 * 전국도감 종족값 v4 (정렬 UI 통일안, docs/decisions/2026-10-19-sort-ui.md)
 * - 페이지네이션 없이 전체를 window 가상화로 그린다
 *   (전체 그리기 + content-visibility는 정렬 한 번에 1,250행을 다시 그려 M2에서도 약 160ms라 버렸다)
 * - 넓은 본문: 10열 테이블. 번호·이름·능력치 머리글로 정렬
 * - 좁은 본문: 2줄 행 + 상단 고정 능력치 7칸 머리글. 번호순은 결과 줄의 [번호순 | 번호 역순], 이름순은 없다
 */
export default function NationalBaseStatsV4Page() {
  return (
    <PageLayoutContainer>
      <TypeIconPreload />
      <PageLayoutHeader>
        <PageLayoutHeaderTitle>{TITLE}</PageLayoutHeaderTitle>
      </PageLayoutHeader>
      <Suspense fallback={<NationalBaseStatsSkeleton />}>
        <NationalBaseStatsV4Content />
      </Suspense>
    </PageLayoutContainer>
  );
}

async function NationalBaseStatsV4Content() {
  const [pokes, types] = await Promise.all([getBaseStatsPokes(), getAllType()]);

  return (
    <PageLayoutSection className="mt-2">
      <NationalBaseStatsV4View pokes={pokes} types={toFilterTypes(types)} />
    </PageLayoutSection>
  );
}
