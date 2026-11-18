import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/_shared/ui/dropdown-menu';
import {
  FilterMenu,
  FilterMenuCheckboxItem,
  FilterMenuContent,
  FilterMenuTrigger,
  FilterSheet,
  FilterSheetBody,
  FilterSheetCheckboxGroup,
  FilterSheetCheckboxItem,
  FilterSheetContent,
  FilterSheetTrigger,
} from '@/_shared/ui/filter-v2';
import { SheetHeader, SheetTitle } from '@/_shared/ui/sheet';

import {
  useFilterOptions,
  useFilterParam,
  type MoveFilterGroup,
} from '../../../model/filter';
import type { MoveFilterCounts } from '../../../model/move-results';
import {
  FilterSheetResetFooter,
  GROUP_TITLE,
  GroupTriggerText,
  OptionContent,
  getGroupTrigger,
} from './filter-view';

interface GroupFilterProps {
  group: MoveFilterGroup;
  // 시트 닫기 버튼 문구 ('120개 보기')
  resultLabel: string;
  // 고르면 나올 기술 수 (0이면 흐리게)
  filterCounts: MoveFilterCounts;
}

/**
 * 그룹 필터 하나 ([모든 타입 ⌄] / [불꽃, 물 +2 ⌄]). 고른 값이 있으면 강조 모양.
 * md 미만은 바텀시트 + [초기화][N개 보기], md 이상은 드롭다운 메뉴. 초기화는 이 그룹만 지운다.
 * 고르는 즉시 반영된다. 시트·메뉴 조각(filter-v2)이 CSS로 하나만 보인다
 */
export default function GroupFilter({
  group,
  resultLabel,
  filterCounts,
}: GroupFilterProps) {
  const options = useFilterOptions()[group];
  const { filter, selectedItems, toggleFilter, resetFilterGroup } =
    useFilterParam();

  const selected = filter[group];

  const names = selectedItems
    .filter((item) => item.group === group)
    .map((item) => item.label);

  const trigger = getGroupTrigger(group, names);
  const title = GROUP_TITLE[group];

  const isEmpty = (value: string) => (filterCounts[group][value] ?? 0) === 0;

  return (
    <>
      <FilterSheet>
        <FilterSheetTrigger
          active={names.length > 0}
          aria-label={trigger.ariaLabel}
          className="max-w-48 shrink-0 px-4"
        >
          <GroupTriggerText text={trigger.text} rest={trigger.rest} />
        </FilterSheetTrigger>
        <FilterSheetContent className="max-h-[85dvh]">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
          </SheetHeader>
          <FilterSheetBody className="py-1">
            <FilterSheetCheckboxGroup
              aria-label={title}
              className="grid-cols-1"
            >
              {options.map((option) => (
                <FilterSheetCheckboxItem
                  key={option.value}
                  checked={selected.includes(option.value)}
                  onCheckedChange={() => toggleFilter(group, option.value)}
                >
                  <OptionContent
                    option={option}
                    empty={isEmpty(option.value)}
                  />
                </FilterSheetCheckboxItem>
              ))}
            </FilterSheetCheckboxGroup>
          </FilterSheetBody>
          <FilterSheetResetFooter
            canReset={selected.length > 0}
            onReset={() => resetFilterGroup(group)}
            resultLabel={resultLabel}
          />
        </FilterSheetContent>
      </FilterSheet>

      <FilterMenu>
        <FilterMenuTrigger
          active={names.length > 0}
          aria-label={trigger.ariaLabel}
          className="max-w-48 shrink-0 px-4"
        >
          <GroupTriggerText text={trigger.text} rest={trigger.rest} />
        </FilterMenuTrigger>
        <FilterMenuContent aria-label={title} className="w-60">
          {options.map((option) => (
            <FilterMenuCheckboxItem
              key={option.value}
              label={option.label}
              checked={selected.includes(option.value)}
              onCheckedChange={() => toggleFilter(group, option.value)}
            >
              <OptionContent option={option} empty={isEmpty(option.value)} />
            </FilterMenuCheckboxItem>
          ))}
          <DropdownMenuSeparator />
          {/* 열어 둔 채 지운다 (지운 결과를 메뉴 뒤로 바로 본다) */}
          <DropdownMenuItem
            closeOnClick={false}
            disabled={selected.length === 0}
            onClick={() => resetFilterGroup(group)}
            className="h-10 cursor-pointer text-md"
          >
            초기화
          </DropdownMenuItem>
        </FilterMenuContent>
      </FilterMenu>
    </>
  );
}
