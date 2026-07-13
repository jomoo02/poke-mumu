'use client';

import MobilePagination from './mobile';
import DesktopPagination from './desktop';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

// < sm: 모바일(Select 페이지 점프) / sm 이상: 데스크톱(폭 적응형 번호창).
export default function Pagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="페이지 이동">
      <div className="sm:hidden">
        <MobilePagination
          page={page}
          totalPages={totalPages}
          onChange={onChange}
        />
      </div>
      <div className="hidden sm:block">
        <DesktopPagination
          page={page}
          totalPages={totalPages}
          onChange={onChange}
        />
      </div>
    </nav>
  );
}
