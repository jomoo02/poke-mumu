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
import ScrollToTopButton from '@/shared/ui/scroll-to-top-button';
import TypeFilter from './ui/type-filter';
import Header from './ui/header';

export default async function MoveViewV2() {
  const [moves, allType, damageClasses] = await Promise.all([
    getAllRecentMoves(),
    getAllType(),
    getAllDamageClass(),
  ]);

  const types = allType.filter((type) => type.identifier !== 'unknown');

  return (
    <div>
      <Header />
      <PageLayoutContainer className=" px-[4.375vw] mx-auto">
        {/* <PageLayoutHeader>
          <PageLayoutHeaderTitle>기술</PageLayoutHeaderTitle>
        </PageLayoutHeader> */}
        <div className="flex flex-col lg:flex-row">
          <PageLayoutSection className="flex flex-col gap-y-3 w-full ">
            <Suspense>
              {/* <MoveSearch /> */}
              <div className="flex gap-x-2 gap-y-3 w-full flex-col lg:flex-row">
                <div className="flex flex-1 gap-x-2 justify-between">
                  <TypeFilter types={types} isMobile={false} />
                  <MoveFilterSheet
                    types={types}
                    damageClasses={damageClasses}
                  />
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
        <ScrollToTopButton />
      </PageLayoutContainer>
    </div>
  );
}
