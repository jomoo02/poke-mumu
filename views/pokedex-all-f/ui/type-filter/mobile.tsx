'use client';

import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

import type { Type } from '@/entities/type/model';
import { TypeIcon } from '@/entities/type/ui';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/shared/ui/field';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';

import { MAX_SELECTED_TYPES } from '../../model/type-filter';
import useTypeFilterView from './useTypeFilterView';

interface TypeFilterMobileProps {
  types: Type[];
  max?: number;
}

export default function TypeFilterMobile({
  types,
  max = MAX_SELECTED_TYPES,
}: TypeFilterMobileProps) {
  const [open, setOpen] = useState(false);
  const {
    triggerText,
    isActive,
    isDisableType,
    isSelectType,
    toggleType,
    resetType,
  } = useTypeFilterView(types, max);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant={isActive ? 'default' : 'secondary'}
          className={cn(
            'h-10.5 transition-none',
            isActive
              ? 'bg-primary hover:bg-primary/70 text-primary-foreground active:bg-primary/70'
              : 'bg-input/50 dark:bg-input/70 hover:bg-input/70 dark:hover:bg-input',
          )}
        >
          <span>{triggerText}</span>
          <ChevronDownIcon className="size-4.5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="gap-0" showCloseButton={false}>
        <SheetHeader className="">
          <SheetTitle>타입</SheetTitle>
          <SheetDescription>최대 {max}개까지 선택 가능</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col px-6 max-h-[60dvh] overflow-auto no-scrollbar flex-1">
          <FieldSet>
            <FieldGroup className="gap-y-1.5 gap-x-6 grid grid-cols-2">
              {types.map((type) => (
                <Field
                  key={type.identifier}
                  orientation="horizontal"
                  className={cn(
                    'gap-x-2.5 h-11',
                    'relative isolate',
                    'after:absolute after:inset-y-0 after:-inset-x-2 after:-z-10 after:rounded-lg',
                    isDisableType(type.identifier)
                      ? ''
                      : 'hover:after:bg-muted',
                  )}
                >
                  <Checkbox
                    checked={isSelectType(type.identifier)}
                    id={`type-${type.identifier}`}
                    name={`type-${type.identifier}`}
                    disabled={isDisableType(type.identifier)}
                    className="cursor-pointer"
                    onCheckedChange={() => toggleType(type.identifier)}
                  />
                  <FieldLabel
                    htmlFor={`type-${type.identifier}`}
                    className="font-medium cursor-pointer h-full"
                  >
                    <span className="flex-1 text-md">{type.nameKo}</span>
                    <TypeIcon
                      type={type}
                      className="size-7 p-0.5 rounded-md shrink-0"
                    />
                  </FieldLabel>
                </Field>
              ))}
            </FieldGroup>
          </FieldSet>
        </div>
        <SheetFooter>
          <div className="flex gap-3">
            <Button
              onClick={resetType}
              className="rounded-lg text-base h-12 flex-1/3"
              variant={'outline'}
            >
              초기화
            </Button>
            <Button
              className="flex-2/3 rounded-lg text-base h-12"
              onClick={() => setOpen(false)}
            >
              완료
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
