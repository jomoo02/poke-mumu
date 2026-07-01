import { ChevronDownIcon, RotateCwIcon } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/shared/ui/field';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';

export const FORM_FILTERS = [
  { identifier: 'mega', label: '메가진화' },
  { identifier: 'alola', label: '알로라의 모습' },
  { identifier: 'galar', label: '가라르의 모습' },
  { identifier: 'hisui', label: '히스이의 모습' },
] as const;

export type FormIdentifier = (typeof FORM_FILTERS)[number]['identifier'];

interface FormFilterProps {
  selected: string[];
  onToggle: (identifier: string) => void;
  onReset: () => void;
}

export default function FormFilter({
  selected,
  onToggle,
  onReset,
}: FormFilterProps) {
  const set = new Set(selected);

  const getFormLabel = () => {
    const names = selected
      .map(
        (identifier) =>
          FORM_FILTERS.find((type) => type.identifier === identifier)?.label,
      )
      .filter((name) => name);

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
          <span className="">{triggerText}</span>
          <ChevronDownIcon className="size-4.5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="z-1 px-0 pb-0 w-58">
        <div className="flex flex-col gap-1 px-2 max-h-80 overflow-auto no-scrollbar">
          <FieldSet>
            <FieldGroup className="gap-y-1">
              {FORM_FILTERS.map((form) => {
                return (
                  <Field
                    key={form.identifier}
                    orientation="horizontal"
                    className={cn(
                      'gap-x-2.5 h-10.5 rounded-xl pl-3 hover:bg-muted',
                    )}
                  >
                    <Checkbox
                      checked={set.has(form.identifier)}
                      id={`${form.identifier}`}
                      name={`${form.identifier}`}
                      className="cursor-pointer"
                      onCheckedChange={() => onToggle(form.identifier)}
                    />
                    <FieldLabel
                      htmlFor={`${form.identifier}`}
                      className="font-medium cursor-pointer pr-3 h-full"
                    >
                      <span className="flex-1 text-md">{form.label}</span>
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
