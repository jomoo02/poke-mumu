import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/shared/ui/breadcrumb';

export default function AbilityBreadcrumb() {
  return (
    <Breadcrumb className="flex-1">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>특성</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
