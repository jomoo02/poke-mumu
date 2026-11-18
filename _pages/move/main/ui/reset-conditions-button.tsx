import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';
import { focusVisibleFilterTrigger } from '@/_shared/ui/filter';

import { useFilterParam } from '../model/filter';
import { useKeywordParam } from '../model/search';

interface ResetConditionsButtonProps {
  className?: string;
}

/**
 * 개수 옆 [초기화]: 검색어·필터가 걸려 있을 때만 (정렬은 둔다. 빈 결과의 초기화와 같은 범위).
 * 누르면 사라지므로 포커스를 지금 보이는 첫 필터 트리거로
 */
export default function ResetConditionsButton({
  className,
}: ResetConditionsButtonProps) {
  const { keyword, clearKeyword } = useKeywordParam();
  const { isFilterActive, resetFilters } = useFilterParam();

  if (keyword === '' && !isFilterActive) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      aria-label="검색어·필터 초기화"
      onClick={() => {
        // 같은 틱의 두 쓰기는 nuqs가 URL 갱신 한 번으로 합친다
        clearKeyword();
        resetFilters();
        focusVisibleFilterTrigger();
      }}
      className={cn(
        '-mr-1 h-9.5 shrink-0 cursor-pointer rounded-lg px-1 text-sm',
        'hover:bg-transparent dark:hover:bg-transparent [@media(hover:hover)]:hover:opacity-70 active:opacity-70',
        className,
      )}
    >
      초기화
    </Button>
  );
}
