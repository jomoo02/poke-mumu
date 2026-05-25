import {
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/widgets/breadcrumbs/ui/breadcrumb';

export default function NaturePageBreadcrumbs() {
  return (
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>성격</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  );
}
