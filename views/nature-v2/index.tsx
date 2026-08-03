import {
  PageLayoutContainer,
  PageLayoutHeader,
  PageLayoutHeaderDescription,
  PageLayoutHeaderTitle,
  PageLayoutSection,
} from '@/shared/ui/page-layout';
import NatureTable from './ui/nature-table';
import NatureSearch from './ui/nature-search';
import { Suspense } from 'react';

export default function NaturePageViewV2() {
  const description1 = '포켓몬 능력치에 영향을 미치는 요소로, 총 25가지의 성격';
  const description2 = '상승 1.1배, 하락 0.9배';

  return (
    <PageLayoutContainer>
      <PageLayoutHeader>
        <PageLayoutHeaderTitle>성격</PageLayoutHeaderTitle>
        <div>
          <PageLayoutHeaderDescription>
            {description1}
          </PageLayoutHeaderDescription>
          <PageLayoutHeaderDescription>
            {description2}
          </PageLayoutHeaderDescription>
        </div>
      </PageLayoutHeader>
      <PageLayoutSection>
        <Suspense>
          <NatureSearch />

          <NatureTable />
        </Suspense>
      </PageLayoutSection>
    </PageLayoutContainer>
  );
}
