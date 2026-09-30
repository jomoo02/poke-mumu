'use client';

import { Checkbox } from '@/_shared/ui/checkbox';
import { FieldGroup } from '@/_shared/ui/field';
import { ControlField, ControlFieldLabel } from '@/_shared/ui/control';

import type { MoveFilterConfig } from './filter-config';

interface MoveFilterOptionsProps {
  config: MoveFilterConfig;
  isSelected: (identifier: string) => boolean;
  onToggle: (identifier: string) => void;
  className?: string;
  itemClassName?: string;
}

// popover(desktop)·sheet(mobile) 공용 체크박스 목록. 간격·높이만 호출부가 정한다
export default function MoveFilterOptions({
  config,
  isSelected,
  onToggle,
  className,
  itemClassName,
}: MoveFilterOptionsProps) {
  return (
    <FieldGroup className={className}>
      {config.items.map((item) => {
        // popover·sheet는 열린 쪽만 그려지므로 id가 겹치지 않는다
        const id = `${config.paramKey}-${item.identifier}`;

        return (
          <ControlField key={item.identifier} className={itemClassName}>
            <Checkbox
              id={id}
              name={id}
              checked={isSelected(item.identifier)}
              className="cursor-pointer"
              onCheckedChange={() => onToggle(item.identifier)}
            />
            <ControlFieldLabel htmlFor={id}>
              {item.icon}
              <span className="flex-1">{item.label}</span>
            </ControlFieldLabel>
          </ControlField>
        );
      })}
    </FieldGroup>
  );
}
