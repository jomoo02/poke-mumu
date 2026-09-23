'use client';

import { ControlRadioGroupLabel } from '@/_shared/ui/control';
import { RadioGroup, RadioGroupItem } from '@/_shared/ui/radio-group';

import { SORT_OPTIONS, getSortLabel } from '../../model/ability-sort';

interface AbilitySortOptionsProps {
  value: string;
  onValueChange: (id: string) => void;
  className?: string;
  itemClassName?: string;
}

export default function AbilitySortOptions({
  value,
  onValueChange,
  className,
  itemClassName,
}: AbilitySortOptionsProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onValueChange}
      className={className}
    >
      {SORT_OPTIONS.map((option) => (
        <ControlRadioGroupLabel
          key={option.id}
          htmlFor={option.id}
          className={itemClassName}
        >
          <RadioGroupItem id={option.id} value={option.id} />
          {getSortLabel(option)}
        </ControlRadioGroupLabel>
      ))}
    </RadioGroup>
  );
}
