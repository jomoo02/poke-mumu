import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

import type { SortMode } from '../model/useSortNature';

interface SortModeSelectProps {
  value: SortMode;
  onValueChange: (mode: string) => void;
}

export default function SortModeSelect({
  value,
  onValueChange,
}: SortModeSelectProps) {
  const handleValueChange = (sortMode: 'increase' | 'decrease' | null) => {
    if (sortMode) {
      onValueChange(sortMode);
    }
  };
  return (
    <Select value={value} onValueChange={handleValueChange}>
      <SelectTrigger aria-label="정렬 기준">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="increase">
            <ArrowUpIcon className="size-4.25" /> 상승 기준
          </SelectItem>
          <SelectItem value="decrease">
            <ArrowDownIcon className="size-4.25" />
            하락 기준
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
