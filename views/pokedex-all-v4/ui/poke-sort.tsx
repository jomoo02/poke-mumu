import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  RotateCwIcon,
} from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { Label } from '@/shared/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';

import useSearchParamsState from '../model/useSearchParamsState';
import {
  DEFAULT_SORT_DIR,
  DEFAULT_SORT_KEY,
  parseSort,
  SORT_OPTIONS,
  type SortDir,
} from '../model/sort';

export default function PokeSort() {
  const { searchParams, update } = useSearchParamsState();
  const { key, dir } = parseSort(searchParams);

  const currentLabel =
    SORT_OPTIONS.find((o) => o.key === key)?.label ?? SORT_OPTIONS[0].label;

  // 정렬 키만 변경. 방향(dir)은 건드리지 않아 그대로 유지된다.
  // 기본값(도감번호)이면 파라미터를 제거해 "기본 상태 = 파라미터 없음"으로 정규화.
  const changeKey = (nextKey: string) => {
    const opt = SORT_OPTIONS.find((o) => o.key === nextKey);
    if (!opt) return;
    update({ sort: nextKey === DEFAULT_SORT_KEY ? null : nextKey });
  };

  // 정렬 방향만 변경. 키(sort)와 독립적으로 관리된다.
  // 기본값(오름차순)이면 파라미터를 제거한다.
  const changeDir = (nextDir: SortDir) =>
    update({ dir: nextDir === DEFAULT_SORT_DIR ? null : nextDir });

  // sort/dir 모두 제거 → 기본값(도감번호 · 오름차순)으로 복귀.
  const handleResetClick = () => update({ sort: null, dir: null });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'secondary'}
          className=" bg-input/50 dark:bg-input/70 hover:bg-input/70 dark:hover:bg-input h-10.5"
        >
          <span>정렬: {currentLabel}</span>
          {dir === 'asc' ? (
            <ArrowUpIcon className="size-4" />
          ) : (
            <ArrowDownIcon className="size-4" />
          )}
          <ChevronDownIcon className="size-4.5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="z-1 px-0 pb-0 w-58">
        <div className="px-5 flex justify-between items-center">
          <div className="text-sm font-medium">정렬 방향</div>
          <div className="inline-flex">
            <Button
              onClick={() => changeDir('asc')}
              aria-pressed={dir === 'asc'}
              variant={'outline'}
              className={cn(
                'rounded-lg h-9 w-9.5 border-r rounded-r-none',
                dir === 'asc'
                  ? 'bg-muted dark:bg-input hover:bg-muted dark:hover:bg-input'
                  : 'bg-transparent hover:bg-muted/70',
              )}
            >
              <ArrowUpIcon className="size-4.5" />
            </Button>
            <Button
              onClick={() => changeDir('desc')}
              aria-pressed={dir === 'desc'}
              variant={'outline'}
              className={cn(
                'rounded-lg h-9 w-9.5 border-l-0 rounded-l-none',
                dir === 'desc'
                  ? 'bg-muted dark:bg-input hover:bg-muted dark:hover:bg-input'
                  : 'bg-transparent hover:bg-muted/70',
              )}
            >
              <ArrowDownIcon className="size-4.5" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-1 px-2 max-h-80 overflow-auto no-scrollbar">
          <RadioGroup value={key} onValueChange={changeKey} className="gap-1">
            {SORT_OPTIONS.map((option) => (
              <Label
                key={option.key}
                htmlFor={option.key}
                className="flex items-center gap-2.5 hover:bg-accent px-3 h-10 rounded-lg text-md"
              >
                <RadioGroupItem id={option.key} value={option.key} />
                {option.label}
              </Label>
            ))}
          </RadioGroup>
        </div>
        <div className="border-t px-2">
          <div className="py-1.5">
            <Button
              onClick={handleResetClick}
              variant={'ghost'}
              className="h-8 text-foreground/70 px-3 gap-2"
            >
              <RotateCwIcon className="size-4" />
              초기화
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
