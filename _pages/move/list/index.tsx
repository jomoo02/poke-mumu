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
import {
  TYPE_IDENTIFIERS,
  isTypeIdentifier,
  type Type,
  type TypeDetail,
} from '@/_entities/type';
import {
  DAMAGE_CLASS_IDENTIFIERS,
  type DamageClass,
} from '@/_entities/damage-class';

import MoveViewClient from './ui/view-client';
import MoveSearch from './ui/move-search';
import MoveListContentSkeleton from './ui/content-skeleton';

// 제목·설명은 상수라 Suspense 밖에서 바로 그린다
export default function MoveListPage() {
  return (
    <PageLayoutContainer>
      <PageLayoutHeader>
        <PageLayoutHeaderTitle>기술</PageLayoutHeaderTitle>
        <PageLayoutHeaderDescription>
          모든 기술 목록
        </PageLayoutHeaderDescription>
      </PageLayoutHeader>
      <Suspense fallback={<MoveListContentSkeleton />}>
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
    <>
      <PageLayoutSection className="mt-3">
        <MoveSearch />
      </PageLayoutSection>
      <PageLayoutSection className="mt-0">
        <MoveViewClient
          moves={moves}
          types={toFilterTypes(types)}
          damageClasses={toFilterDamageClasses(damageClasses)}
        />
      </PageLayoutSection>
    </>
  );
}

const TYPE_ORDER: readonly string[] = TYPE_IDENTIFIERS;
const DAMAGE_CLASS_ORDER: readonly string[] = DAMAGE_CLASS_IDENTIFIERS;

// 타입 필터 선택지: 기술에 없는 unknown과 모르는 identifier는 빼고 게임 표시 순서로.
// 클라이언트로 넘기는 값이라 필터에 필요한 필드만 남긴다
const toFilterTypes = (types: TypeDetail[]): Type[] =>
  types
    .filter(
      ({ identifier }) =>
        identifier !== 'unknown' && isTypeIdentifier(identifier),
    )
    .sort(
      (a, b) =>
        TYPE_ORDER.indexOf(a.identifier) - TYPE_ORDER.indexOf(b.identifier),
    )
    .map(({ id, identifier, nameKo }) => ({ id, identifier, nameKo }));

// 분류 필터 선택지: DB id 순서가 아닌 게임 표시 순서(물리 → 특수 → 변화)로
const toFilterDamageClasses = (damageClasses: DamageClass[]): DamageClass[] =>
  damageClasses
    .filter(({ identifier }) => DAMAGE_CLASS_ORDER.includes(identifier))
    .sort(
      (a, b) =>
        DAMAGE_CLASS_ORDER.indexOf(a.identifier) -
        DAMAGE_CLASS_ORDER.indexOf(b.identifier),
    );
