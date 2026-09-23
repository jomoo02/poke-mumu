'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Pagination } from '@/shared/ui/pagination';

interface PaginationWithUrlProps {
  totalPages: number;
  pageKey?: string;
  className?: string;
  scroll?: boolean;
}
export default function PagePagination({
  totalPages,
  pageKey = 'page',
  className,
  scroll = true,
}: PaginationWithUrlProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const parsed = Number.parseInt(searchParams.get(pageKey) ?? '', 10);
  const currentPage = Number.isNaN(parsed)
    ? 1
    : Math.min(Math.max(parsed, 1), totalPages);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    // 1페이지는 파라미터 제거해서 URL 깔끔하게 (?page=1 안 남김)
    if (page <= 1) {
      params.delete(pageKey);
    } else {
      params.set(pageKey, String(page));
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll });
  };
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      className={className}
    />
  );
}
