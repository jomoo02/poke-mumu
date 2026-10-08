import { Suspense } from 'react';

import {
  PageLayoutContainer,
  PageLayoutHeader,
  PageLayoutHeaderDescription,
  PageLayoutHeaderTitle,
  PageLayoutSection,
} from '@/_shared/ui/page-layout';
import { getAllMove } from '@/_entities/move/index.server';
import { getAllType } from '@/_entities/type/index.server';
import { getAllDamageClass } from '@/_entities/damage-class/index.server';

import MoveListView from './ui/move-list-view';
import MoveListSkeleton from './ui/move-list-skeleton';
import { toFilterDamageClasses, toFilterTypes } from './model/move-filter';

// 제목·설명은 상수라 Suspense 밖에서 바로 그린다
export default function MoveListPage() {
  return (
    <PageLayoutContainer>
      <PageLayoutHeader>
        <PageLayoutHeaderTitle>기술</PageLayoutHeaderTitle>
        {/* <PageLayoutHeaderDescription>
          모든 기술 목록
        </PageLayoutHeaderDescription> */}
      </PageLayoutHeader>
      <Suspense fallback={<MoveListSkeleton />}>
        <MoveListContent />
      </Suspense>
    </PageLayoutContainer>
  );
}

// 데이터(기술·타입·분류 목록)와 URL(검색·필터·정렬·페이지)에 의존하는 부분
async function MoveListContent() {
  const [moves, types, damageClasses] = await Promise.all([
    getAllMove(),
    getAllType(),
    getAllDamageClass(),
  ]);

  return (
    <PageLayoutSection className="mt-2">
      <MoveListView
        moves={moves}
        types={toFilterTypes(types)}
        damageClasses={toFilterDamageClasses(damageClasses)}
      />
    </PageLayoutSection>
  );
}
