'use client';

import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

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

import useFormFilterView from './useFormFilterView';

export default function FormFilterMobile() {
  const [open, setOpen] = useState(false);

  const {
    toggleForm,
    resetForm,
    checkSelectedForm,
    isActive,
    triggerText,
    formFilterOptions,
  } = useFormFilterView();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant={isActive ? 'default' : 'secondary'}
          className={cn(
            'h-10.5 transition-none',
            isActive
              ? 'bg-primary hover:bg-primary/80 text-primary-foreground active:bg-primary/80'
              : 'bg-input/50 dark:bg-input/70 hover:bg-input/70 dark:hover:bg-input',
          )}
        >
          <span>{triggerText}</span>
          <ChevronDownIcon className="size-4.5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="gap-0" showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>모습</SheetTitle>
          <SheetDescription className="sr-only">모습 필터</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col px-6 max-h-[60dvh] overflow-auto no-scrollbar flex-1">
          <FieldSet>
            <FieldGroup className="gap-y-1.5">
              {formFilterOptions.map((form) => (
                <Field
                  key={form.identifier}
                  orientation="horizontal"
                  className={cn(
                    'gap-x-2.5 h-11',
                    'relative isolate',
                    'after:absolute after:inset-y-0 after:-inset-x-2 after:-z-10 after:rounded-lg hover:after:bg-muted',
                  )}
                >
                  <Checkbox
                    checked={checkSelectedForm(form.identifier)}
                    id={`form-${form.identifier}`}
                    name={`form-${form.identifier}`}
                    className="cursor-pointer"
                    onCheckedChange={() => toggleForm(form.identifier)}
                  />
                  <FieldLabel
                    htmlFor={`form-${form.identifier}`}
                    className="font-medium cursor-pointer h-full"
                  >
                    <span className="flex-1 text-md">{form.label}</span>
                  </FieldLabel>
                </Field>
              ))}
            </FieldGroup>
          </FieldSet>
        </div>

        <SheetFooter>
          <div className="flex gap-3">
            <Button
              onClick={resetForm}
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
