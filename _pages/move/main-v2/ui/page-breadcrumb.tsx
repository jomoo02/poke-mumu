import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/_shared/ui/breadcrumb';

import { PAGE_TITLE } from '../config';

// 기술 목록 경로: [기술]. 제목 자리를 대신하므로 글자를 키운다 (h1은 페이지에 sr-only로 남는다)
// @breadcrumb 슬롯(app/(app)/@breadcrumb/move)이 그린다
export default function MoveBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage className="text-base font-semibold">
            {PAGE_TITLE}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
