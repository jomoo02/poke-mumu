import { CheckIcon } from 'lucide-react';
import { useId, useState } from 'react';

import { cn } from '@/_shared/lib/cn';
import { useCloseOutsideMedia } from '@/_shared/lib/use-close-outside-media';
import { Button } from '@/_shared/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/_shared/ui/sheet';

import { SORT_OPTIONS, getOrderOptions } from '../../model/sort';
import {
  SORT_KEY_TITLE,
  SORT_ORDER_TITLE,
  SORT_TITLE,
  type SortProps,
} from './sort-props';
import SortTrigger from './sort-trigger';

interface SheetOption<V extends string> {
  value: V;
  label: string;
}

interface SheetSectionProps<V extends string> {
  title: string;
  options: readonly SheetOption<V>[];
  selected: V;
  onSelect: (value: V) => void;
}

/**
 * 시트의 한 섹션: 제목 + 한 줄에 하나씩, 고른 줄은 오른쪽 체크 (드롭다운 라디오 항목과 같은 모양)
 */
function SheetSection<V extends string>({
  title,
  options,
  selected,
  onSelect,
}: SheetSectionProps<V>) {
  const titleId = useId();

  return (
    <section aria-labelledby={titleId} className="flex flex-col">
      <h3
        id={titleId}
        className="py-2.5 text-xs text-foreground/70 font-medium"
      >
        {title}
      </h3>
      <ul className="-mx-3 flex flex-col">
        {options.map(({ value, label }) => {
          const isSelected = value === selected;

          return (
            <li key={value}>
              <Button
                variant="ghost"
                aria-label={isSelected ? `선택됨, ${label}` : label}
                onClick={() => onSelect(value)}
                className={cn(
                  'relative flex w-full items-center pl-3 pr-10 border-0 cursor-pointer',
                  'hover:bg-transparent dark:hover:bg-transparent [@media(hover:hover)]:hover:bg-accent dark:[@media(hover:hover)]:hover:bg-accent',
                  'h-12 rounded-lg active:bg-accent text-md active:not-aria-[haspopup]:translate-y-0',
                )}
              >
                <span aria-hidden className="min-w-0 flex-1 truncate text-left">
                  {label}
                </span>
                {isSelected && (
                  <CheckIcon
                    aria-hidden
                    className="absolute right-3 size-4.75"
                  />
                )}
              </Button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/**
 * 모바일 정렬 시트: [정렬 기준] 이름 / 위력 ✓ / 명중 / PP, [방향] 높은 순 ✓ / 낮은 순
 * 기준이 위: 기준을 고르면 그 기준의 첫 방향으로 정해지고, 방향은 필요할 때만 아래에서 바꾼다.
 * 고르면 바로 닫는다 (지금 정렬은 트리거 '위력 높은 순'으로 보인다)
 */
export default function SortSheet({
  sortState,
  onSelectKey,
  onSelectOrder,
}: SortProps) {
  const [open, setOpen] = useState(false);

  useCloseOutsideMedia('(max-width: 767px)', open, () => setOpen(false));

  const keyOptions = SORT_OPTIONS.map(({ key, label }) => ({
    value: key,
    label,
  }));

  const orderOptions = getOrderOptions(sortState.sort).map(
    ({ order, label }) => ({ value: order, label }),
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={<SortTrigger sortState={sortState} className="md:hidden" />}
      />
      <SheetContent side="bottom" className="max-h-[70dvh] gap-0">
        <SheetHeader>
          <SheetTitle>{SORT_TITLE}</SheetTitle>
        </SheetHeader>
        <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar px-6 pb-6 flex flex-col">
          <SheetSection
            title={SORT_KEY_TITLE}
            options={keyOptions}
            selected={sortState.sort}
            onSelect={(key) => {
              onSelectKey(key);
              setOpen(false);
            }}
          />
          <div className={cn('h-px bg-border my-2.5')} />
          <SheetSection
            title={SORT_ORDER_TITLE}
            options={orderOptions}
            selected={sortState.order}
            onSelect={(order) => {
              onSelectOrder(order);
              setOpen(false);
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
