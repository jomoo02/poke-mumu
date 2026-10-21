'use client';

import { useId, useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { getChoiceCloseHandlers } from '@/_shared/lib/choice-close-handler';
import { Button } from '@/_shared/ui/button';
import { ControlRadioGroupLabel } from '@/_shared/ui/control';
import { RadioGroup, RadioGroupItem } from '@/_shared/ui/radio-group';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetFooterButton,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/_shared/ui/sheet';

import {
  SORT_OPTIONS,
  SORT_ORDERS,
  getOrderChoices,
  getSortLabel,
  type PokeSort,
  type SortKey,
  type SortOrder,
} from '../../model/poke-sort';

interface SortSheetProps {
  sortState: PokeSort;
  // 기준: 다른 기준이면 그 기준의 첫 방향부터
  onSelectKey: (key: SortKey) => void;
  // 방향 (기준은 그대로)
  onSelectOrder: (order: SortOrder) => void;
  className?: string;
}

/**
 * @5xl 미만 정렬 시트. 고르면 반영하고 닫는다 (쇼핑앱 정렬 시트와 같은 흐름). 아래엔 닫기만.
 * - 정렬 기준: radio 2열 (SORT_OPTIONS 순서)
 * - 정렬 순서: radio 2열 (기준과 같은 모양, 글자만). 구분선으로 기준과 나눈다
 * 문구는 model(sort-option)이 정한다. 닫기는 터치·클릭·Space·Enter에서만 한다 (getChoiceCloseHandlers)
 */
export default function SortSheet({
  sortState,
  onSelectKey,
  onSelectOrder,
  className,
}: SortSheetProps) {
  const [open, setOpen] = useState(false);

  // 닫히는 동안(애니메이션) 정렬 순서 칸이 새 기준의 칸으로 바뀌어 보이지 않게, 닫기 직전의 정렬을 붙잡아 둔다.
  // 기준을 고르면 반영과 닫기가 같은 클릭에서 일어나 순서 칸 글자가 '번호순' → '높은 순'으로 바뀐 채 내려갔다.
  // 이 클릭 핸들러 안의 sortState는 아직 바뀌기 전 값이다. 다시 열 때 비운다
  const [closingSort, setClosingSort] = useState<PokeSort | null>(null);

  const handleOpenChange = (next: boolean) => {
    setClosingSort(next ? null : sortState);
    setOpen(next);
  };

  const close = () => handleOpenChange(false);

  // 순서 칸이 보여 줄 정렬: 닫히는 중이면 닫기 직전 기준의 칸을 그대로 둔다.
  // 같은 기준에서 순서만 고른 경우엔 고른 순서를 보여 준다 (누른 칸에 점이 찍힌 채 닫힌다)
  const shownOrderSort =
    closingSort && closingSort.sort !== sortState.sort
      ? closingSort
      : sortState;

  const choiceCloseHandlers = getChoiceCloseHandlers(close);

  const idPrefix = useId();
  const keyTitleId = `${idPrefix}-key`;
  const orderTitleId = `${idPrefix}-order`;

  // 값은 unknown으로 오므로 알려진 기준·순서일 때만 넘긴다
  const handleKeyChange = (value: unknown) => {
    const option = SORT_OPTIONS.find((candidate) => candidate.key === value);
    if (option) {
      onSelectKey(option.key);
    }
  };

  const handleOrderChange = (value: unknown) => {
    const order = SORT_ORDERS.find((candidate) => candidate === value);
    if (order) {
      onSelectOrder(order);
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            className={cn(
              '-mr-2 shrink-0 px-2 font-normal cursor-pointer',
              'hover:bg-transparent aria-expanded:bg-transparent dark:hover:bg-transparent',
              '[@media(hover:hover)]:hover:opacity-70 active:opacity-70',
              className,
            )}
          >
            <span className="sr-only">정렬: </span>
            {getSortLabel(sortState)}
            <ChevronDownIcon
              aria-hidden
              className="size-4 text-foreground/70"
            />
          </Button>
        }
      />
      <SheetContent side="bottom" className="max-h-[85dvh] gap-0">
        <SheetHeader>
          <SheetTitle>정렬</SheetTitle>
        </SheetHeader>
        <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar px-6">
          <div className="flex flex-col gap-y-6">
            <section className="flex flex-col gap-y-1.5">
              <h3
                id={keyTitleId}
                className="text-sm font-medium text-foreground/70"
              >
                정렬 기준
              </h3>
              <RadioGroup
                aria-labelledby={keyTitleId}
                value={sortState.sort}
                onValueChange={handleKeyChange}
                className="grid-cols-2 gap-x-6 gap-y-1.5"
              >
                {SORT_OPTIONS.map(({ key, label }) => {
                  const id = `${idPrefix}-key-${key}`;

                  return (
                    <ControlRadioGroupLabel
                      key={key}
                      htmlFor={id}
                      {...choiceCloseHandlers}
                      className="h-11"
                    >
                      <RadioGroupItem id={id} value={key} />
                      {label}
                    </ControlRadioGroupLabel>
                  );
                })}
              </RadioGroup>
            </section>

            <div aria-hidden className="h-px bg-border" />

            <section className="flex flex-col gap-y-1.5">
              <h3
                id={orderTitleId}
                className="text-sm font-medium text-foreground/70"
              >
                정렬 순서
              </h3>
              <RadioGroup
                aria-labelledby={orderTitleId}
                value={shownOrderSort.order}
                onValueChange={handleOrderChange}
                className="grid-cols-2 gap-x-6 gap-y-1.5"
              >
                {getOrderChoices(shownOrderSort.sort).map(
                  ({ order, label }) => {
                    const id = `${idPrefix}-order-${order}`;

                    return (
                      <ControlRadioGroupLabel
                        key={order}
                        htmlFor={id}
                        {...choiceCloseHandlers}
                        className="h-11"
                      >
                        <RadioGroupItem id={id} value={order} />
                        {label}
                      </ControlRadioGroupLabel>
                    );
                  },
                )}
              </RadioGroup>
            </section>
          </div>
        </div>
        <SheetFooter>
          <SheetClose render={<SheetFooterButton variant="input" />}>
            닫기
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
