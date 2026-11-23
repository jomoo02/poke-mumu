'use client';

import { Fragment, useState } from 'react';
import {
  FunnelIcon,
  ListFilterIcon,
  SlidersHorizontalIcon,
} from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { useIsMobile } from '@/_shared/lib/use-mobile';
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from '@/_shared/ui/accordion';
import { Button } from '@/_shared/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/_shared/ui/sheet';

import {
  MOVE_FILTER_GROUPS,
  useFilterOptions,
  useFilterParam,
  type MoveFilterGroup,
} from '../../model/filter';
import type { MoveFilterCounts } from '../../model/move-results';
import { GROUP_TITLE, OptionContent, OptionIcon } from './filter-option';
import {
  FilterSheetBody,
  FilterSheetCheckboxItem,
  FilterSheetResetFooter,
} from './filter-sheet-parts';
import {
  FilterChip,
  FilterChipList,
  FilterTile,
  FilterTileGrid,
} from './filter-toggle';

interface FilterSheetProps {
  // 시트 닫기 버튼 문구 ('120개 보기')
  resultLabel: string;
  // 고르면 나올 기술 수 (0이면 흐리게)
  filterCounts: MoveFilterCounts;
}

const FILTER_TITLE = '필터';

// 선택지 모양. 'tile': 한 줄 4개 타일 (지금, 아이콘 없는 그룹은 칩), 'chip': 아이콘 칩, 'checkbox': 이전 체크박스 줄 (둘은 비교용으로 남겨 둔다)
const OPTION_STYLE = 'tile' as 'chip' | 'tile' | 'checkbox';

/**
 * 통합 필터 (도감 종족값 페이지와 같은 형태): 트리거 하나 + 시트 하나에 모든 그룹 (타입 · 분류).
 * md 미만은 바텀시트, md 이상은 오른쪽 시트. 고르는 즉시 반영되고 아래 [초기화][N개 보기]의 보기는 닫기만 한다.
 * 그룹은 열고 닫는 섹션: 처음엔 첫 그룹만 연다 (여럿 동시에 열 수 있다). 열린 섹션은 시트를 닫았다 열어도 유지.
 * 제목엔 그 그룹에서 고른 수 '타입 (3)', 닫힌 섹션은 제목 아래에 고른 값 이름 ('불꽃, 물').
 * 선택지: 아이콘이 있는 그룹은 한 줄 4개 타일 [아이콘 / 이름], 없는 그룹은 칩 [이름] (filter-toggle).
 * 고르면 아이콘에 ✓ 배지. 고르면 나올 기술이 없으면 흐리게.
 * 트리거: 아이콘 (lg 이상은 '필터' 글자도). 높이 44로 검색창과 같다. 고른 개수는 접근 이름으로만 ('필터, 2개 선택됨')
 * data-filter-trigger: 칩을 모두 지운 뒤·빈 결과의 초기화 뒤 포커스를 돌려줄 대상 (focusVisibleFilterTrigger)
 */
export default function FilterSheet({
  resultLabel,
  filterCounts,
}: FilterSheetProps) {
  const [openGroups, setOpenGroups] = useState<MoveFilterGroup[]>([
    MOVE_FILTER_GROUPS[0],
  ]);

  const isMobile = useIsMobile();

  const options = useFilterOptions();
  const { filter, selectedItems, toggleFilter, resetFilters, isFilterActive } =
    useFilterParam();

  const selectedCount = selectedItems.length;

  const isEmpty = (group: MoveFilterGroup, value: string) =>
    (filterCounts[group][value] ?? 0) === 0;

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            data-filter-trigger
            aria-label={
              selectedCount > 0
                ? `${FILTER_TITLE}, ${selectedCount}개 선택됨`
                : FILTER_TITLE
            }
            size="lg"
            className="shrink-0 cursor-pointer bg-input/50 text-foreground transition-none hover:bg-input/80 aria-expanded:bg-input/80 dark:bg-input/70 dark:hover:bg-input dark:aria-expanded:bg-input"
          >
            <ListFilterIcon
              aria-hidden
              className="size-4.25"
              data-icon="inline-start"
            />
            <span aria-hidden className="hidden lg:inline">
              {FILTER_TITLE}
            </span>
          </Button>
        }
      >
        {/* {selectedCount > 0 && (
          <span
            aria-hidden
            data-icon="inline-end"
            className={cn(
              // 고른 값 수는 두 자리를 넘지 않아 20px 원 안에 들어간다
              'flex size-5 shrink-0 items-center justify-center rounded-full bg-selected text-[11px] leading-none font-medium tabular-nums text-selected-foreground',
              'absolute -top-1 -right-1 lg:static',
            )}
          >
            {selectedCount}
          </span>
        )} */}
      </SheetTrigger>
      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        // 바텀시트는 640px(max-w-160)에서 멈추고 가운데에 둔다 (넓은 폰 가로·작은 태블릿에서 타일이 커지지 않게)
        className={cn(
          'gap-0',
          isMobile &&
            'data-[side=bottom]:mx-auto data-[side=bottom]:h-[85dvh] data-[side=bottom]:max-w-160',
        )}
      >
        <SheetHeader>
          <SheetTitle>{FILTER_TITLE}</SheetTitle>
        </SheetHeader>
        <FilterSheetBody className="flex flex-col py-1">
          <Accordion
            multiple
            value={openGroups}
            onValueChange={(value: MoveFilterGroup[]) => setOpenGroups(value)}
          >
            {MOVE_FILTER_GROUPS.map((group, index) => (
              <Fragment key={group}>
                {index > 0 && (
                  <div className="my-2.5 h-px shrink-0 bg-border" />
                )}
                <AccordionItem value={group}>
                  <AccordionTrigger className="group -mx-3 min-h-12 rounded-sm px-3 py-2.5 text-base font-semibold text-foreground">
                    <span className="flex min-w-0 flex-col">
                      <span className=" group-hover:underline group-hover:underline-offset-2">
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
                  {/* 펼침 애니메이션의 overflow-hidden이 줄 hover 배경을 자르지 않게 폭을 넓힌다 */}
                  <AccordionPanel className="-mx-3 px-3">
                    {OPTION_STYLE === 'checkbox' ? (
                      <div
                        role="group"
                        aria-label={GROUP_TITLE[group]}
                        className="grid grid-cols-1 pb-1"
                      >
                        {options[group].map((option) => (
                          <FilterSheetCheckboxItem
                            key={option.value}
                            checked={filter[group].includes(option.value)}
                            onCheckedChange={() =>
                              toggleFilter(group, option.value)
                            }
                          >
                            <OptionContent
                              option={option}
                              empty={isEmpty(group, option.value)}
                            />
                          </FilterSheetCheckboxItem>
                        ))}
                      </div>
                    ) : OPTION_STYLE === 'tile' &&
                      options[group].some(
                        (option) => option.type || option.damageClass,
                      ) ? (
                      <FilterTileGrid
                        aria-label={GROUP_TITLE[group]}
                        className="pt-1 pb-3"
                      >
                        {options[group].map((option) => (
                          <FilterTile
                            key={option.value}
                            pressed={filter[group].includes(option.value)}
                            onPressedChange={() =>
                              toggleFilter(group, option.value)
                            }
                            label={option.label}
                            icon={<OptionIcon option={option} />}
                            empty={isEmpty(group, option.value)}
                          />
                        ))}
                      </FilterTileGrid>
                    ) : (
                      <FilterChipList
                        aria-label={GROUP_TITLE[group]}
                        className="pt-1 pb-3"
                      >
                        {options[group].map((option) => (
                          <FilterChip
                            key={option.value}
                            pressed={filter[group].includes(option.value)}
                            onPressedChange={() =>
                              toggleFilter(group, option.value)
                            }
                            label={option.label}
                            icon={
                              option.type || option.damageClass ? (
                                <OptionIcon
                                  option={option}
                                  className="size-6 rounded-full"
                                />
                              ) : undefined
                            }
                            empty={isEmpty(group, option.value)}
                          />
                        ))}
                      </FilterChipList>
                    )}
                  </AccordionPanel>
                </AccordionItem>
              </Fragment>
            ))}
          </Accordion>
        </FilterSheetBody>
        <FilterSheetResetFooter
          canReset={isFilterActive}
          onReset={resetFilters}
          resultLabel={resultLabel}
        />
      </SheetContent>
    </Sheet>
  );
}
