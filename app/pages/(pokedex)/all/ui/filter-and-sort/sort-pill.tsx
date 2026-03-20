import { XIcon } from 'lucide-react';

import { Button } from '@/app/shared/ui/button';

import { type SortOption, getSortLabel } from '../../model';

interface SortPillProps {
  sort: SortOption;
  onReset: () => void;
}

export default function SortPill({ sort, onReset }: SortPillProps) {
  return (
    <Button onClick={onReset} variant={'secondary'}>
      {getSortLabel(sort)}
      <XIcon className="size-3.5" />
    </Button>
  );
}
