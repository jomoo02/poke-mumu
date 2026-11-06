import { cn } from '@/_shared/lib/cn';

import type { SortPanelProps } from './sort-panel';
import SortDropdownMenu from './sort-dropdown-menu';
import SortSheet from './sort-sheet';

interface SortProps extends SortPanelProps {
  className?: string;
}

export default function Sort({ className, ...props }: SortProps) {
  return (
    <div className={cn('flex shrink-0', className)}>
      <SortSheet {...props} />
      <SortDropdownMenu {...props} />
    </div>
  );
}
