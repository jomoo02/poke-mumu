import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

import { useState } from 'react';
import { cn } from '@/shared/lib/cn';

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
    <div className="flex justify-between gap-2">
      <Button
        variant={'ghost'}
        aria-label={'이전 페이지'}
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className={cn(
          'bg-input/50 dark:bg-input/70 hover:bg-input/70 dark:hover:bg-input h-10.5 pl-3 pr-4.5',
        )}
      >
        <ChevronLeftIcon className="size-4.5" />
        이전
      </Button>
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
          <SelectValue className="">{`${page} / ${totalPages} Page`}</SelectValue>
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
      <Button
        variant={'ghost'}
        aria-label={'다음 페이지'}
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className=" cursor-pointer bg-input/50 dark:bg-input/70 hover:bg-input/70 dark:hover:bg-input h-10.5 pr-3 pl-4.5"
      >
        다음
        <ChevronRightIcon className="size-4.5" />
      </Button>
    </div>
  );
}
