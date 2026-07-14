import { useState } from 'react';

import { cn } from '@/shared/lib/cn';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

// 모바일 콘텐츠: 페이지 점프 Select(이전/다음 화살표는 상위 index가 공통 렌더).
export default function MobilePagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  const [open, setOpen] = useState(false);

  return (
    <Select
      open={open}
      onOpenChange={setOpen}
      value={String(page)}
      onValueChange={(value) => onChange(Number(value))}
    >
      <SelectTrigger
        aria-label="페이지 선택"
        className={cn(
          'w-full min-h-10.5',
          'cursor-pointer bg-input/50 dark:bg-input/70 hover:bg-input/70 dark:hover:bg-input',
        )}
      >
        <SelectValue>{`${page} / ${totalPages} Page`}</SelectValue>
      </SelectTrigger>
      <SelectContent
        className="no-scrollbar max-h-70"
        alignItemWithTrigger={false}
      >
        <SelectGroup>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <SelectItem
                key={pageNumber}
                value={String(pageNumber)}
                className="h-10.5 cursor-pointer"
              >
                {pageNumber} Page
              </SelectItem>
            ),
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
