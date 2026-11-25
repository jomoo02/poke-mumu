'use client';

import { useId } from 'react';

import { cn } from '@/_shared/lib/cn';
import { RadioGroup, RadioGroupItem } from '@/_shared/ui/radio-group';

import {
  SORT_OPTIONS,
  getOrderOptions,
  type SortKey,
  type SortOrder,
} from '../../model/sort';
import { SORT_KEY_TITLE, SORT_ORDER_TITLE, type SortProps } from './sort-props';

interface SortOptionsProps extends SortProps {
  // 기준·방향 라디오 열 수 (드로어·팝오버 2열 · 다이얼로그 3열)
  gridClassName?: string;
}

const TITLE_CLASS_NAME = 'text-xs font-medium text-foreground/70';

// 라디오 한 칸 [◉ 이름]: 줄 전체가 라벨이라 어디를 눌러도 고른다 (높이 40)
function SortRadio({ value, label }: { value: string; label: string }) {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className="flex h-10 min-w-0 cursor-pointer items-center gap-2.5 text-md"
    >
      <RadioGroupItem id={id} value={value} />
      <span className="min-w-0 truncate">{label}</span>
    </label>
  );
}

/**
 * 정렬 선택지 (라디오 두 열, 다이얼로그는 세 열). 기준·방향이 같은 모양·같은 열:
 *   정렬 기준
 *   ◉ 이름     ○ 위력
 *   ○ 명중     ○ PP
 *   정렬 방향
 *   ◉ 높은 순  ○ 낮은 순
 * 기준을 바꾸면 그 기준의 첫 방향으로 정해지고, 방향은 필요할 때만 고친다.
 * 고르는 즉시 반영되고 닫지 않는다. 전체 패널(드로어·다이얼로그)과 정렬 패널(드로어·팝오버)이 함께 쓴다
 */
export default function SortOptions({
  sortState,
  onSelectKey,
  onSelectOrder,
  gridClassName,
}: SortOptionsProps) {
  const keyTitleId = useId();
  const orderTitleId = useId();

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col">
        <p id={keyTitleId} className={cn(TITLE_CLASS_NAME, 'py-2')}>
          {SORT_KEY_TITLE}
        </p>
        <RadioGroup
          aria-labelledby={keyTitleId}
          value={sortState.sort}
          onValueChange={(key: SortKey) => onSelectKey(key)}
          className={cn('grid-cols-2 gap-x-4 gap-y-0', gridClassName)}
        >
          {SORT_OPTIONS.map(({ key, label }) => (
            <SortRadio key={key} value={key} label={label} />
          ))}
        </RadioGroup>
      </div>
      <div className="flex flex-col">
        <p id={orderTitleId} className={cn(TITLE_CLASS_NAME, 'py-2')}>
          {SORT_ORDER_TITLE}
        </p>
        <RadioGroup
          aria-labelledby={orderTitleId}
          value={sortState.order}
          onValueChange={(order: SortOrder) => onSelectOrder(order)}
          className={cn('grid-cols-2 gap-x-4 gap-y-0', gridClassName)}
        >
          {getOrderOptions(sortState.sort).map(({ order, label }) => (
            <SortRadio key={order} value={order} label={label} />
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
