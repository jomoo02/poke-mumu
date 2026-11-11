import type { SortProps } from './sort-props';
import SortDropdownMenu from './sort-dropdown-menu';
import SortSheet from './sort-sheet';

export default function Sort(props: SortProps) {
  return (
    <div className="flex shrink-0">
      <SortSheet {...props} />
      <SortDropdownMenu {...props} />
    </div>
  );
}
