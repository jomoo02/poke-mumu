import { getAllAbility } from '@/entities/ability/api';
import {
  PageLayoutContainer,
  PageLayoutSection,
} from '@/shared/ui/page-layout';
import ScrollToTopButton from '@/shared/ui/scroll-to-top-button';

import AbilityListV12 from './ui/ability-list-v12';

export default async function AbilityView() {
  const abilities = await getAllAbility();

  return (
    <>
      {/* <AbilityViewSkeleton /> */}
      <PageLayoutContainer>
        <PageLayoutSection className="mt-0">
          <AbilityListV12 abilities={abilities} />
          {/* <AbilityListV11 abilities={abilities} /> */}
          {/* <AbilityListV8 abilities={abilities} /> */}
          {/* <AbilityListV9 abilities={abilities} /> */}
          {/* <AbilityListV7 abilities={sliceAbilities} /> */}
        </PageLayoutSection>
        <ScrollToTopButton />
      </PageLayoutContainer>
    </>
  );
}
