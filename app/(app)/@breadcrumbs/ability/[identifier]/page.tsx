import {
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/ui/breadcrumb';
import { getAbilityName } from '@/widgets/breadcrumbs/api';

export default async function AbilityIdentifierPageBreadcrumbs({
  params,
}: PageProps<'/ability/[identifier]'>) {
  const { identifier } = await params;
  const name = await getAbilityName(identifier);

  return (
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/ability">특성</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>{name}</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  );
}
