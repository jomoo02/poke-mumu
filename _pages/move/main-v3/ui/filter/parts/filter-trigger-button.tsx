import type { ComponentProps } from 'react';
import { SlidersHorizontalIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';

import { ALL_PANEL_TITLE } from './filter-props';

interface FilterTriggerButtonProps extends ComponentProps<typeof Button> {
  selectedCount: number;
}

/**
 * 전체 패널(필터 그룹 전부) 트리거: [⚙] (36×36). 버튼 줄의 다른 버튼과 같은 높이·테두리.
 * 고른 개수는 접근 이름으로만 ('필터, 2개 선택됨').
 * data-filter-trigger: 칩을 모두 지운 뒤·빈 결과의 초기화 뒤 포커스를 돌려줄 대상 (focusVisibleFilterTrigger가 보이는 쪽을 고른다)
 */
export default function FilterTriggerButton({
  selectedCount,
  className,
  ...props
}: FilterTriggerButtonProps) {
  return (
    <Button
      data-filter-trigger
      variant="outline"
      size={'icon-sm'}
      aria-label={
        selectedCount > 0
          ? `${ALL_PANEL_TITLE}, ${selectedCount}개 선택됨`
          : ALL_PANEL_TITLE
      }
      className={cn(
        // 'shrink-0 cursor-pointer rounded-xl dark:bg-card max-md:w-9 max-md:px-0',
        'size-9',
        className,
      )}
      {...props}
    >
      <SlidersHorizontalIcon
        aria-hidden
        className="size-4 text-foreground/70"
      />
      {/* <span aria-hidden className="hidden md:inline">
        필터
      </span> */}
    </Button>
  );
}
