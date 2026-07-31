import { Suspense } from 'react';

import { getAllDamageClass } from '@/entities/damage-class/api';
import { getAllRecentMoves } from '@/entities/move/api';
import { getAllType } from '@/entities/type/api';
import {
  PageLayoutContainer,
  PageLayoutHeader,
  PageLayoutHeaderDescription,
  PageLayoutHeaderTitle,
  PageLayoutSection,
} from '@/shared/ui/page-layout';

import { MoveFilterSheet, MoveFilterSideBar } from './ui/move-filter';
import MoveSearch from './ui/move-search';
import MoveSort from './ui/move-sort';
import MoveList from './ui/move-list';
import MoveListSkeleton from './ui/move-list/skeleton';

export default async function MoveView() {
  const [moves, allType, damageClasses] = await Promise.all([
    getAllRecentMoves(),
    getAllType(),
    getAllDamageClass(),
  ]);

  const types = allType.filter((type) => type.identifier !== 'unknown');

  return (
    <PageLayoutContainer>
      <PageLayoutHeader>
        <PageLayoutHeaderTitle>기술</PageLayoutHeaderTitle>
        <PageLayoutHeaderDescription>
          모든 기술 목록
        </PageLayoutHeaderDescription>
      </PageLayoutHeader>
      <div className="flex flex-col lg:flex-row">
        <PageLayoutSection className="mr-10 xl:mr-18 hidden lg:block pr-4 3xl:pr-8 w-70 xl:w-80 3xl:w-88">
          <Suspense>
            <MoveFilterSideBar types={types} damageClasses={damageClasses} />
          </Suspense>
        </PageLayoutSection>
        <PageLayoutSection className="flex flex-col gap-y-3 w-full">
          <Suspense>
            <div className="flex gap-x-2 gap-y-3 w-full flex-col lg:flex-row">
              <div className="flex flex-1 gap-x-2 justify-between">
                <MoveSearch />
                <MoveFilterSheet types={types} damageClasses={damageClasses} />
              </div>
              <div className="flex justify-end">
                <MoveSort />
              </div>
            </div>
          </Suspense>

          <Suspense fallback={<MoveListSkeleton />}>
            <MoveList moves={moves} />
          </Suspense>
        </PageLayoutSection>
      </div>
    </PageLayoutContainer>
  );
}
