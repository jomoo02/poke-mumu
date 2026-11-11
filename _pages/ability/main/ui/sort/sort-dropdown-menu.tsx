import { useState } from 'react';

import { useCloseOutsideMedia } from '@/_shared/lib/use-close-outside-media';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/_shared/ui/dropdown-menu';

import {
  SORT_OPTIONS,
  getOrderLabel,
  getSortOptionAriaLabel,
  type SortKey,
} from '../../model/sort';
import SortStateIcon from '../sort-state-icon';
import { SORT_TITLE, type SortProps } from './sort-props';
import SortTrigger from './sort-trigger';

export default function SortDropdownMenu({ sortState, onToggle }: SortProps) {
  const [open, setOpen] = useState(false);

  useCloseOutsideMedia('(min-width: 768px) and (max-width: 1023px)', open, () =>
    setOpen(false),
  );

  // modal={false}: 스크롤을 잠그지 않는다 (스크롤바가 사라지며 화면 폭이 바뀌지 않게)
  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger
        render={
          <SortTrigger
            sortState={sortState}
            className="hidden md:inline-flex"
          />
        }
      />
      <DropdownMenuContent
        align="end"
        aria-label={SORT_TITLE}
        className="w-58 max-md:hidden lg:hidden"
      >
        <DropdownMenuRadioGroup
          value={sortState.sort}
          onValueChange={(key: SortKey) => onToggle(key)}
        >
          {SORT_OPTIONS.map(({ key, label }) => (
            <DropdownMenuRadioItem
              key={key}
              value={key}
              indicator="start"
              aria-label={getSortOptionAriaLabel(sortState, key)}
              className="h-10 cursor-pointer text-md"
            >
              <span aria-hidden className="min-w-0 flex-1 truncate">
                {label}
              </span>
              {sortState.sort === key && (
                <span
                  aria-hidden
                  className="flex shrink-0 items-center gap-2 text-sm"
                >
                  {getOrderLabel(sortState)}
                  <SortStateIcon order={sortState.order} />
                </span>
              )}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
