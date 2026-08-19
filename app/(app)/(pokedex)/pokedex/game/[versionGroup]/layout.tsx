import { Suspense } from 'react';

import { PageLayoutContainer } from '@/shared/ui/page-layout';
import VersionGroupRegionTab from '@/widgets/version-group-region-tab';

interface PokedexGameVersionGroupLayoutProps {
  params: Promise<{ versionGroup: string }>;
  children: React.ReactNode;
}

export default async function PokedexGameVersionGroupLayout({
  params,
  children,
}: PokedexGameVersionGroupLayoutProps) {
  return (
    <PageLayoutContainer>
      <Suspense>
        {params.then(({ versionGroup }) => (
          <VersionGroupRegionTab versionGroup={versionGroup} />
        ))}
      </Suspense>
      {children}
    </PageLayoutContainer>
  );
}
