import { ChevronDownIcon, RotateCwIcon } from 'lucide-react';

import { Type } from '@/entities/type/model';
import { TypeIcon } from '@/entities/type/ui';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/shared/ui/field';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';

interface TypeFilterProps {
  types: Type[];
  selected: string[];
  onToggle: (identifier: string) => void;
  onReset: () => void;
  max?: number;
}

export default function TypeFilter({
  types,
  selected,
  onToggle,
  onReset,
  max = 2,
}: TypeFilterProps) {
  const set = new Set(selected);
  const reachedMax = selected.length >= max;

  const getTypeNameKo = () => {
    const names = selected
      .map(
        (identifier) =>
          types.find((type) => type.identifier === identifier)?.nameKo,
      )
      .filter((name) => name);

    return names.length > 1 ? names.join(', ') : names.join('');
  };

  const triggerText =
    selected.length === 0 ? '타입' : `타입: ${getTypeNameKo()}`;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'secondary'}
          className=" bg-input/50 dark:bg-input/70 hover:bg-input/70 dark:hover:bg-input h-10.5"
        >
          <span className="px-">{triggerText}</span>
          <ChevronDownIcon className="size-4.5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="z-1 px-0 pb-0 w-58">
        <div className="flex flex-col gap-1 px-2 max-h-80 overflow-auto no-scrollbar">
          <FieldSet>
            <FieldGroup className="gap-y-1">
              {types.map((type) => {
                const active = set.has(type.identifier);
                const disabled = !active && reachedMax;
                return (
                  <Field
                    key={type.identifier}
                    orientation="horizontal"
                    className={cn(
                      'gap-x-2.5 h-10 rounded-lg pl-3',
                      disabled ? '' : ' hover:bg-muted',
                    )}
                  >
                    <Checkbox
                      checked={set.has(type.identifier)}
                      id={`${type.identifier}`}
                      name={`${type.identifier}`}
                      disabled={disabled}
                      className="cursor-pointer"
                      onCheckedChange={() => onToggle(type.identifier)}
                    />
                    <FieldLabel
                      htmlFor={`${type.identifier}`}
                      className="font-medium cursor-pointer pr-3 h-full"
                    >
                      <span className="flex-1 text-md">{type.nameKo}</span>
                      <TypeIcon
                        type={type}
                        className="size-7 p-0.5 rounded-md"
                      />
                    </FieldLabel>
                  </Field>
                );
              })}
            </FieldGroup>
          </FieldSet>
        </div>
        <div className="border-t px-2">
          <div className="py-1.5">
            <Button
              onClick={onReset}
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
