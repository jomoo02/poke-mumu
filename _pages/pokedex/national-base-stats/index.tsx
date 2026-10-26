import { Suspense } from 'react';

import {
  PageLayoutContainer,
  PageLayoutHeader,
  PageLayoutHeaderTitle,
  PageLayoutSection,
} from '@/_shared/ui/page-layout';
import { TypeIconPreload } from '@/_entities/type';
import { getAllType } from '@/_entities/type/index.server';

import { getBaseStatsPokes, getFormGroups } from './api';
import { toPokeFilterOptions } from './model/poke-filter';
import NationalBaseStatsView from './ui/national-base-stats-view';

const TITLE = '전국도감 종족값';

/**
 * 전국도감 종족값 (정렬 UI: docs/decisions/2026-10-19-sort-ui.md, 필터: 2026-10-23-national-base-stats-filter.md)
 * - 페이지네이션 없이 전체를 그린다. 좁은 본문의 카드는 window 가상화
 * - 넓은 본문: 10열 테이블. 번호·이름·능력치 머리글로 정렬
 * - 좁은 본문: 머리글 없는 2줄 카드(능력치 칸마다 이름). 정렬은 결과 줄의 정렬 시트·팝오버
 */
export default function NationalBaseStatsPage() {
  return (
    <PageLayoutContainer className="max-w-360">
      <TypeIconPreload />
      <PageLayoutHeader>
        <PageLayoutHeaderTitle>{TITLE}</PageLayoutHeaderTitle>
      </PageLayoutHeader>
      {/* TODO: 스켈레톤 (레이아웃 max-w·테이블 정리 후) */}
      <Suspense
        fallback={
          <span role="status" className="sr-only">
            포켓몬 목록을 불러오는 중
          </span>
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
    <PageLayoutSection className="mt-2">
      <NationalBaseStatsView
        pokes={pokes}
        filterOptions={toPokeFilterOptions(types, formGroups)}
      />
    </PageLayoutSection>
  );
}
