import type { SortPanelProps } from './sort-panel';
import SortDropdownMenu from './sort-dropdown-menu';
import SortSheet from './sort-sheet';

export default function Sort(props: SortPanelProps) {
  return (
    <div className="flex shrink-0">
      <SortSheet {...props} />
      <SortDropdownMenu {...props} />
    </div>
  );
}
