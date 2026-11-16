import { Fragment, useRef, useState } from 'react';
import { SlidersHorizontalIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { useIsMobile } from '@/_shared/lib/use-mobile';
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from '@/_shared/ui/accordion';
import { ControlTriggerButton } from '@/_shared/ui/control';
import {
  FilterSheetBody,
  FilterSheetCheckboxGroup,
  FilterSheetCheckboxItem,
  FilterSheetDone,
  FilterSheetFooter,
} from '@/_shared/ui/filter-v2';
import {
  Sheet,
  SheetContent,
  SheetFooterButton,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/_shared/ui/sheet';
import { TypeIcon } from '@/_entities/type';

import {
  POKE_FILTER_GROUPS,
  POKE_FILTER_RULES,
  useFilterOptions,
  useFilterParam,
  type PokeFilterGroup,
} from '../../../model/filter';

export const FILTER_TITLE = '필터';

// 그룹 이름 (시트 섹션 제목)
const GROUP_TITLE: Record<PokeFilterGroup, string> = {
  type: '타입',
  form: '모습',
  gen: '세대',
};

interface FilterSheetProps {
  // 닫기 버튼 문구 ('120마리 보기')
  resultLabel: string;
}

/**
 * 통합 필터: 트리거 하나 + 시트 하나에 모든 그룹 ([타입 ⌄] ─── [모습 ⌄] ─── [세대 ⌄]).
 * md 미만은 바텀시트, md 이상은 오른쪽 시트. 고르는 즉시 반영되고 아래 버튼은 닫기만 한다.
 * 그룹은 열고 닫는 섹션: 첫 그룹만 처음부터 열고 나머지는 닫아 둔다 (여럿 동시에 열 수 있다).
 * 열린 섹션은 시트를 닫았다 열어도 유지한다 (새로고침하면 처음으로). 제목엔 그 그룹에서 고른 수: '타입 (3)',
 * 닫힌 섹션은 제목 아래에 고른 값 이름을 한 줄로 ('불꽃, 비행').
 * 고른 값 칩은 페이지의 검색창 아래에 있다 (FilterChips). 모두 지우기는 시트 아래 [초기화][N마리 보기]
 * 선택지는 한 줄에 하나: [☐ 이름 ······ 아이콘(타입만)].
 * 최대 선택 수에 닿으면(타입 2개, 복합 타입) 고르지 않은 나머지는 막는다 (고른 값은 눌러서 해제)
 * 트리거: 아이콘 + 고른 값 개수 배지 (lg 이상은 '필터' 글자도)
 * data-filter-trigger: 칩을 모두 지운 뒤·빈 결과의 초기화 뒤 포커스를 돌려줄 대상
 */
export default function FilterSheet({ resultLabel }: FilterSheetProps) {
  const [open, setOpen] = useState(false);

  // 열린 섹션. 시트는 닫히면 내용을 지우므로 여기(시트 밖)에 두어 다시 열어도 그대로 보인다.
  // 처음엔 첫 그룹만 연다
  const [openGroups, setOpenGroups] = useState<PokeFilterGroup[]>([
    POKE_FILTER_GROUPS[0],
  ]);

  const isMobile = useIsMobile();

  const options = useFilterOptions();
  const { filter, selectedItems, toggleFilter, resetFilters } =
    useFilterParam();

  // 초기화 뒤 초기화 버튼이 비활성이 되므로 포커스를 '보기' 버튼으로 옮긴다
  const footerRef = useRef<HTMLDivElement>(null);

  const selectedCount = selectedItems.length;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <ControlTriggerButton
            data-filter-trigger
            size="icon"
            aria-label={
              selectedCount > 0
                ? `${FILTER_TITLE}, ${selectedCount}개 선택됨`
                : FILTER_TITLE
            }
            className="relative shrink-0 cursor-pointer size-11 lg:w-auto lg:gap-2 lg:px-4"
          />
        }
      >
        <SlidersHorizontalIcon
          aria-hidden
          className="size-4.5"
          data-icon="inline-start"
        />
        <span aria-hidden className="hidden lg:inline">
          {FILTER_TITLE}
        </span>
        {selectedCount > 0 && (
          <span
            aria-hidden
            data-icon="inline-end"
            className={cn(
              // 고른 값 수는 두 자리를 넘지 않아 20px 원 안에 들어간다. 자리 수와 관계없이 크기 고정
              'flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] leading-none font-medium tabular-nums text-primary-foreground',
              'absolute -top-1 -right-1 lg:static',
            )}
          >
            {selectedCount}
          </span>
        )}
      </SheetTrigger>
      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        className={cn('gap-0', isMobile && 'data-[side=bottom]:h-[85dvh]')}
      >
        <SheetHeader>
          <SheetTitle>{FILTER_TITLE}</SheetTitle>
        </SheetHeader>
        <FilterSheetBody className="flex flex-col py-1">
          <Accordion
            multiple
            value={openGroups}
            onValueChange={(value: PokeFilterGroup[]) => setOpenGroups(value)}
          >
            {POKE_FILTER_GROUPS.map((group, index) => (
              <Fragment key={group}>
                {index > 0 && (
                  <div className="my-2.5 h-px shrink-0 bg-border" />
                )}
                <AccordionItem value={group}>
                  <AccordionTrigger className="py-2.5 min-h-12 text-base font-semibold text-foreground rounded-sm hover:underline hover:underline-offset-2 px-3 -mx-3">
                    <span className="flex min-w-0 flex-col">
                      {/* 고른 값이 있으면 개수: '타입 (3)' */}
                      <span>
                        {filter[group].length > 0
                          ? `${GROUP_TITLE[group]} (${filter[group].length})`
                          : GROUP_TITLE[group]}
                      </span>
                      {/* 닫혀 있을 때만: 고른 값 이름 (열리면 체크로 보인다) */}
                      {!openGroups.includes(group) &&
                        filter[group].length > 0 && (
                          <span className="truncate text-sm font-normal text-foreground/70">
                            {selectedItems
                              .filter((item) => item.group === group)
                              .map((item) => item.label)
                              .join(', ')}
                          </span>
                        )}
                    </span>
                  </AccordionTrigger>
                  {/* 펼침 애니메이션의 overflow-hidden이 줄 hover 배경(좌우 -8px)을 자르지 않게 폭을 넓힌다 */}
                  <AccordionPanel className="-mx-3 px-3">
                    <FilterSheetCheckboxGroup
                      aria-label={GROUP_TITLE[group]}
                      className="grid-cols-1 pb-1"
                    >
                      {options[group].map((option) => {
                        const isChecked = filter[group].includes(option.value);
                        const max = POKE_FILTER_RULES[group].max;
                        const isFull =
                          max !== undefined && filter[group].length >= max;

                        return (
                          <FilterSheetCheckboxItem
                            key={option.value}
                            checked={isChecked}
                            disabled={isFull && !isChecked}
                            onCheckedChange={() =>
                              toggleFilter(group, option.value)
                            }
                          >
                            <span className="flex min-w-0 flex-1 items-center gap-x-3.5">
                              <span className="min-w-0 flex-1 truncate">
                                {option.label}
                              </span>
                              {option.type && (
                                <span className="flex shrink-0">
                                  <TypeIcon type={option.type} decorative />
                                </span>
                              )}
                            </span>
                          </FilterSheetCheckboxItem>
                        );
                      })}
                    </FilterSheetCheckboxGroup>
                  </AccordionPanel>
                </AccordionItem>
              </Fragment>
            ))}
          </Accordion>
        </FilterSheetBody>
        <FilterSheetFooter ref={footerRef}>
          <SheetFooterButton
            variant="input"
            disabled={selectedCount === 0}
            onClick={() => {
              resetFilters();
              footerRef.current
                ?.querySelector<HTMLButtonElement>('[data-filter-done]')
                ?.focus();
            }}
            className="cursor-pointer px-6"
          >
            초기화
          </SheetFooterButton>
          <FilterSheetDone data-filter-done>{resultLabel}</FilterSheetDone>
        </FilterSheetFooter>
      </SheetContent>
    </Sheet>
  );
}
