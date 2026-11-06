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
// 서버: 선택지 모듈과 Provider만 직접 (model/filter의 public API는 URL 훅도 내보낸다)
import { toPokeFilterOptions } from './model/filter/filter-option';
import { FilterOptionsProvider } from './model/filter/filter-options-context';

const TITLE = '전국도감 종족값';

export default function NationalBaseStatsPage() {
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
      <FilterOptionsProvider options={toPokeFilterOptions(types, formGroups)}>
        <PageView pokes={pokes} />
      </FilterOptionsProvider>
    </PageLayoutSection>
  );
}
