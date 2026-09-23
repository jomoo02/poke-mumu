import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/shared/ui/breadcrumb';

export default function PokedexBreadcrumb() {
  return (
    <Breadcrumb className="flex-1">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>도감</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
