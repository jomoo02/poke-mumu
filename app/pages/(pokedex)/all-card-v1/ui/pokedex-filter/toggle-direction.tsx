import { Button } from '@/app/shared/ui/button';
import { type Direction } from '../../model';
import {
  ArrowDownIcon,
  ArrowDownWideNarrowIcon,
  ArrowUpIcon,
  ArrowUpWideNarrowIcon,
  ArrowDownNarrowWideIcon,
} from 'lucide-react';
import { cn } from '@/app/shared/lib/cn';

interface ToggleDirectionProps {
  direction: Direction;
  toggleDirection: (direction: Direction) => void;
}
export default function ToggleDirection({
  direction,
  toggleDirection,
}: ToggleDirectionProps) {
  const handleClick = () => {
    const nextDirection = direction === 'asc' ? 'desc' : 'asc';
    toggleDirection(nextDirection);
  };
  return (
    <Button
      variant={'outline'}
      onClick={handleClick}
      size={'icon-lg'}
      className="size-10"
    >
      <ArrowUpWideNarrowIcon
        className={cn('size-5', direction === 'asc' ? 'block' : 'hidden')}
      />
      <ArrowDownNarrowWideIcon
        className={cn('size-5', direction === 'desc' ? 'block' : 'hidden')}
      />
      {/* {direction === 'asc' ? <ArrowUpIcon /> : <ArrowDownWideNarrowIcon />} */}
    </Button>
  );
}
