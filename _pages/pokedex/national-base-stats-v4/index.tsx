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
import {
  getBaseStatsPokes,
  getFormGroups,
} from '@/_pages/pokedex/national-base-stats/api';
import { toPokeFilterOptions } from '@/_pages/pokedex/national-base-stats/model/poke-filter';
import NationalBaseStatsSkeleton from '@/_pages/pokedex/national-base-stats-v0/ui/national-base-stats-skeleton';

import NationalBaseStatsV4View from './ui/national-base-stats-v4-view';

const TITLE = '전국도감 종족값';

/**
 * 전국도감 종족값 v4 (정렬 UI 통일안, docs/decisions/2026-10-19-sort-ui.md)
 * - 페이지네이션 없이 전체를 window 가상화로 그린다
 *   (전체 그리기는 실기기 모바일에서 정렬이 가끔 크게 늦어져 비교용 ?list=full로만 남겼다)
 * - 넓은 본문: 10열 테이블. 번호·이름·능력치 머리글로 정렬
 * - 좁은 본문: 머리글 없는 2줄 카드(능력치 칸마다 이름). 정렬은 결과 줄의 정렬 시트 (기준 2열 + 순서 2열)
 */
export default function NationalBaseStatsV4Page() {
  return (
    <PageLayoutContainer className="max-w-360">
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
  const [pokes, types, formGroups] = await Promise.all([
    getBaseStatsPokes(),
    getAllType(),
    getFormGroups(),
  ]);

  return (
    <PageLayoutSection className="mt-2">
      <NationalBaseStatsV4View
        pokes={pokes}
        filterOptions={toPokeFilterOptions(types, formGroups)}
      />
    </PageLayoutSection>
  );
}
