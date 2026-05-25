import {
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/widgets/breadcrumbs/ui/breadcrumb';

export default function AbilityPageBreadcrumbs() {
  return (
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>특성</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  );
}
