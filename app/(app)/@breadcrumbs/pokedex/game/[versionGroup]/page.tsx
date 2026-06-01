import {
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/ui/breadcrumb';

import { getVersionGroupKo } from '@/widgets/pokedex-version-group-layout/api';

export default async function PokdexgameVersionGroupBreadcrumbs({
  params,
}: PageProps<'/pokedex/game/[versionGroup]'>) {
  const { versionGroup } = await params;
  const versionGroupKo = await getVersionGroupKo(versionGroup);

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
        <BreadcrumbPage>{versionGroupKo}</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  );
}
