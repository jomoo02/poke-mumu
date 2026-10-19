'use client';

import { cn } from '@/_shared/lib/cn';
import { ControlTriggerButton } from '@/_shared/ui/control';
import {
  FilterTiles,
  getFilterTriggerLabel,
  getFilterTriggerSummary,
  type FilterGroup,
} from '@/_shared/ui/filter';
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

interface FilterGroupSheetProps {
  group: FilterGroup;
  // 닫기 버튼 문구. 결과 수를 보여준다 (예: '120개 기술 보기')
  resultLabel: string;
  className?: string;
}

// md 미만: FilterPopover와 같은 트리거 [모든 타입 ▾] / [불꽃 +2 ▾] → 그 그룹만 담은 바텀시트.
// 선택은 누르는 즉시 반영되고, 아래 버튼은 이 그룹 초기화 · 결과 수를 보여주며 닫기
export default function FilterGroupSheet({
  group,
  resultLabel,
  className,
}: FilterGroupSheetProps) {
  const isActive = group.selected.length > 0;

  const { first, rest } = getFilterTriggerSummary(group);

  return (
    <Sheet>
      <SheetTrigger
        render={
          <ControlTriggerButton
            data-filter-trigger
            variant={isActive ? 'selected' : 'default'}
            aria-label={getFilterTriggerLabel(group)}
            className={cn('h-10 min-w-0', className)}
          >
            {/* '모든 타입' / '불꽃' / '불꽃 +2' (FilterPopover와 같은 문구) */}
            <span aria-hidden className="flex min-w-0 items-center gap-1.5">
              {first === null ? (
                <span className="truncate">모든 {group.title}</span>
              ) : (
                <>
                  <span className="truncate font-medium">{first}</span>
                  {rest > 0 && (
                    <span className="shrink-0 tabular-nums font-medium">
                      +{rest}
                    </span>
                  )}
                </>
              )}
            </span>
          </ControlTriggerButton>
        }
      />
      <SheetContent side="bottom" className="max-h-[85dvh] gap-0">
        <SheetHeader className="pb-2">
          <SheetTitle>{group.title}</SheetTitle>
        </SheetHeader>
        {/* p-* 안쪽 여백: 타일 포커스 링이 스크롤 영역에 잘리지 않게 */}
        <div className="min-h-0 flex-1 overflow-y-auto no-scrollbar px-6 py-4">
          <FilterTiles group={group} place="sheet" />
        </div>
        <SheetFooter className="flex flex-row border-t">
          <SheetFooterButton
            variant="input"
            onClick={group.onReset}
            disabled={!isActive}
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
