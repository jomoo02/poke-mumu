import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/shared/ui/select';
import { SortOption } from '../model/useAbilityList';
import { Dispatch, SetStateAction } from 'react';

interface SortSelectProps {
  value: SortOption;
  setSortOption: Dispatch<SetStateAction<SortOption>>;
}

const SORT_OPTIONS: { mode: SortOption; label: string }[] = [
  { mode: 'name-asc', label: '이름 순' },
  { mode: 'name-desc', label: '이름 역순' },
  { mode: 'gen-asc', label: '세대 순' },
  { mode: 'gen-desc', label: '세대 역순' },
];

export default function SortSelect({ value, setSortOption }: SortSelectProps) {
  const handleChange = (v: SortOption) => {
    setSortOption(v);
  };

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="w-32">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {SORT_OPTIONS.map((option) => (
            <SelectItem
              key={option.mode}
              value={option.mode}
              className="rounded-4xl h-10 px-3 font-medium"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
