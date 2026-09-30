'use client';

import { cn } from '@/_shared/lib/cn';
import { ControlRadioGroupLabel } from '@/_shared/ui/control';
import { RadioGroup, RadioGroupItem } from '@/_shared/ui/radio-group';

import { SORT_OPTIONS, type SortKey } from '../../model/move-sort';

interface SortKeyOptionsProps {
  value: SortKey;
  onValueChange: (key: SortKey) => void;
  className?: string;
  itemClassName?: string;
}

// popover(desktop)·sheet(mobile) 공용 '정렬 기준' 라디오 그룹.
// 방향은 트리거 옆 토글 버튼이 맡는다
export default function SortKeyOptions({
  value,
  onValueChange,
  className,
  itemClassName,
}: SortKeyOptionsProps) {
  // RadioGroup 값은 문자열로 오므로 알려진 값일 때만 넘긴다
  const handleValueChange = (next: string) => {
    const option = SORT_OPTIONS.find((candidate) => candidate.key === next);

    if (option) {
      onValueChange(option.key);
    }
  };

  return (
    <RadioGroup
      aria-label="정렬 기준"
      value={value}
      onValueChange={handleValueChange}
      className={cn('grid-cols-2', className)}
    >
      {SORT_OPTIONS.map((option) => {
        const id = `sort-key-${option.key}`;

        return (
          <ControlRadioGroupLabel
            key={option.key}
            htmlFor={id}
            className={itemClassName}
          >
            <RadioGroupItem id={id} value={option.key} />
            {option.label}
          </ControlRadioGroupLabel>
        );
      })}
    </RadioGroup>
  );
}
