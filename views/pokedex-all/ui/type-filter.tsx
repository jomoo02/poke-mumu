// views/pokedex-all/ui/type-filter-trigger.tsx
'use client';

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

import { type Type } from '@/entities/type/model';

import { useControlContext, useResultContext } from '../model-v2/pokedex';
import { TypeBadge, TypeIcon } from '@/entities/type/ui';
import { cn } from '@/shared/lib/cn';
import { useState } from 'react';
import { useIsMobile } from '@/shared/model/useMobile';

interface TypeFilterTriggerProps {
  types: Type[]; // 선택 가능한 전체 타입 목록 (18종)
}

export default function TypeFilterTrigger({ types }: TypeFilterTriggerProps) {
  const [open, setOpen] = useState(false);
  const { filterTypes, toggleFilterType, resetFilterType } =
    useControlContext();

  const pokes = useResultContext();

  const isSelected = (type: Type) =>
    filterTypes.some((t) => t.identifier === type.identifier);

  const isActive = filterTypes.length > 0;
  const count = filterTypes.length;
  const isMobile = useIsMobile(640);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">타입{count > 0 ? ` ${count}` : ''}</Button>
      </SheetTrigger>
      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        className="data-[side=bottom]:max-h-[80vh] data-[side=bottom]:h-[80vh] "
      >
        <SheetHeader>
          <SheetTitle>타입 필터</SheetTitle>
          <SheetDescription className="sr-only">type filter</SheetDescription>
        </SheetHeader>
        <div className="px-5 py-1 flex flex-col gap-5 overflow-auto">
          <div className="grid grid-cols-3 gap-4 ">
            {types.map((type) => (
              <Toggle
                key={type.identifier}
                pressed={isSelected(type)}
                onPressedChange={() => toggleFilterType(type)}
                className={cn(
                  isActive
                    ? ' opacity-30 hover:opacity-70'
                    : 'hover:opacity-70',
                  isSelected(type) ? ' opacity-100 hover:opacity-100' : '',
                  'hover:bg-transparent data-[state=on]:bg-transparent p-0 justify-center',
                )}
                aria-label={type.nameKo}
              >
                <TypeBadge type={type} className="w-22 h-8.5" />
              </Toggle>
            ))}
          </div>
        </div>
        <SheetFooter>
          <div className="text-sm text-foreground/70 font-medium">
            타입 {filterTypes.length}개 선택
          </div>
          <div className="flex gap-2">
            <Button
              variant={'outline'}
              onClick={resetFilterType}
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
