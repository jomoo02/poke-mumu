import { useState } from 'react';

import { useCloseOutsideMedia } from '@/_shared/lib/use-close-outside-media';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/_shared/ui/dropdown-menu';

import {
  SORT_OPTIONS,
  getOrderOptions,
  type SortKey,
  type SortOrder,
} from '../../model/sort';
import {
  SORT_KEY_TITLE,
  SORT_ORDER_TITLE,
  SORT_TITLE,
  type SortProps,
} from './sort-props';
import SortTrigger from './sort-trigger';

const ITEM_CLASS_NAME = 'h-10 cursor-pointer text-md';

/**
 * md 정렬 메뉴: [기준] 이름 ✓ / 등장 ─── [방향] 이름순 ✓ / 이름 반대순
 * 고르면 바로 닫는다
 */
export default function SortDropdownMenu({
  sortState,
  onSelectKey,
  onSelectOrder,
}: SortProps) {
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
        <DropdownMenuGroup>
          <DropdownMenuLabel>{SORT_KEY_TITLE}</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={sortState.sort}
            onValueChange={(key: SortKey) => onSelectKey(key)}
          >
            {SORT_OPTIONS.map(({ key, label }) => (
              <DropdownMenuRadioItem
                key={key}
                value={key}
                closeOnClick
                className={ITEM_CLASS_NAME}
              >
                {label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>{SORT_ORDER_TITLE}</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={sortState.order}
            onValueChange={(order: SortOrder) => onSelectOrder(order)}
          >
            {getOrderOptions(sortState.sort).map(({ order, label }) => (
              <DropdownMenuRadioItem
                key={order}
                value={order}
                closeOnClick
                className={ITEM_CLASS_NAME}
              >
                {label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
