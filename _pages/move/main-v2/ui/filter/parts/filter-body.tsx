'use client';

import { Fragment, type ComponentProps } from 'react';

import { cn } from '@/_shared/lib/cn';
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from '@/_shared/ui/accordion';

import {
  MOVE_FILTER_GROUPS,
  useFilterOptions,
  useFilterParam,
  type MoveFilterGroup,
} from '../../../model/filter';
import type { MoveFilterCounts } from '../../../model/move-results';
import FilterCheckboxItem from './filter-checkbox-item';
import { GROUP_TITLE, OptionContent, OptionIcon } from './filter-option';
import {
  FilterChip,
  FilterChipList,
  FilterTile,
  FilterTileGrid,
} from './filter-toggle';

// 선택지 모양. 'tile': 한 줄 4개 타일 (지금, 아이콘 없는 그룹은 칩), 'chip': 아이콘 칩, 'checkbox': 이전 체크박스 줄 (둘은 비교용으로 남겨 둔다)
const OPTION_STYLE = 'tile' as 'chip' | 'tile' | 'checkbox';

interface FilterBodyProps {
  // 고르면 나올 기술 수 (0이면 흐리게)
  filterCounts: MoveFilterCounts;
  // 열린 섹션. 껍데기가 들고 있어 닫았다 열어도 유지된다 (내용은 열릴 때만 그려진다)
  openGroups: MoveFilterGroup[];
  onOpenGroupsChange: (groups: MoveFilterGroup[]) => void;
}

// 목록 스크롤 영역 (머리글·아래 버튼은 고정)
function FilterScrollArea({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'min-h-0 flex-1 overflow-y-auto no-scrollbar px-6',
        className,
      )}
      {...props}
    />
  );
}

/**
 * 드로어·시트 공통 내용: 그룹마다 열고 닫는 섹션 (여럿 동시에 열 수 있다).
 * 제목엔 그 그룹에서 고른 수 '타입 (3)', 닫힌 섹션은 제목 아래에 고른 값 이름 ('불꽃, 물').
 * 선택지: 아이콘이 있는 그룹은 한 줄 4개 타일 [아이콘 / 이름], 없는 그룹은 칩 [이름] (filter-toggle).
 * 고르면 아이콘에 ✓ 배지, 고르면 나올 기술이 없으면 흐리게. 고르는 즉시 반영된다
 */
export default function FilterBody({
  filterCounts,
  openGroups,
  onOpenGroupsChange,
}: FilterBodyProps) {
  const options = useFilterOptions();
  const { filter, selectedItems, toggleFilter } = useFilterParam();

  const isEmpty = (group: MoveFilterGroup, value: string) =>
    (filterCounts[group][value] ?? 0) === 0;

  return (
    <FilterScrollArea className="flex flex-col py-1">
      <Accordion
        multiple
        value={openGroups}
        onValueChange={(value: MoveFilterGroup[]) => onOpenGroupsChange(value)}
      >
        {MOVE_FILTER_GROUPS.map((group, index) => (
          <Fragment key={group}>
            {index > 0 && <div className="my-2.5 h-px shrink-0 bg-border" />}
            <AccordionItem value={group}>
              <AccordionTrigger className="group -mx-3 min-h-12 rounded-sm px-3 py-2.5 text-base font-semibold text-foreground">
                <span className="flex min-w-0 flex-col">
                  <span className="group-hover:underline group-hover:underline-offset-2">
                    {filter[group].length > 0
                      ? `${GROUP_TITLE[group]} (${filter[group].length})`
                      : GROUP_TITLE[group]}
                  </span>
                  {/* 닫혀 있을 때만: 고른 값 이름 (열리면 체크로 보인다) */}
                  {!openGroups.includes(group) && filter[group].length > 0 && (
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
                      <FilterCheckboxItem
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
                      </FilterCheckboxItem>
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
    </FilterScrollArea>
  );
}
