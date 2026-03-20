import { XIcon } from 'lucide-react';
import {
  type SortOption,
  DEFAULT_SORT,
  getSortLabel,
  isDefaultSort,
} from '../model';
import { Button } from '@/app/shared/ui/button';

interface SortPillProps {
  sort: SortOption;
  onReset: (sort: SortOption) => void;
}

export default function SortPill({ sort, onReset }: SortPillProps) {
  if (isDefaultSort(sort)) {
    return null;
  }

  return (
    <Button onClick={() => onReset(DEFAULT_SORT)} variant={'secondary'}>
      {getSortLabel(sort)}
      <XIcon className="size-3.5" />
    </Button>
  );
}
