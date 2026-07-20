'use client';

import {
  ControlField,
  ControlFieldLabel,
  ControlTriggerButton,
} from '@/shared/ui/control';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetFooterButton,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';

import useAbilityFilter from './useAbilityFilter';
import { useIsMobile } from '@/shared/model/useMobile';
import { SlidersHorizontalIcon } from 'lucide-react';
import { useState } from 'react';
import { FieldGroup } from '@/shared/ui/field';
import { Checkbox } from '@/shared/ui/checkbox';
import { cn } from '@/shared/lib/cn';

export function AbilityFilterSheet() {
  const {
    selectedAppearedGens,
    isChampions,
    isActive,
    toggleAppearedGen,
    toggleChampions,
    resetFilter,
    gens,
  } = useAbilityFilter();
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile(768);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <ControlTriggerButton
            size={'icon'}
            variant={isActive ? 'active' : 'default'}
          >
            <SlidersHorizontalIcon className="size-4.5" />
          </ControlTriggerButton>
        }
      />
      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        className="gap-0 data-[side=bottom]:max-h-[85dvh] group"
      >
        <SheetHeader>
          <SheetTitle>필터</SheetTitle>
          <SheetDescription>특성 필터</SheetDescription>
        </SheetHeader>
        <div className="px-6 overflow-y-auto no-scrollbar flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="text-sm font-medium text-foreground/70 group-data-[side=right]:text-foreground group-data-[side=right]:text-base group-data-[side=right]:font-semibold">
              등장
            </div>
            <FieldGroup className="gap-y-1.5 gap-x-6 grid group-data-[side=bottom]:grid-cols-2">
              {gens.map((gen) => (
                <ControlField key={gen} className="h-10.5">
                  <Checkbox
                    checked={selectedAppearedGens.has(gen)}
                    id={`gen-${gen}-sheet`}
                    name={`gen-${gen}-sheet`}
                    className="cursor-pointer"
                    onCheckedChange={() => toggleAppearedGen(gen)}
                  />
                  <ControlFieldLabel
                    htmlFor={`gen-${gen}-sheet`}
                    className="text-base"
                  >
                    {gen}세대
                  </ControlFieldLabel>
                </ControlField>
              ))}
            </FieldGroup>
          </div>
          <div className="hidden group-data-[side=right]:block w-full h-px bg-border my-0.5" />

          <div className="flex flex-col gap-2">
            <div className="text-sm font-medium text-foreground/70 group-data-[side=right]:text-foreground group-data-[side=right]:text-base group-data-[side=right]:font-semibold">
              분류
            </div>
            <FieldGroup className="gap-y-1.5 gap-x-6 grid group-data-[side=bottom]:grid-cols-2">
              <ControlField className="h-10.5">
                <Checkbox
                  checked={isChampions}
                  id={`champions-check`}
                  name={`champions-check`}
                  className="cursor-pointer"
                  onCheckedChange={() => toggleChampions(!isChampions)}
                />
                <ControlFieldLabel
                  htmlFor={`champions-check`}
                  className="text-base"
                >
                  챔피언스
                </ControlFieldLabel>
              </ControlField>
            </FieldGroup>
          </div>
        </div>
        <SheetFooter className="flex flex-row">
          <SheetFooterButton
            variant="input"
            onClick={resetFilter}
            className="flex-1/3"
          >
            초기화
          </SheetFooterButton>
          <SheetFooterButton
            variant="primary"
            onClick={() => setOpen(false)}
            className="flex-2/3"
          >
            적용하기
          </SheetFooterButton>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
