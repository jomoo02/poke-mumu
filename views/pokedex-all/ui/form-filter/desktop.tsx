'use client';

import { useState } from 'react';

import { Checkbox } from '@/shared/ui/checkbox';
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/shared/ui/popover';
import { FieldGroup } from '@/shared/ui/field';
import {
  ControlTriggerButton,
  ControlField,
  ControlFieldLabel,
  ControlResetButton,
} from '@/shared/ui/control';

import { getFormTriggerText } from './lib';
import { useFormFilter, formFilterOptions } from '../../model/form-filter';

export default function FormFilterDesktop() {
  const { selectedForms, isSelectedForm, isActive, toggleForm, resetForm } =
    useFormFilter();

  const [open, setOpen] = useState(false);

  const triggerText = getFormTriggerText(selectedForms, formFilterOptions);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <ControlTriggerButton variant={isActive ? 'active' : 'default'}>
            {triggerText}
          </ControlTriggerButton>
        }
      />
      <PopoverContent>
        <PopoverHeader className="flex flex-row justify-between">
          <PopoverTitle>모습</PopoverTitle>
          <ControlResetButton onClick={resetForm} disabled={!isActive} />
        </PopoverHeader>
        <FieldGroup className="gap-x-6 gap-y-1">
          {formFilterOptions.map((form) => (
            <ControlField key={form.identifier}>
              <Checkbox
                checked={isSelectedForm(form.identifier)}
                id={`form-${form.identifier}`}
                name={`form-${form.identifier}`}
                className="cursor-pointer"
                onCheckedChange={() => toggleForm(form.identifier)}
              />
              <ControlFieldLabel htmlFor={`form-${form.identifier}`}>
                {form.label}
              </ControlFieldLabel>
            </ControlField>
          ))}
        </FieldGroup>
      </PopoverContent>
    </Popover>
  );
}
