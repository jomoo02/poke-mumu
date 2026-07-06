'use client';

import { ChevronDownIcon, RotateCwIcon } from 'lucide-react';

import type { Type } from '@/entities/type/model';
import { TypeIcon } from '@/entities/type/ui';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/shared/ui/field';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';

import { MAX_SELECTED_TYPES } from '../../model/type-filter';
import useTypeFilterView from './useTypeFilterView';

interface TypeFilterDesktopProps {
  types: Type[];
  max?: number;
}

export default function TypeFilterDesktop({
  types,
  max = MAX_SELECTED_TYPES,
}: TypeFilterDesktopProps) {
  const {
    triggerText,
    isActive,
    isDisableType,
    isSelectType,
    toggleType,
    resetType,
  } = useTypeFilterView(types, max);

  return (
    <Popover>
      <PopoverTrigger asChild>
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
      </PopoverTrigger>
      <PopoverContent align="start" className="z-1 px-0 py-3.5 pb-0 w-58">
        <div className="text-xs text-muted-foreground px-4">
          타입 (최대 {max}개)
        </div>
        <div className="flex px-4 flex-col gap-1 max-h-80 overflow-auto no-scrollbar">
          <FieldSet>
            <FieldGroup className="gap-y-1">
              {types.map((type) => (
                <Field
                  key={type.identifier}
                  orientation="horizontal"
                  className={cn(
                    'relative isolate h-10 gap-x-2.5',
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
                    <TypeIcon type={type} className="size-7 p-0.5 rounded-md" />
                  </FieldLabel>
                </Field>
              ))}
            </FieldGroup>
          </FieldSet>
        </div>
        <div className="border-t px-4">
          <div className="py-1.5">
            <Button
              onClick={resetType}
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
