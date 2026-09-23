import {
  PageLayoutContainer,
  PageLayoutHeader,
  PageLayoutSection,
} from '@/shared/ui/page-layout';

import PokeListSkeleton from './poke-list';

export default function AbilityIdentifierViewSkeleton() {
  return (
    <PageLayoutContainer className="animate-pulse">
      <PageLayoutHeader>
        <div className="h-10 w-40 bg-muted/70 rounded-md" />
        <div className="h-7 w-44 bg-muted/70 rounded-md" />
        <div className="h-6 w-44 bg-muted/70 rounded-md mt-3" />
      </PageLayoutHeader>
      <PageLayoutSection>
        <div className="w-24 h-8 rounded-lg bg-muted/70" />
      </PageLayoutSection>
      <PageLayoutSection>
        <div className="flex flex-col gap-2">
          <div className="h-7 w-20 bg-muted/70 rounded-md" />
          <div className="h-6 w-50 bg-muted/70 rounded-md" />
        </div>
        <PokeListSkeleton />
      </PageLayoutSection>
    </PageLayoutContainer>
  );
}
