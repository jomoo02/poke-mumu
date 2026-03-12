import { Button } from '@/app/shared/ui/button';
import { type Direction } from '../../model';
import {
  ArrowDownIcon,
  ArrowDownWideNarrowIcon,
  ArrowUpIcon,
  ArrowUpNarrowWideIcon,
} from 'lucide-react';
import { cn } from '@/app/shared/lib/cn';

interface ToggleDirectionProps {
  direction: Direction;
  toggleDirection: () => void;
}
export default function ToggleDirection({
  direction,
  toggleDirection,
}: ToggleDirectionProps) {
  return (
    <Button variant={'outline'} onClick={toggleDirection} className="h-9">
      <ArrowUpIcon
        className={cn('size-4', direction !== 'asc' ? 'rotate-180' : '')}
      />
      <span>정렬</span>

      {/* {direction === 'asc' ? <ArrowUpIcon /> : <ArrowDownWideNarrowIcon />} */}
    </Button>
  );
}
