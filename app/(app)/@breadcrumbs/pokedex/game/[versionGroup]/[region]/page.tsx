import {
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/ui/breadcrumb';

import {
  getVersionGroupKo,
  getRegionKo,
} from '@/widgets/pokedex-version-group-layout/api';

export default async function AbilityIdentifierPageBreadcrumbs({
  params,
}: PageProps<'/pokedex/game/[versionGroup]/[region]'>) {
  const { versionGroup, region } = await params;

  const [versionGroupKo, regionKo] = await Promise.all([
    getVersionGroupKo(versionGroup),
    getRegionKo(versionGroup, region),
  ]);

  return (
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/pokedex">도감</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href={`/pokedex/game/${versionGroup}`}>
          {versionGroupKo}
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>{regionKo}</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  );
}
