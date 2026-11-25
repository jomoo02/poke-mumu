'use client';

import { Fragment, useRef, type ComponentProps } from 'react';

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
import { GROUP_TITLE, OptionIcon } from './filter-option';
import {
  FilterChip,
  FilterChipList,
  FilterTile,
  FilterTileGrid,
} from './filter-toggle';

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

// 펼침 애니메이션(200ms)이 끝나지 않을 때를 대비한 대기 한도
const EXPAND_FALLBACK_MS = 400;

// target이 스크롤 영역 안에 보이게 최소로 스크롤한다. 영역보다 크면 제목(위 끝)을 맨 위에 맞춘다
function revealInScrollArea(area: HTMLElement, target: HTMLElement) {
  const areaRect = area.getBoundingClientRect();
  const rect = target.getBoundingClientRect();

  const topGap = rect.top - areaRect.top;
  const bottomGap = rect.bottom - areaRect.bottom;

  const delta =
    topGap < 0 || rect.height > areaRect.height
      ? topGap
      : Math.max(bottomGap, 0);

  if (delta === 0) {
    return;
  }

  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  area.scrollTo({
    top: area.scrollTop + delta,
    behavior: reduceMotion ? 'auto' : 'smooth',
  });
}

/**
 * 드로어·시트 공통 내용: 그룹마다 열고 닫는 섹션 (여럿 동시에 열 수 있다).
 * 제목엔 그 그룹에서 고른 수 '타입 (3)', 닫힌 섹션은 제목 아래에 고른 값 이름 ('불꽃, 물').
 * 선택지: 아이콘이 있는 그룹(타입·분류)은 한 줄 4개 타일 [아이콘 / 이름], 없는 그룹(도감의 세대·모습 등)은 칩 [이름] (filter-toggle).
 * 고르면 아이콘에 ✓ 배지, 고르면 나올 기술이 없으면 흐리게. 고르는 즉시 반영된다.
 * 섹션을 열면 펼침이 끝난 뒤 그 섹션이 보이게 스크롤한다 (아래 섹션이 화면 밖으로 펼쳐져 열린 줄 모르는 것을 막는다). 닫을 땐 그대로
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

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef(new Map<MoveFilterGroup, HTMLDivElement>());

  // 새로 연 섹션: 패널이 그려진 다음 프레임에 펼침 끝(transitionend)을 기다렸다가 보이게 스크롤
  const revealAfterExpand = (group: MoveFilterGroup) => {
    requestAnimationFrame(() => {
      const item = itemRefs.current.get(group);
      const panel = item?.querySelector<HTMLElement>(
        '[data-slot="accordion-panel"]',
      );

      if (!item || !panel) {
        return;
      }

      let done = false;

      const reveal = () => {
        if (done) {
          return;
        }

        done = true;
        panel.removeEventListener('transitionend', onTransitionEnd);
        clearTimeout(fallback);

        const area = scrollAreaRef.current;

        if (area && item.isConnected) {
          revealInScrollArea(area, item);
        }
      };

      // 안쪽 타일의 전환은 건너뛰고 패널 높이 전환만
      const onTransitionEnd = (event: TransitionEvent) => {
        if (event.target === panel && event.propertyName === 'height') {
          reveal();
        }
      };

      panel.addEventListener('transitionend', onTransitionEnd);
      const fallback = setTimeout(reveal, EXPAND_FALLBACK_MS);
    });
  };

  const handleOpenGroupsChange = (value: MoveFilterGroup[]) => {
    const opened = value.find((group) => !openGroups.includes(group));

    onOpenGroupsChange(value);

    if (opened) {
      revealAfterExpand(opened);
    }
  };

  return (
    <FilterScrollArea ref={scrollAreaRef} className="flex flex-col py-1">
      <Accordion
        multiple
        value={openGroups}
        onValueChange={handleOpenGroupsChange}
      >
        {MOVE_FILTER_GROUPS.map((group, index) => (
          <Fragment key={group}>
            {index > 0 && <div className="my-2.5 h-px shrink-0 bg-border" />}
            <AccordionItem
              ref={(element: HTMLDivElement | null) => {
                if (element) {
                  itemRefs.current.set(group, element);
                } else {
                  itemRefs.current.delete(group);
                }
              }}
              value={group}
            >
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
              {/* 펼침 애니메이션의 overflow-hidden이 타일·칩의 포커스 링을 자르지 않게 폭을 넓힌다 */}
              <AccordionPanel className="-mx-3 px-3">
                {options[group].some(
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
