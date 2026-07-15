'use client';

import { useState } from 'react';

import { Checkbox } from '@/shared/ui/checkbox';

import { getFormTriggerText } from './lib';
import { useFormFilter, formFilterOptions } from '../../model/form-filter';
import {
  ControlField,
  ControlFieldGroup,
  ControlFieldLabel,
} from '../control/control-shared';
import {
  ControlPopover,
  ControlPopoverResetButton,
  ControlPopoverTitle,
  ControlPopoverTrigger,
  ControlPopoverBody,
  ControlPopoverHeader,
  ControlPopoverContent,
} from '../control/control-popover';

export default function FormFilterDesktop() {
  const { selectedForms, isSelectedForm, isActive, toggleForm, resetForm } =
    useFormFilter();

  const [open, setOpen] = useState(false);

  const triggerText = getFormTriggerText(selectedForms, formFilterOptions);

  return (
    <ControlPopover open={open} onOpenChange={setOpen}>
      <ControlPopoverTrigger isActive={isActive} isOpen={open}>
        {triggerText}
      </ControlPopoverTrigger>
      <ControlPopoverBody>
        <ControlPopoverHeader>
          <ControlPopoverTitle>모습</ControlPopoverTitle>
          <ControlPopoverResetButton onClick={resetForm} isActive={isActive} />
        </ControlPopoverHeader>

        <ControlPopoverContent>
          <ControlFieldGroup>
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
                  <span className="flex-1 text-md">{form.label}</span>
                </ControlFieldLabel>
              </ControlField>
            ))}
          </ControlFieldGroup>
        </ControlPopoverContent>
      </ControlPopoverBody>
    </ControlPopover>
  );
}
