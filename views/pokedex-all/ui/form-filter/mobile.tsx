'use client';

import { useState } from 'react';

import { Checkbox } from '@/shared/ui/checkbox';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooterButton,
} from '@/shared/ui/sheet';
import {
  ControlTriggerButton,
  ControlField,
  ControlFieldLabel,
} from '@/shared/ui/control';
import { FieldGroup } from '@/shared/ui/field';

import { useFormFilter, formFilterOptions } from '../../model/form-filter';
import { getFormTriggerText } from './lib';

export default function FormFilterMobile() {
  const [open, setOpen] = useState(false);

  const { selectedForms, isSelectedForm, isActive, toggleForm, resetForm } =
    useFormFilter();

  const triggerText = getFormTriggerText(selectedForms, formFilterOptions);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <ControlTriggerButton variant={isActive ? 'active' : 'default'}>
            {triggerText}
          </ControlTriggerButton>
        }
      />
      <SheetContent side={'bottom'} className="gap-0 max-h-[85dvh]">
        <SheetHeader>
          <SheetTitle>모습</SheetTitle>
          <SheetDescription>포켓몬의 특정 모습</SheetDescription>
        </SheetHeader>
        <div className="px-6 overflow-y-auto no-scrollbar">
          <FieldGroup className="gap-y-1.5">
            {formFilterOptions.map((form) => (
              <ControlField key={form.identifier} className="h-11">
                <Checkbox
                  checked={isSelectedForm(form.identifier)}
                  id={`form-${form.identifier}`}
                  name={`form-${form.identifier}`}
                  className="cursor-pointer"
                  onCheckedChange={() => toggleForm(form.identifier)}
                />
                <ControlFieldLabel htmlFor={`form-${form.identifier}`}>
                  <span className="flex-1 text-md">{form.label}</span>
                </ControlFieldLabel>
              </ControlField>
            ))}
          </FieldGroup>
        </div>
        <SheetFooter className="flex flex-row">
          <SheetFooterButton
            variant={'input'}
            onClick={resetForm}
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
