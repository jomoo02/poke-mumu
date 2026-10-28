import { Suspense } from 'react';

import {
  PageLayoutContainer,
  PageLayoutHeader,
  PageLayoutHeaderTitle,
  PageLayoutSection,
} from '@/_shared/ui/page-layout';
import { TypeIconPreload } from '@/_entities/type';
import { getAllType } from '@/_entities/type/index.server';

import { getBaseStatsPokes } from './api/base-stats-poke';
import { getFormGroups } from './api/form-group';

import PageView from './ui/page-view';
import { toPokeFilterOptions } from './model/filter';

const TITLE = '전국도감 종족값';

export default function NationalBaseStatsPageV2() {
  return (
    <PageLayoutContainer>
      <TypeIconPreload />
      <PageLayoutHeader>
        <PageLayoutHeaderTitle>{TITLE}</PageLayoutHeaderTitle>
      </PageLayoutHeader>
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
      <PageView
        pokes={pokes}
        filterOptions={toPokeFilterOptions(types, formGroups)}
      />
    </PageLayoutSection>
  );
}
