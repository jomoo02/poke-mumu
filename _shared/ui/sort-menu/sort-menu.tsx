'use client';

import { ArrowDownIcon, ArrowUpIcon, ChevronDownIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';

import { SortKeySelect } from './sort-key-select';
import { SortKeySheet } from './sort-key-sheet';
import type { SortMenuOption, SortMenuOrder } from './sort-menu-option';

interface SortMenuProps<K extends string> {
  options: readonly SortMenuOption<K>[];
  selectedKey: K;
  // 기준을 고를 때. 방향은 쓰는 쪽이 그 기준의 기본 방향으로 정한다
  onSelectKey: (key: K) => void;
  order: SortMenuOrder;
  // 방향 칸을 누를 때 (반대 방향으로)
  onToggleOrder: () => void;
  // 그룹 이름 (화면에는 안 보이고 스크린리더만 읽는다)
  label?: string;
}

// 표 머리글과 같은 화살표: 오름차순 ↑, 내림차순 ↓ (높은 순 = ↓)
const ORDER_ICON = { asc: ArrowUpIcon, desc: ArrowDownIcon } as const;

// 바탕 없이 테두리만 두고(다크는 옅은 바탕), 각 칸은 호버·누름·펼침 때만 따로 칠한다.
// 각 칸이 바깥쪽 모서리만 둥글게 가져가,
// 포커스 링이 일반 버튼처럼 칸 바깥에 둥글게 그려지게 한다
// 테두리는 각 칸이 가진다 (왼쪽 칸 전체, 오른쪽 칸은 왼쪽 면 없이 → 가운데 선이 한 줄)
const HALF_CLASS = cn(
  // relative + z-10: 포커스 링(바깥쪽 그림자)이 옆 칸에 가려지지 않게 위로 올린다
  'relative h-10 gap-1.5 border border-border text-sm font-medium text-foreground transition-none focus-visible:z-10',
  // 정렬은 주소(URL)를 바꾸므로 두 칸 모두 링크처럼 손가락 커서
  'cursor-pointer',
  'bg-transparent dark:bg-input/50',
  '[@media(hover:hover)]:hover:bg-muted dark:[@media(hover:hover)]:hover:bg-input/70',
  'active:bg-muted dark:active:bg-input/70',
  'aria-expanded:bg-muted dark:aria-expanded:bg-input/70',
);

// 한 덩어리 [정렬: 기준 ▾ │ ↓]. 각 칸은 자기 것만 보여 준다 (한쪽을 눌러 다른 쪽 글자가 바뀌지 않게)
// - 기준 칸: md 미만 바텀시트, md 이상 셀렉트. 고르면 바로 닫힌다
// - 방향 칸: 지금 방향 화살표(표 머리글과 같은 ↑/↓). 누르면 반대로
// JS(matchMedia)로 고르면 첫 렌더가 한쪽으로 고정돼 트리거가 한 번 교체되므로 CSS로 나눈다
export function SortMenu<K extends string>({
  options,
  selectedKey,
  onSelectKey,
  order,
  onToggleOrder,
  label = '정렬',
}: SortMenuProps<K>) {
  const selected =
    options.find((option) => option.key === selectedKey) ?? options[0];
  const OrderIcon = ORDER_ICON[order.direction];

  const keyTrigger = (
    <Button
      type="button"
      // 보이는 글자와 같은 이름 (음성 조작은 보이는 글자로 부른다). 셀렉트에선 combobox라 글자로 이름이 안 생겨 직접 준다
      aria-label={`정렬: ${selected.label}`}
      className={cn(HALF_CLASS, 'group rounded-l-4xl rounded-r-none pr-3 pl-4')}
    >
      <span className="-mr-0.5 font-normal text-foreground/70">정렬:</span>
      {selected.label}
      <ChevronDownIcon
        aria-hidden
        className="size-4.5 text-foreground/70 transition-transform duration-200 group-data-popup-open:rotate-180"
      />
    </Button>
  );

  const keyProps = { options, selectedKey, onSelectKey, trigger: keyTrigger };

  return (
    <div role="group" aria-label={label} className="flex w-fit items-stretch">
      <div className="md:hidden">
        <SortKeySheet {...keyProps} />
      </div>
      <div className="hidden md:block">
        <SortKeySelect {...keyProps} />
      </div>
      <Button
        type="button"
        // 화면엔 화살표만 있으니 지금 방향과 누르면 바뀔 정렬을 이름으로 알린다
        aria-label={`정렬 방향: ${order.sortLabel}, 누르면 ${order.nextSortLabel}`}
        onClick={onToggleOrder}
        className={cn(
          HALF_CLASS,
          // 아이콘만 두는 칸: 누르기 쉬운 44px 폭. 바깥쪽 모서리 둥글림 때문에 아이콘을 왼쪽으로 살짝
          'w-11 rounded-l-none rounded-r-4xl border-l-0 pr-1 pl-0',
        )}
      >
        <OrderIcon aria-hidden className="size-4" />
      </Button>
    </div>
  );
}
