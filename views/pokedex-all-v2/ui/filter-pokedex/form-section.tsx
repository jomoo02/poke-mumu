import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';
import { Button } from '@/shared/ui/button';
import { Toggle } from '@/shared/ui/toggle';

import {
  useControlContext,
  FORM_FILTERS,
  useResultContext,
} from '../../model-v2/pokedex';
import { useState } from 'react';
import { useIsMobile } from '@/shared/model/useMobile';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

export default function FormSection() {
  const [open, setOpen] = useState(true);
  const { filterForms, toggleFilterForm, resetFilterForm } =
    useControlContext();
  const pokes = useResultContext();

  const count = filterForms.length;

  const isMobile = useIsMobile(640);

  return (
    <div>
      <Button
        variant={'ghost'}
        onClick={() => setOpen((prev) => !prev)}
        className="text-lg font-medium w-full justify-between px-1 hover:bg-transparent rounded-md dark:hover:bg-transparent"
      >
        <span>모습</span>
        <ChevronDownIcon
          className={cn(
            'size-5.5 transform duration-250',
            open ? 'rotate-180' : '',
          )}
        />
      </Button>
      {open && (
        <div className="flex flex-wrap gap-3 mt-4">
          {FORM_FILTERS.map((form) => (
            <Toggle
              key={form.identifier}
              pressed={filterForms.includes(form.identifier)}
              onPressedChange={() => toggleFilterForm(form.identifier)}
              className=" aria-pressed:bg-input/70 border hover:bg-input/70"
            >
              {form.label}
            </Toggle>
          ))}
        </div>
      )}
    </div>
  );
}
