import { getAllAbility } from '@/entities/ability/api';
import {
  PageLayoutContainer,
  PageLayoutSection,
} from '@/shared/ui/page-layout';
import ScrollToTopButton from '@/shared/ui/scroll-to-top-button';

import AbilityViewClient from './ui/view-client';

export default async function AbilityViewV2() {
  const abilities = await getAllAbility();

  return (
    <>
      {/* <AbilityViewSkeleton /> */}
      <PageLayoutContainer>
        <PageLayoutSection className="mt-0">
          <AbilityViewClient abilities={abilities} />
        </PageLayoutSection>
        <ScrollToTopButton />
      </PageLayoutContainer>
    </>
  );
}
