import {
  Sheet,
  SheetContent,
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
} from '../model-v2/pokedex';
import { useState } from 'react';
import { useIsMobile } from '@/shared/model/useMobile';

export default function FormFilterTrigger() {
  const [open, setOpen] = useState(false);
  const { filterForms, toggleFilterForm, resetFilterForm } =
    useControlContext();
  const pokes = useResultContext();

  const count = filterForms.length;

  const isMobile = useIsMobile(640);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">모습{count > 0 ? ` ${count}` : ''}</Button>
      </SheetTrigger>
      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        className="data-[side=bottom]:max-h-[80dvh] data-[side=bottom]:h-[80dvh] "
      >
        <SheetHeader>
          <SheetTitle>모습 필터</SheetTitle>
        </SheetHeader>

        <div className="flex flex-wrap gap-2 p-5 pt-1">
          {FORM_FILTERS.map((form) => (
            <Toggle
              key={form.identifier}
              pressed={filterForms.includes(form.identifier)}
              onPressedChange={() => toggleFilterForm(form.identifier)}
            >
              {form.label}
            </Toggle>
          ))}
        </div>
        <SheetFooter>
          <div className="text-sm text-foreground/70 font-medium">
            모습 {filterForms.length}개 선택
          </div>
          <div className="flex gap-2">
            <Button
              variant={'outline'}
              onClick={resetFilterForm}
              className="h-13 text-base px-5 rounded-xl"
            >
              초기화
            </Button>
            <Button
              className="h-13 text-base flex-1 rounded-xl"
              variant={'default'}
              onClick={() => setOpen(false)}
            >
              {pokes.length.toLocaleString()}마리의 포켓몬 보기
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
