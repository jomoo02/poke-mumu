import type { ComponentProps } from 'react';
import { SlidersHorizontalIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';

import { ALL_FILTER_TITLE } from './filter-props';

interface AllFilterTriggerProps extends ComponentProps<typeof Button> {
  // 고른 값 개수. 1 이상이면 오른쪽 위에 숫자 배지
  selectedCount: number;
}

/**
 * 통합 필터 트리거 [⚙]. 고른 값이 있으면 오른쪽 위 배지 [⚙²] (접근 이름은 '필터, 2개 선택됨').
 * data-filter-trigger: 칩을 모두 지운 뒤·빈 결과의 초기화 뒤 포커스를 돌려줄 대상 (focusVisibleFilterTrigger가 보이는 쪽을 고른다).
 * Drawer·DialogTrigger가 render로 넘기는 props(onClick·ref·aria-*)까지 받는다
 */
export default function AllFilterTrigger({
  selectedCount,
  className,
  ...props
}: AllFilterTriggerProps) {
  return (
    <Button
      data-filter-trigger
      variant="outline"
      size="icon"
      aria-label={
        selectedCount > 0
          ? `${ALL_FILTER_TITLE}, ${selectedCount}개 선택됨`
          : ALL_FILTER_TITLE
      }
      className={cn('relative shrink-0 cursor-pointer dark:bg-card', className)}
      {...props}
    >
      <SlidersHorizontalIcon
        aria-hidden
        className={cn('size-4.25 md:size-4 text-foreground/70')}
      />
      {selectedCount > 0 && (
        <span
          aria-hidden
          className={cn(
            'absolute -top-1 -right-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-primary px-1 text-xs leading-none font-semibold text-primary-foreground',
          )}
        >
          {selectedCount}
        </span>
      )}
    </Button>
  );
}
