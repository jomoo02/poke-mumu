'use client';

import { useState } from 'react';
import { SlidersHorizontalIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/_shared/ui/tabs';

import type { FilterGroup } from './filter-group';
import { FilterTiles } from './filter-tiles';

interface FilterSheetProps {
  groups: readonly FilterGroup[];
  // 닫기 버튼 문구. 결과 수를 보여준다 (예: '120개 기술 보기')
  resultLabel: string;
  // 모든 그룹 초기화
  onResetAll: () => void;
  className?: string;
}

// md 미만: [필터(선택 수)] 아이콘 버튼 → 시트 하나에 탭(그룹마다) + 타일.
// 선택은 누르는 즉시 반영되므로 아래 버튼은 결과 수를 보여주며 닫기만 한다.
// 높이를 고정해 탭을 바꿔도 시트가 흔들리지 않게 한다
export function FilterSheet({
  groups,
  resultLabel,
  onResetAll,
  className,
}: FilterSheetProps) {
  const [tab, setTab] = useState(groups[0]?.key);

  const count = groups.reduce((sum, group) => sum + group.selected.length, 0);

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            data-filter-trigger
            variant="secondary"
            aria-label={count > 0 ? `필터, ${count}개 선택됨` : '필터'}
            className={cn(
              'relative size-10.5 shrink-0 rounded-xl',
              'bg-input/50 dark:bg-input/70',
              '[@media(hover:hover)]:hover:bg-input/70 dark:[@media(hover:hover)]:hover:bg-input',
              className,
            )}
          >
            <SlidersHorizontalIcon aria-hidden className="size-4.5" />
            {count > 0 && (
              <span
                aria-hidden
                className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-selected px-1 text-xs font-semibold text-selected-foreground"
              >
                {count}
              </span>
            )}
          </Button>
        }
      />
      <SheetContent
        side="bottom"
        className="gap-0 data-[side=bottom]:h-[80dvh]"
      >
        <SheetHeader className="pb-2">
          <SheetTitle>필터</SheetTitle>
        </SheetHeader>
        <Tabs
          value={tab}
          onValueChange={(value) => setTab(String(value))}
          className="min-h-0 flex-1 gap-0"
        >
          <TabsList
            variant="line"
            className="w-full justify-start gap-1.5 border-b px-6 group-data-horizontal/tabs:h-11.5 pb-0"
          >
            {groups.map((group) => (
              <TabsTrigger
                key={group.key}
                value={group.key}
                // 보이는 글자는 '타입 2'로 붙어 읽히므로 접근 이름을 따로 준다
                aria-label={
                  group.selected.length > 0
                    ? `${group.title}, ${group.selected.length}개 선택됨`
                    : undefined
                }
                className="flex-none text-md group-data-horizontal/tabs:after:-bottom-px"
              >
                {group.title}
                {group.selected.length > 0 && (
                  <span className=" tabular-nums">{group.selected.length}</span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {/* p-* 안쪽 여백: 타일 포커스 링이 스크롤 영역에 잘리지 않게 */}
          <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar px-6 py-4">
            {groups.map((group) => (
              <TabsContent key={group.key} value={group.key}>
                <FilterTiles group={group} place="sheet" />
              </TabsContent>
            ))}
          </div>
        </Tabs>
        <SheetFooter className="flex flex-row border-t">
          <SheetFooterButton
            variant="input"
            onClick={onResetAll}
            className="flex-1/3"
          >
            초기화
          </SheetFooterButton>
          <SheetClose render={<SheetFooterButton className="flex-2/3" />}>
            {resultLabel}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
