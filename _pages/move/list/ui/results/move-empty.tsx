'use client';

import { RotateCwIcon } from 'lucide-react';

import { cn } from '@/_shared/lib/cn';
import { Button } from '@/_shared/ui/button';
import { focusVisibleFilterTrigger } from '@/_shared/ui/filter';

import { useMoveFilter } from '../../model/move-filter';

// 결과 0개. 필터가 켜져 있으면 바로 풀 수 있게 초기화 버튼을 둔다 (검색어는 사용자가 입력한 값이라 두고)
export default function MoveEmpty() {
  const { isActive, reset } = useMoveFilter();

  return (
    <div className="flex flex-col items-start gap-1 py-6">
      <p className="font-medium">조건에 맞는 기술이 없어요</p>
      <p className="text-sm text-muted-foreground">
        {isActive
          ? '필터를 줄이거나 검색어를 바꿔 보세요'
          : '검색어를 바꿔 보세요'}
      </p>
      {isActive && (
        <Button
          variant="secondary"
          onClick={() => {
            reset();
            // 이 버튼은 사라지므로 포커스를 지금 보이는 필터 트리거로
            focusVisibleFilterTrigger();
          }}
          className={cn(
            'mt-3 h-10.5 px-4',
            'bg-input/50 dark:bg-input/70',
            '[@media(hover:hover)]:hover:bg-input/70 dark:[@media(hover:hover)]:hover:bg-input',
          )}
        >
          <RotateCwIcon aria-hidden />
          필터 초기화
        </Button>
      )}
    </div>
  );
}
