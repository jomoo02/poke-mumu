import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  RotateCwIcon,
} from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/shared/ui/field';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import { useSearchParams } from 'next/navigation';
import useSearchParamsState from '../model/useSearchParamsState';
import { parseSort, SORT_OPTIONS } from '../model/sort';
import { Label } from '@/shared/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';

export const FORM_FILTERS = [
  { identifier: 'mega', label: '메가진화' },
  { identifier: 'alola', label: '알로라의 모습' },
  { identifier: 'galar', label: '가라르의 모습' },
  { identifier: 'hisui', label: '히스이의 모습' },
] as const;

export type FormIdentifier = (typeof FORM_FILTERS)[number]['identifier'];

interface FormFilterProps {
  // onReset: () => void;
}

export default function PokeSort({}: FormFilterProps) {
  const { searchParams, update } = useSearchParamsState();
  const { key, dir } = parseSort(searchParams);

  // 키 변경 시 방향도 그 키의 defaultDir로 동반 갱신(이전 방향 잔류 방지).
  const changeKey = (nextKey: string) => {
    const opt = SORT_OPTIONS.find((o) => o.key === nextKey);
    if (!opt) return;
    update({ sort_key: nextKey, sort_dir: opt.defaultDir });
  };

  // 첫 진입 시 URL에 sortKey가 없으면 parseSort가 sortDir을 무시하므로
  // 방향만 바꿀 때도 현재 키를 함께 써준다.
  const toggleDir = () =>
    update({ sort_key: key, sort_dir: dir === 'asc' ? 'desc' : 'asc' });

  const handleResetClick = () => {
    update({ sort_key: null });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'secondary'}
          className=" bg-input/50 dark:bg-input/70 hover:bg-input/70 dark:hover:bg-input h-10.5"
        >
          정렬
          {/* <span className="">{triggerText}</span> */}
          <ChevronDownIcon className="size-4.5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="z-1 px-0 pb-0 w-58">
        <div className="px-5 flex justify-between items-center ">
          <div className="text-sm font-medium">정렬 방향</div>
          <div className="inline-flex">
            <Button
              className="rounded-lg h-9 w-9.5 border-r rounded-r-none"
              variant={'outline'}
            >
              <ArrowUpIcon className="size-4.5" />
            </Button>
            {/* <div className="w-px h-full bg-border" /> */}
            <Button
              className="rounded-lg h-9 w-9.5 border-l-0 rounded-l-none"
              variant={'outline'}
            >
              <ArrowDownIcon className="size-4.5" />
            </Button>
          </div>
          {/* <Tabs>
            <TabsList className="grid grid-cols-2 group-data-horizontal/tabs:h-10 rounded-lg">
              <TabsTrigger value="asc" className="rounded-lg">
                <ArrowUpIcon className="size-4.5" />
              </TabsTrigger>
              <TabsTrigger value="desc" className="rounded-lg">
                <ArrowDownIcon className="size-4.5" />
              </TabsTrigger>
            </TabsList>
          </Tabs> */}
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
