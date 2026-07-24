'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

import {
  SEARCH_PARAMS,
  SORT_OPTIONS,
  DEFAULT_SORT,
  VALID_SORT_VALUES,
} from '../../config';

export default function MoveSort() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const raw = searchParams.get(SEARCH_PARAMS.SORT) ?? DEFAULT_SORT;
  const value = VALID_SORT_VALUES.has(raw) ? raw : DEFAULT_SORT;

  const handleValueChange = (next: string | null) => {
    if (!next) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (next === DEFAULT_SORT) {
      params.delete(SEARCH_PARAMS.SORT);
    } else {
      params.set(SEARCH_PARAMS.SORT, next);
    }

    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  return (
    <Select value={value} onValueChange={handleValueChange}>
      <SelectTrigger
        aria-label="정렬 기준"
        className="h-10.5 min-h-10.5 max-h-10.5 shrink-0 bg-input/50 dark:bg-input/70 hover:bg-input/70 dark:hover:bg-input w-36"
      >
        <SelectValue>
          {(current: string) =>
            SORT_OPTIONS.find((option) => option.value === current)?.label ??
            SORT_OPTIONS[0].label
          }
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {SORT_OPTIONS.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="h-10.5 cursor-pointer"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
