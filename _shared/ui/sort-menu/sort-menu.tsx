'use client';

import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/_shared/ui/popover';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetFooterButton,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/_shared/ui/sheet';
import { ControlResetButton, ControlTriggerButton } from '@/_shared/ui/control';

import { SortMenuList } from './sort-menu-list';
import type { SortMenuOption, SortMenuSelected } from './sort-menu-option';

interface SortMenuProps<K extends string> {
  options: readonly SortMenuOption<K>[];
  selected: SortMenuSelected<K>;
  onSelect: (key: K) => void;
  onReset: () => void;
  // 기본 정렬이면 드롭다운의 초기화를 비활성
  isActive: boolean;
  // 시트 제목 아래 안내 (드롭다운은 목록만 둔다)
  hint?: string;
}

// 정렬 버튼 [정렬: 위력 높은 순 ▾] → md 미만 바텀시트, md 이상 드롭다운.
// JS(matchMedia)로 고르면 첫 렌더가 한쪽으로 고정돼 트리거가 한 번 교체되므로 CSS로 나눈다
export function SortMenu<K extends string>({
  options,
  selected,
  onSelect,
  onReset,
  isActive,
  hint,
}: SortMenuProps<K>) {
  return (
    <>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger
            render={
              <ControlTriggerButton>{selected.sortLabel}</ControlTriggerButton>
            }
          />
          <SheetContent side="bottom" className="gap-0 max-h-[85dvh]">
            <SheetHeader>
              <SheetTitle>정렬</SheetTitle>
              {hint && <SheetDescription>{hint}</SheetDescription>}
            </SheetHeader>
            <div className="px-6 overflow-y-auto no-scrollbar">
              <SortMenuList
                options={options}
                selected={selected}
                onSelect={onSelect}
                place="sheet"
                className="gap-y-1.5"
              />
            </div>
            {/* 선택은 누르는 즉시 반영되므로 적용하기는 닫기만 한다 */}
            <SheetFooter className="flex flex-row">
              <SheetFooterButton
                variant="input"
                onClick={onReset}
                className="flex-1/3"
              >
                초기화
              </SheetFooterButton>
              <SheetClose render={<SheetFooterButton className="flex-2/3" />}>
                적용하기
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:block">
        <Popover>
          <PopoverTrigger
            render={
              <ControlTriggerButton>{selected.sortLabel}</ControlTriggerButton>
            }
          />
          <PopoverContent className="w-64" align="end">
            <PopoverHeader className="flex flex-row justify-between">
              <PopoverTitle>정렬</PopoverTitle>
              <ControlResetButton onClick={onReset} disabled={!isActive} />
            </PopoverHeader>
            <SortMenuList
              options={options}
              selected={selected}
              onSelect={onSelect}
              place="popover"
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
