// views/pokedex-all/ui/sort-trigger.tsx
'use client';

import { useState } from 'react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet'; // 실제 shadcn 경로에 맞게
import { Button } from '@/shared/ui/button';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import { Label } from '@/shared/ui/label';

import {
  useControlContext,
  getSortOptions,
  type SortOptionItem,
  getSortLabel,
} from '../model-v2/pokedex';
import { useIsMobile } from '@/shared/model/useMobile';

const SORT_OPTIONS = getSortOptions();

export default function SortTrigger() {
  const { sort, changeSort } = useControlContext();
  const [open, setOpen] = useState(false);

  // 현재 sort에 해당하는 옵션의 value (라디오 선택 표시용)
  const currentValue = `${sort.key}-${sort.direction}`;

  const handleSelect = (value: string) => {
    const option = SORT_OPTIONS.find((o) => o.value === value);
    if (!option) return;
    changeSort({ key: option.key, direction: option.direction });
    // setOpen(false); // 정렬은 택1이라 선택 즉시 닫기
  };
  const isMobile = useIsMobile(640);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">{getSortLabel(sort)}</Button>
      </SheetTrigger>
      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        className="data-[side=bottom]:max-h-[80vh] data-[side=bottom]:h-[80vh] "
      >
        <SheetHeader>
          <SheetTitle>정렬</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <div className=" overflow-auto p-2 pt-0 mb-5 ">
          <RadioGroup
            value={currentValue}
            onValueChange={handleSelect}
            className="gap-1"
          >
            {SORT_OPTIONS.map((option: SortOptionItem) => (
              <Label
                key={option.value}
                htmlFor={option.value}
                className="flex items-center gap-3 hover:bg-accent text-base px-3 py-2.5 rounded-xl"
              >
                <RadioGroupItem id={option.value} value={option.value} />
                {option.label}
              </Label>
            ))}
          </RadioGroup>
        </div>
      </SheetContent>
    </Sheet>
  );
}
