import { Suspense } from 'react';
import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/ui/breadcrumb';
import { getAbility } from '@/entities/ability/api';

export default async function AbilityIdentifierBreadcrumb(
  props: PageProps<'/ability/[identifier]'>,
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
          <BreadcrumbLink href="/pokedex">특성</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
      </BreadcrumbList>
    </Breadcrumb>
  );
}

async function PageBreadcrumb({
  params,
}: {
  params: Promise<{ identifier: string }>;
}) {
  const { identifier } = await params;

  const ability = await getAbility(identifier);

  return (
    <Breadcrumb className="flex-1 overflow-hidden -m-1 p-1">
      <BreadcrumbList className="flex-nowrap">
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink render={<Link href="/ability">특성</Link>} />
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem className="overflow-hidden">
          <BreadcrumbPage className="truncate">
            {ability?.nameKo}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
