'use client';

import { useId } from 'react';

import { cn } from '@/_shared/lib/cn';
import { getCloseOnSelectHandlers } from '@/_shared/lib/close-on-select-handler';
import { ControlRadioGroupLabel } from '@/_shared/ui/control';
import { RadioGroup, RadioGroupItem } from '@/_shared/ui/radio-group';

import {
  SORT_OPTIONS,
  SORT_ORDERS,
  getOrderOptions,
  type PokeSort,
} from '../../model/poke-sort';

import type { SortPanelProps } from './sort-panel';

type SortOptionListPlace = 'sheet' | 'popover';

// radio 줄 높이·줄 간격. 시트는 터치 목표 44px, 팝오버는 마우스·태블릿이라 조금 촘촘하게
const OPTION_ROW_CLASS: Record<SortOptionListPlace, string> = {
  sheet: 'h-11',
  popover: 'h-10.5',
};

const OPTION_GAP_CLASS: Record<SortOptionListPlace, string> = {
  sheet: 'gap-y-1.5',
  popover: 'gap-y-1',
};

interface SortOptionListProps extends SortPanelProps {
  place: SortOptionListPlace;
  // 순서 칸이 보여 줄 정렬 (useSortPanel)
  shownOrderSort: PokeSort;
  close: () => void;
  className?: string;
}

/**
 * 시트·팝오버 본문
 * - 정렬 기준: radio 2열 (SORT_OPTIONS 순서)
 * - 정렬 순서: radio 2열 (기준과 같은 모양, 글자만). 구분선으로 기준과 나눈다
 * 문구는 model(sort-option)이 정한다. 닫기는 터치·클릭·Space·Enter에서만 한다 (getCloseOnSelectHandlers)
 */
export default function SortOptionList({
  sortState,
  shownOrderSort,
  onSelectKey,
  onSelectOrder,
  close,
  place,
  className,
}: SortOptionListProps) {
  const closeOnSelectHandlers = getCloseOnSelectHandlers(close);

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
    <div className={cn('flex flex-col gap-y-4', className)}>
      <section className="flex flex-col gap-y-1.5 pt-1.5">
        <h3 id={keyTitleId} className="text-sm font-medium text-foreground/70">
          정렬 기준
        </h3>
        <RadioGroup
          aria-labelledby={keyTitleId}
          value={sortState.sort}
          onValueChange={handleKeyChange}
          className={cn('grid-cols-2 gap-x-6', OPTION_GAP_CLASS[place])}
        >
          {SORT_OPTIONS.map(({ key, label }) => {
            const id = `${idPrefix}-key-${key}`;

            return (
              <ControlRadioGroupLabel
                key={key}
                htmlFor={id}
                {...closeOnSelectHandlers}
                className={OPTION_ROW_CLASS[place]}
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
          className={cn('grid-cols-2 gap-x-6', OPTION_GAP_CLASS[place])}
        >
          {getOrderOptions(shownOrderSort.sort).map(({ order, label }) => {
            const id = `${idPrefix}-order-${order}`;

            return (
              <ControlRadioGroupLabel
                key={order}
                htmlFor={id}
                {...closeOnSelectHandlers}
                className={OPTION_ROW_CLASS[place]}
              >
                <RadioGroupItem id={id} value={order} />
                {label}
              </ControlRadioGroupLabel>
            );
          })}
        </RadioGroup>
      </section>
    </div>
  );
}
