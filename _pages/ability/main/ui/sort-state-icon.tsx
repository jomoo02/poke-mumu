import { cn } from '@/_shared/lib/cn';

import type { AbilitySort } from '../model/sort';

interface SortStateIconProps {
  // null: 이 기준으로 정렬하지 않음 (표 머리글의 다른 열)
  order: AbilitySort['order'] | null;
}

/**
 * 정렬 방향 삼각형 (위 = 오름, 아래 = 내림). 지금 방향만 칠한다.
 * 표 머리글이 쓴다.
 * 색은 글자색(currentColor)이 아니라 테두리 색으로 바로 칠한다.
 * 지금 방향은 선택 색(--primary), 나머지는 글자색 25%
 */
export default function SortStateIcon({ order }: SortStateIconProps) {
  return (
    <span aria-hidden="true" className="flex flex-col gap-0.75">
      <span
        className={cn(
          'size-0 border-x-4 border-x-transparent border-b-[5px]',
          order === 'asc' ? 'border-b-primary' : 'border-b-foreground/25',
        )}
      />
      <span
        className={cn(
          'size-0 border-x-4 border-x-transparent border-t-[5px]',
          order === 'desc' ? 'border-t-primary' : 'border-t-foreground/25',
        )}
      />
    </span>
  );
}
