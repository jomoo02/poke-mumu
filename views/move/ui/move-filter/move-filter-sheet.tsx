'use client';

import { SlidersHorizontalIcon } from 'lucide-react';
import { useState } from 'react';

import { DamageClassIconV2 } from '@/app/entities/damage-class/ui';
import type { DamageClassEntity } from '@/app/entities/damage-class/model';
import { TypeIcon } from '@/entities/type/ui';
import type { Type } from '@/entities/type/model';
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
import { useIsMobile } from '@/shared/model/useMobile';
import { FieldGroup } from '@/shared/ui/field';
import { Checkbox } from '@/shared/ui/checkbox';

import useMoveFilter from './useMoveFilter';

interface MoveFilterSheetProps {
  types: Type[];
  damageClasses: DamageClassEntity[];
}

export function MoveFilterSheet({
  types,
  damageClasses,
}: MoveFilterSheetProps) {
  const {
    selectedTypes,
    selectedDamageClasses,
    isActive,
    toggleType,
    toggleDamageClass,
    resetFilter,
  } = useMoveFilter();

  const [open, setOpen] = useState(false);

  const isMobile = useIsMobile(768);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <ControlTriggerButton
            size={'icon'}
            className="lg:hidden w-auto"
            variant={isActive ? 'active' : 'default'}
          >
            <SlidersHorizontalIcon className="size-4.25" />
            필터
          </ControlTriggerButton>
        }
      />
      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        className="gap-0 data-[side=bottom]:max-h-[85dvh] group"
      >
        <SheetHeader>
          <SheetTitle>필터</SheetTitle>
          <SheetDescription>기술 필터</SheetDescription>
        </SheetHeader>
        <div className="px-6 overflow-y-auto no-scrollbar flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="text-sm font-medium text-foreground/70 group-data-[side=right]:text-foreground group-data-[side=right]:text-base group-data-[side=right]:font-semibold">
              타입
            </div>
            <FieldGroup className="gap-y-1.5 gap-x-6 grid grid-cols-2 group-data-[side=right]:grid-cols-2">
              {types.map((type) => (
                <ControlField key={type.identifier} className="h-10.5">
                  <Checkbox
                    checked={selectedTypes.has(type.identifier)}
                    id={`type-${type.identifier}-sheet`}
                    name={`type-${type.identifier}-sheet`}
                    className="cursor-pointer"
                    onCheckedChange={() => toggleType(type.identifier)}
                  />
                  <ControlFieldLabel
                    htmlFor={`type-${type.identifier}-sheet`}
                    className="text-md flex items-center gap-x-2"
                  >
                    <TypeIcon type={type} className="size-7 p-0.5 rounded-md" />
                    {type.nameKo}
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
            <FieldGroup className="gap-y-1.5 gap-x-6 grid grid-cols-2">
              {damageClasses.map((damageClass) => (
                <ControlField key={damageClass.identifier} className="h-10.5">
                  <Checkbox
                    checked={selectedDamageClasses.has(damageClass.identifier)}
                    id={`class-${damageClass.identifier}-sheet`}
                    name={`class-${damageClass.identifier}-sheet`}
                    className="cursor-pointer"
                    onCheckedChange={() =>
                      toggleDamageClass(damageClass.identifier)
                    }
                  />
                  <ControlFieldLabel
                    htmlFor={`class-${damageClass.identifier}-sheet`}
                    className="text-md flex items-center gap-x-2"
                  >
                    <DamageClassIconV2
                      damageClass={damageClass.identifier}
                      className="size-7 p-0.75 rounded-md"
                    />
                    {damageClass.nameKo}
                  </ControlFieldLabel>
                </ControlField>
              ))}
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
