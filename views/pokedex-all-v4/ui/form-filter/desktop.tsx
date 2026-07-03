'use client';

import { ChevronDownIcon, RotateCwIcon } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/shared/ui/field';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';

import useFormFilter from '../../model/useFormFilter';

export default function FormFilterDesktop() {
  const { selected, options, toggle, reset } = useFormFilter();
  const set = new Set(selected);

  const getFormLabel = () => {
    const names = selected
      .map((id) => options.find((o) => o.identifier === id)?.label)
      .filter(Boolean);
    return names.length > 1 ? names.join(', ') : names.join('');
  };

  const triggerText =
    selected.length === 0 ? '모습' : `모습: ${getFormLabel()}`;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'secondary'}
          className=" bg-input/50 dark:bg-input/70 hover:bg-input/70 dark:hover:bg-input h-10.5"
        >
          <span>{triggerText}</span>
          <ChevronDownIcon className="size-4.5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="z-1 px-0 py-3.5 pb-0 w-58">
        <div className="flex flex-col gap-1 px-4 max-h-80 overflow-auto no-scrollbar">
          <FieldSet>
            <FieldGroup className="gap-y-1">
              {options.map((form) => (
                <Field
                  key={form.identifier}
                  orientation="horizontal"
                  className={cn(
                    // relative: after를 '이 행' 기준으로 배치(없으면 팝오버 전체로 잡힘).
                    // isolate: 자체 stacking context 생성 → after:-z-10이 팝오버 배경 뒤로
                    // 가라앉지 않고 '이 행 콘텐츠 뒤'에만 머묾(배경이 보이게 하는 핵심).
                    'relative isolate h-10 gap-x-2.5',
                    // 하이라이트를 콘텐츠 뒤(-z-10)에, 좌우로 8px 더 크게.
                    // -inset-x-2(8px) ≤ 컨테이너 px-3(12px)라 overflow에 안 잘림.
                    'after:absolute hover:after:bg-muted after:inset-y-0 after:-inset-x-2 after:-z-10 after:rounded-lg',
                  )}
                >
                  <Checkbox
                    checked={set.has(form.identifier)}
                    id={`${form.identifier}`}
                    name={`${form.identifier}`}
                    className="cursor-pointer"
                    onCheckedChange={() => toggle(form.identifier)}
                  />
                  <FieldLabel
                    htmlFor={`${form.identifier}`}
                    className="font-medium cursor-pointer h-full"
                  >
                    <span className="flex-1 text-md">{form.label}</span>
                  </FieldLabel>
                </Field>
              ))}
            </FieldGroup>
          </FieldSet>
        </div>
        <div className="border-t px-4">
          <div className="py-1.5">
            <Button
              onClick={reset}
              variant={'ghost'}
              className="h-8 text-foreground/70 px-2 gap-2 -mx-2"
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
