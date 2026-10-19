'use client';

import { Fragment, type ReactElement } from 'react';
import { Select as SelectPrimitive } from '@base-ui/react/select';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
} from '@/_shared/ui/select';

import type {
  MoveSortChoice,
  MoveSortChoiceGroup,
} from '../../model/move-sort-option';

interface SortChoiceSelectProps {
  groups: readonly MoveSortChoiceGroup[];
  selectedKey: string;
  onSelect: (choice: MoveSortChoice) => void;
  trigger: ReactElement;
}

// md 이상 정렬: 셀렉트에 묶음(순서·수치)마다 제목 + 선택지, 묶음 사이 구분선
export default function SortChoiceSelect({
  groups,
  selectedKey,
  onSelect,
  trigger,
}: SortChoiceSelectProps) {
  // 값은 unknown으로 다루고 알려진 선택지일 때만 넘긴다
  const handleValueChange = (value: unknown) => {
    for (const group of groups) {
      const choice = group.choices.find((candidate) => candidate.key === value);
      if (choice) {
        onSelect(choice);
        return;
      }
    }
  };

  return (
    <Select value={selectedKey} onValueChange={handleValueChange}>
      <SelectPrimitive.Trigger render={trigger} />
      <SelectContent aria-label="정렬" align="end" className="w-44">
        {groups.map((group, index) => (
          <Fragment key={group.label}>
            {index > 0 && <SelectSeparator />}
            <SelectGroup>
              <SelectLabel>{group.label}</SelectLabel>
              {group.choices.map((choice) => (
                // 고르면 주소(URL)가 바뀌므로 링크처럼 손가락 커서
                <SelectItem
                  key={choice.key}
                  value={choice.key}
                  className="cursor-pointer"
                >
                  {choice.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </Fragment>
        ))}
      </SelectContent>
    </Select>
  );
}
