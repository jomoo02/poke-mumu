'use client';

import { useState } from 'react';
import { SlidersHorizontalIcon } from 'lucide-react';

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
import TypeSection from './type-section';
import { Type } from '@/entities/type/model';
import FormSection from './form-section';
import { useControlContext, useResultContext } from '../../model-v2/pokedex';

interface FilterPokedexProps {
  types: Type[];
}

export default function FilterPokedex({ types }: FilterPokedexProps) {
  const [open, setOpen] = useState(false);

  const { resetFilters } = useControlContext();
  const pokes = useResultContext();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="secondary"
          className="h-11 gap-2 px-4 bg-input/50 dark:bg-input/70 dark:hover:bg-input hover:bg-input/70 active:bg-input"
        >
          <SlidersHorizontalIcon className="size-4.5" />
          필터
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader className="pb-2">
          <SheetTitle>필터</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="px-5 flex flex-col gap-5 no-scrollbar overflow-scroll divide-y">
          <TypeSection types={types} />

          <FormSection />
        </div>

        <SheetFooter>
          <div className="flex gap-2">
            <Button
              className="h-12 w-22 rounded-2xl"
              variant={'outline'}
              onClick={resetFilters}
            >
              초기화
            </Button>
            <Button
              className="h-12 flex-1 rounded-2xl"
              onClick={() => setOpen(false)}
            >
              {pokes.length}마리 포켓몬 보기
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
