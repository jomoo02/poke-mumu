'use client';

import { useState } from 'react';

import { Checkbox } from '@/shared/ui/checkbox';

import { useFormFilter, formFilterOptions } from '../../model/form-filter';
import { getFormTriggerText } from './lib';
import {
  ControlField,
  ControlFieldGroup,
  ControlFieldLabel,
  ControlSheet,
  ControlSheetBody,
  ControlSheetCloseButton,
  ControlSheetContent,
  ControlSheetDescription,
  ControlSheetFooter,
  ControlSheetHeader,
  ControlSheetResetButton,
  ControlSheetTitle,
  ControlSheetTrigger,
} from '../control';

export default function FormFilterMobile() {
  const [open, setOpen] = useState(false);

  const { selectedForms, isSelectedForm, isActive, toggleForm, resetForm } =
    useFormFilter();

  const triggerText = getFormTriggerText(selectedForms, formFilterOptions);

  return (
    <ControlSheet open={open} onOpenChange={setOpen}>
      <ControlSheetTrigger isActive={isActive} isOpen={open}>
        {triggerText}
      </ControlSheetTrigger>
      <ControlSheetBody>
        <ControlSheetHeader>
          <ControlSheetTitle>모습</ControlSheetTitle>
          <ControlSheetDescription>포켓몬의 특정 모습</ControlSheetDescription>
        </ControlSheetHeader>
        <ControlSheetContent>
          <ControlFieldGroup className="gap-y-1.5">
            {formFilterOptions.map((form) => (
              <ControlField key={form.identifier} className="h-11">
                <Checkbox
                  checked={isSelectedForm(form.identifier)}
                  id={`form-${form.identifier}`}
                  name={`form-${form.identifier}`}
                  className="cursor-pointer"
                  onCheckedChange={() => toggleForm(form.identifier)}
                />
                <ControlFieldLabel
                  htmlFor={`form-${form.identifier}`}
                  className="font-medium cursor-pointer h-full"
                >
                  <span className="flex-1 text-md">{form.label}</span>
                </ControlFieldLabel>
              </ControlField>
            ))}
          </ControlFieldGroup>
        </ControlSheetContent>
        <ControlSheetFooter>
          <ControlSheetResetButton onClick={resetForm} />
          <ControlSheetCloseButton onClick={() => setOpen(false)} />
        </ControlSheetFooter>
      </ControlSheetBody>
    </ControlSheet>
  );
}
