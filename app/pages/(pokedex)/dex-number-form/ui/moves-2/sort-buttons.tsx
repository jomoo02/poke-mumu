import { cn } from '@/app/shared/lib/cn';
import { Button } from '@/app/shared/ui/button';
import { type SortMode } from '../../model/moves-2/useMoveListSort';

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
    <div className="inline-flex bg-muted p-1 rounded-lg gap-1">
      {SORT_OPTIONS.map(({ mode, label }) => (
        <Button
          key={mode}
          variant="ghost"
          onClick={() => onSort(mode)}
          className={cn(
            'text-sm opacity-50',
            sortMode === mode
              ? 'bg-background hover:bg-background opacity-100 shadow-xs'
              : '',
          )}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
