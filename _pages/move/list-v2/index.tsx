import { Suspense } from 'react';

import {
  PageLayoutContainer,
  PageLayoutHeader,
  PageLayoutHeaderTitle,
  PageLayoutSection,
} from '@/_shared/ui/page-layout';
import { getAllMove } from '@/_entities/move/index.server';
import { TypeIconPreload } from '@/_entities/type';
import { getAllType } from '@/_entities/type/index.server';
import { DamageClassIconPreload } from '@/_entities/damage-class';
import { getAllDamageClass } from '@/_entities/damage-class/index.server';
// 비교용 테스트 페이지라 /move 목록의 필터 선택지 변환·스켈레톤을 그대로 쓴다
import {
  toFilterDamageClasses,
  toFilterTypes,
} from '@/_pages/move/list/model/move-filter';
import MoveListSkeleton from '@/_pages/move/list/ui/move-list-skeleton';

import MoveListV2View from './ui/move-list-v2-view';

/**
 * /move/list-v2: 기술 목록 가상화 비교용 테스트 페이지 (사이드바 메뉴 없음, URL로만 접근).
 * 페이지네이션 없이 전체를 window 가상화로 그리고, lg 미만도 카드 대신 테이블
 * (이름 칸 고정 + 가로 스크롤, 헤더는 CSS scroll-driven animation으로 동기화)
 */
export default function MoveListV2Page() {
  return (
    <PageLayoutContainer>
      <TypeIconPreload />
      <DamageClassIconPreload />
      <PageLayoutHeader>
        <PageLayoutHeaderTitle>기술</PageLayoutHeaderTitle>
      </PageLayoutHeader>
      <Suspense fallback={<MoveListSkeleton />}>
        <MoveListV2Content />
      </Suspense>
    </PageLayoutContainer>
  );
}

async function MoveListV2Content() {
  const [moves, types, damageClasses] = await Promise.all([
    getAllMove(),
    getAllType(),
    getAllDamageClass(),
  ]);

  return (
    <PageLayoutSection className="mt-2">
      <MoveListV2View
        moves={moves}
        types={toFilterTypes(types)}
        damageClasses={toFilterDamageClasses(damageClasses)}
      />
    </PageLayoutSection>
  );
}
