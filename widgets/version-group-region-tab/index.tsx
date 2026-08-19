import { PageLayoutSection } from '@/shared/ui/page-layout';
import { getRegions } from '@/entities/version-group/api';

import RegionTab from './ui/region-tab';

interface VersionGroupRegionTabProps {
  versionGroup: string;
}

export default async function VersionGroupRegionTab({
  versionGroup,
}: VersionGroupRegionTabProps) {
  const regions = await getRegions(versionGroup);

  if (!regions || regions.length < 2) {
    return null;
  }

  return (
    <PageLayoutSection className="mt-0 mb-2">
      <RegionTab regions={regions} />
    </PageLayoutSection>
  );
}
