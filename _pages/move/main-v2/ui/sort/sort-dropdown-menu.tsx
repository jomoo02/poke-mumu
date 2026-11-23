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
 * md~lg 정렬 메뉴 (칩 줄 오른쪽 끝): [정렬 기준] 이름 / 위력 ✓ / 명중 / PP ─── [방향] 높은 순 ✓ / 낮은 순
 * 이 폭은 카드 목록이라 표 머리글이 없다. lg 이상은 표 머리글로 정렬해 칩을 숨긴다. 고르면 바로 닫는다
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

  // modal: 열려 있는 동안 페이지 스크롤을 잠근다 (필터 팝오버와 같은 규칙)
  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={true}>
      <DropdownMenuTrigger
        render={
          <SortTrigger
            sortState={sortState}
            className="hidden md:inline-flex lg:hidden"
          />
        }
      />
      <DropdownMenuContent
        align="end"
        aria-label={SORT_TITLE}
        className="w-58 max-md:hidden"
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
