'use client';

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
        data-open={open}
        className={cn(
          'w-full min-h-10.5 max-h-10.5',
          'bg-input/50 dark:bg-input/70 hover:bg-input/70 dark:hover:bg-input',
          'group',
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
