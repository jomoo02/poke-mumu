import { Suspense } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/ui/breadcrumb';
import { getVersionGroupContent } from '@/entities/version-group/api';
import { EllipseIcon, EllipsisIcon } from 'lucide-react';

export default async function PokedexGameVersionGroupBreadcrumb(
  props: PageProps<'/pokedex/game/[versionGroup]/[[...region]]'>,
) {
  return (
    <Suspense fallback={<Loading />}>
      <PageBreadcrumb params={props.params} />
    </Suspense>
  );
}

function Loading() {
  return (
    <Breadcrumb className="flex-1 overflow-hidden -m-1 p-1">
      <BreadcrumbList className="flex-nowrap">
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/pokedex">도감</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/pokedex/game" className="hidden md:block">
            지역도감
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
      </BreadcrumbList>
    </Breadcrumb>
  );
}

async function PageBreadcrumb({
  params,
}: {
  params: Promise<{ versionGroup: string }>;
}) {
  const { versionGroup } = await params;

  const { nameKo } = await getVersionGroupContent(versionGroup);

  return (
    <Breadcrumb className="flex-1 overflow-hidden -m-1 p-1">
      <BreadcrumbList className="flex-nowrap">
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/pokedex">도감</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/pokedex/game" className="hidden md:block">
            지역도감
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem className="overflow-hidden">
          <BreadcrumbPage className="truncate">{nameKo}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
