'use client';

import { useId, useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
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
import { STAT_LABEL } from '@/_pages/pokedex/national-base-stats-v0/model/base-stats-poke';
import type {
  PokeSort,
  SortKey,
  SortOrder,
} from '@/_pages/pokedex/national-base-stats-v0/model/poke-sort';

import { getChoiceCloseHandlers } from '@/_shared/lib/choice-close-handler';

// 기준 순서 (2열): [도감번호 | 이름] [HP | 공격] [방어 | 특수공격] [특수방어 | 스피드] [총합]
// 능력치는 게임 표시 순서, 총합은 끝 (카드 칸·테이블 열과 같은 순서)
const SORT_KEYS: readonly SortKey[] = [
  'dexNumber',
  'name',
  'hp',
  'attack',
  'defense',
  'specialAttack',
  'specialDefense',
  'speed',
  'total',
];

// 기준 이름: 줄이지 않는다 (특수공격·특수방어). 시트와 결과 줄 버튼에 같이 쓴다
const KEY_LABEL: Record<SortKey, string> = {
  dexNumber: '도감번호',
  name: '이름',
  ...STAT_LABEL,
};

// 수치(총합·능력치): 위에 기준이 있어 순서만 (결과 줄 버튼에선 '공격 높은 순'처럼 기준을 붙인다)
const AMOUNT_ORDER_LABEL: Record<SortOrder, string> = {
  desc: '높은 순',
  asc: '낮은 순',
};

// 순서형(도감번호·이름): 기준 이름을 붙인다 ('반대순'만으로는 무엇의 반대인지 애매하다).
// '반대순'은 포켓몬 공식 도감의 표현 (이름은 고른 이름 언어 기준이지만 글자는 언어와 상관없이 같다)
// - 시트: 위에 '도감번호'가 있어 '번호순'으로 줄인다
// - 결과 줄 버튼: 혼자 보이므로 '도감번호순'
const SEQUENCE_ORDER_LABEL: Record<
  'dexNumber' | 'name',
  Record<SortOrder, string>
> = {
  dexNumber: { asc: '번호순', desc: '번호 반대순' },
  name: { asc: '이름순', desc: '이름 반대순' },
};

const SEQUENCE_TRIGGER_LABEL: typeof SEQUENCE_ORDER_LABEL = {
  ...SEQUENCE_ORDER_LABEL,
  dexNumber: { asc: '도감번호순', desc: '도감번호 반대순' },
};

const isSequenceKey = (
  key: SortKey,
): key is keyof typeof SEQUENCE_ORDER_LABEL => key in SEQUENCE_ORDER_LABEL;

// 순서 두 칸: 그 기준의 첫 방향이 왼쪽 (번호·이름은 오름차순, 수치는 높은 순)
const getDirections = (
  key: SortKey,
): readonly { order: SortOrder; label: string }[] =>
  isSequenceKey(key)
    ? [
        { order: 'asc', label: SEQUENCE_ORDER_LABEL[key].asc },
        { order: 'desc', label: SEQUENCE_ORDER_LABEL[key].desc },
      ]
    : [
        { order: 'desc', label: AMOUNT_ORDER_LABEL.desc },
        { order: 'asc', label: AMOUNT_ORDER_LABEL.asc },
      ];

// 결과 줄 버튼 글자: '도감번호순', '이름 반대순', '특수공격 높은 순'
const getTriggerLabel = ({ sort, order }: PokeSort) =>
  isSequenceKey(sort)
    ? SEQUENCE_TRIGGER_LABEL[sort][order]
    : `${KEY_LABEL[sort]} ${AMOUNT_ORDER_LABEL[order]}`;

const SORT_ORDERS: readonly SortOrder[] = ['asc', 'desc'];

// 시트의 radio 줄 (기준·순서 공통)
// - 터치 목표 44px (기본 h-10). 2열이라 옆 칸과 붙어 있어 높이를 넉넉히
// - 배경색 없이 흐려지기만 한다 (결과 줄 정렬 버튼과 같다). ControlRadioGroupLabel의 hover 배경을 지우고,
//   hover는 마우스가 있을 때만, 누르는 동안은 어디서나 opacity-70
const CHOICE_LABEL_CLASS = cn(
  'h-11 transition-opacity hover:after:bg-transparent',
  '[@media(hover:hover)]:hover:opacity-70 active:opacity-70',
);

interface SortSheetProps {
  sortState: PokeSort;
  // 기준: 다른 기준이면 그 기준의 첫 방향부터
  onSelectKey: (key: SortKey) => void;
  // 방향
  onSelectSort: (sort: PokeSort) => void;
  className?: string;
}

/**
 * @5xl 미만 정렬 시트. 고르면 반영하고 닫는다 (쇼핑앱 정렬 시트와 같은 흐름). 아래엔 닫기만.
 * - 정렬 기준: radio 2열 (/pokedex/national의 정렬 시트와 같은 점 + 글자)
 * - 정렬 순서: radio 2열 (기준과 같은 모양, 아이콘 없이 글자만). 구분선으로 기준과 나눈다
 * 닫기는 터치·클릭·Space·Enter에서만 한다 (getChoiceCloseHandlers). 화살표 키는 반영만 한다
 */
export default function SortSheet({
  sortState,
  onSelectKey,
  onSelectSort,
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
  const orderSort =
    closingSort && closingSort.sort !== sortState.sort ? closingSort : sortState;

  const choiceCloseHandlers = getChoiceCloseHandlers(close);

  const idPrefix = useId();
  const keyTitleId = `${idPrefix}-key`;
  const orderTitleId = `${idPrefix}-order`;

  // 값은 unknown으로 오므로 알려진 기준·순서일 때만 넘긴다
  const handleKeyChange = (value: unknown) => {
    const key = SORT_KEYS.find((candidate) => candidate === value);
    if (key) {
      onSelectKey(key);
    }
  };

  const handleOrderChange = (value: unknown) => {
    const order = SORT_ORDERS.find((candidate) => candidate === value);
    if (order) {
      onSelectSort({ sort: sortState.sort, order });
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger
        render={
          // 배경 없는 글자 버튼 + ⌄. -mr: 글자·⌄ 끝을 카드 오른쪽 끝에 맞춘다 (누르는 영역은 여백까지)
          <Button
            variant="ghost"
            className={cn(
              '-mr-2.5 h-10 shrink-0 gap-1 rounded-lg px-2.5 text-sm font-medium',
              // 배경색 없이 흐려지기만 한다 (ghost의 hover·열림 배경을 지운다).
              // hover는 마우스가 있을 때만 (터치 기기에선 누른 뒤 hover가 남는다), 누르는 동안은 어디서나
              'hover:bg-transparent aria-expanded:bg-transparent dark:hover:bg-transparent',
              '[@media(hover:hover)]:hover:opacity-70 active:opacity-70',
              className,
            )}
          >
            <span className="sr-only">정렬: </span>
            {getTriggerLabel(sortState)}
            <ChevronDownIcon
              aria-hidden
              className="size-4 text-foreground/70"
            />
          </Button>
        }
      />
      <SheetContent side="bottom" className="max-h-[85dvh] gap-0">
        <SheetHeader className="pb-2">
          <SheetTitle>정렬</SheetTitle>
        </SheetHeader>
        {/* pt-1: radio 포커스 링·누름 배경이 스크롤 영역에 잘리지 않게 */}
        <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar px-6 pt-1 pb-6">
          <div className="flex flex-col gap-y-5">
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
                {SORT_KEYS.map((key) => {
                  const id = `${idPrefix}-key-${key}`;

                  return (
                    <ControlRadioGroupLabel
                      key={key}
                      htmlFor={id}
                      {...choiceCloseHandlers}
                      className={CHOICE_LABEL_CLASS}
                    >
                      <RadioGroupItem
                        id={id}
                        value={key}
                      />
                      {KEY_LABEL[key]}
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
                value={orderSort.order}
                onValueChange={handleOrderChange}
                className="grid-cols-2 gap-x-6 gap-y-1.5"
              >
                {getDirections(orderSort.sort).map(({ order, label }) => {
                  const id = `${idPrefix}-order-${order}`;

                  return (
                    <ControlRadioGroupLabel
                      key={order}
                      htmlFor={id}
                      {...choiceCloseHandlers}
                      className={CHOICE_LABEL_CLASS}
                    >
                      <RadioGroupItem id={id} value={order} />
                      {label}
                    </ControlRadioGroupLabel>
                  );
                })}
              </RadioGroup>
            </section>
          </div>
        </div>
        <SheetFooter className="pb-[calc(--spacing(6)+env(safe-area-inset-bottom))]">
          <SheetClose render={<SheetFooterButton variant="input" />}>
            닫기
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
