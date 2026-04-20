import { cn } from '@/app/shared/lib/cn';
import { Button } from '@/app/shared/ui/button';
import { type SortMode } from '../../model/moves-2/useMoveListSort';
import { useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from '@/app/shared/ui/select';

interface SortButtonsProps {
  sortMode: SortMode;
  onSort: (mode: SortMode) => void;
}

const SORT_OPTIONS: { mode: SortMode; label: string }[] = [
  { mode: 'default', label: '기본' },
  { mode: 'power-desc', label: '위력 높은 순' },
  { mode: 'power-asc', label: '위력 낮은 순' },
  { mode: 'type-asc', label: '타입순' },
];

export default function SortButtons({ sortMode, onSort }: SortButtonsProps) {
  return (
    <Select value={sortMode} onValueChange={onSort}>
      <SelectTrigger className="rounded-3xl w-40 px-4  min-h-10 h-10 bg-muted border-transparent dark:bg-input dark:hover:bg-input">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="rounded-3xl p-0.5 transition-none animate-none">
        <SelectGroup>
          {SORT_OPTIONS.map((option) => (
            <SelectItem
              key={option.mode}
              value={option.mode}
              className="rounded-2xl h-10 px-3 font-medium"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
    // <div className="flex gap-2 h-full items-center p-1">
    //   {SORT_OPTIONS.map(({ mode, label }) => (
    //     <Button
    //       key={mode}
    //       variant={'outline'}
    //       onClick={() => onSort(mode)}
    //       className={cn(
    //         'text-sm rounded-3xl',
    //         sortMode === mode ? 'bg-muted hover:bg-muted opacity-100' : '',
    //       )}
    //     >
    //       {label}
    //     </Button>
    //   ))}
    // </div>
  );
}
