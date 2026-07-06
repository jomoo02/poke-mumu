'use client';

import { ChevronDownIcon, RotateCwIcon } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/shared/ui/field';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';

import useFormFilterView from './useFormFilterView';

export default function FormFilterDesktop() {
  const {
    toggleForm,
    resetForm,
    checkSelectedForm,
    isActive,
    triggerText,
    formFilterOptions,
  } = useFormFilterView();

  return (
    <Popover>
      <PopoverTrigger asChild>
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
      </PopoverTrigger>
      <PopoverContent align="start" className="z-1 px-0 py-3.5 pb-0 w-58">
        <div className="text-xs text-muted-foreground px-4">모습</div>
        <div className="flex flex-col gap-1 px-4 max-h-80 overflow-auto no-scrollbar">
          <FieldSet>
            <FieldGroup className="gap-y-1">
              {formFilterOptions.map((form) => (
                <Field
                  key={form.identifier}
                  orientation="horizontal"
                  className={cn(
                    'relative isolate h-10 gap-x-2.5',
                    'after:absolute hover:after:bg-muted after:inset-y-0 after:-inset-x-2 after:-z-10 after:rounded-lg',
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
        <div className="border-t px-4">
          <div className="py-1.5">
            <Button
              onClick={resetForm}
              variant={'ghost'}
              className="h-8 text-foreground/70 px-2 gap-2 -mx-2"
            >
              <RotateCwIcon className="size-3.5" />
              초기화
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
