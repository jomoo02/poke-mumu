import MobilePagination from './mobile';
import DesktopPagination from './desktop';
import { Button } from '@/shared/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

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
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="페이지 이동"
      className="flex gap-2 items-center justify-between"
    >
      <Button
        variant="ghost"
        aria-label="이전 페이지"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className={cn(
          'h-10.5 pl-3 pr-4.5 shrink-0 cursor-pointer',
          ' bg-input/50 dark:bg-input/70 hover:bg-input/70 dark:hover:bg-input',
        )}
      >
        <ChevronLeftIcon className="size-4.5" />
        이전
      </Button>

      <div className="flex-1 sm:hidden">
        <MobilePagination
          page={page}
          totalPages={totalPages}
          onChange={onChange}
        />
      </div>
      <div className="hidden sm:block flex-1">
        <DesktopPagination
          page={page}
          totalPages={totalPages}
          onChange={onChange}
        />
      </div>

      <Button
        variant="ghost"
        aria-label="다음 페이지"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className={cn(
          'h-10.5 pl-4.5 pr-3 shrink-0 cursor-pointer',
          'bg-input/50 dark:bg-input/70 hover:bg-input/70 dark:hover:bg-input',
        )}
      >
        다음
        <ChevronRightIcon className="size-4.5" />
      </Button>
    </nav>
  );
}
