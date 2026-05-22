import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/shared/ui/select';

import type { SortMode } from '../model/useSortNature';

interface SortModeSelectProps {
  sortMode: SortMode;
  changeSortMode: (mode: string) => void;
}

export default function SortModeSelect({
  sortMode,
  changeSortMode,
}: SortModeSelectProps) {
  return (
    <Select value={sortMode} onValueChange={changeSortMode}>
      <SelectTrigger aria-label="정렬 기준">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="increase">
            <ArrowUpIcon /> 상승 능력치 기준
          </SelectItem>
          <SelectItem value="decrease">
            <ArrowDownIcon />
            하락 능력치 기준
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
