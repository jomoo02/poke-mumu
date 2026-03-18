import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/shared/ui/select';
import { Direction, SortKey, getSortOptions } from '../model';
import { Button } from '@/app/shared/ui/button';
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from 'lucide-react';
import { cn } from '@/app/shared/lib/cn';

interface SelectButtonProps {
  sortKey: SortKey;
  setSortKey: (key: SortKey) => void;
  direction: Direction;
}

export default function SortButtonList({
  sortKey,
  direction,
  setSortKey,
}: SelectButtonProps) {
  const sortOptions = getSortOptions();

  return (
    <div className="flex overflow-x-auto gap-2.5">
      {sortOptions.map((item) => {
        const isActive = item.id === sortKey;

        return (
          <Button
            variant={'outline'}
            size={'lg'}
            key={item.id}
            onClick={() => setSortKey(item.id)}
            className={cn('font-medium', isActive ? 'bg-secondary' : '')}
          >
            <span>{item.label}</span>
            <span className={cn('size-4', isActive ? '' : 'invisible')}>
              {direction === 'asc' ? (
                <ArrowUpIcon className="size-4" />
              ) : (
                <ArrowDownIcon className="size-4" />
              )}
            </span>
          </Button>
        );
      })}
    </div>
  );
}
