import { cn } from '@/_shared/lib/cn';

import type { MoveSort } from '../model/sort';

interface SortStateIconProps {
  // null: 이 기준으로 정렬하지 않음 (표 머리글의 다른 열)
  order: MoveSort['order'] | null;
}

/**
 * 정렬 방향 삼각형 (위 = 오름, 아래 = 내림). 지금 방향만 칠한다.
 * 표 머리글과 정렬 메뉴·시트가 같이 쓴다.
 * 색은 글자색(currentColor)이 아니라 테두리 색으로 바로 칠한다:
 * 메뉴 항목의 focus:**:text-accent-foreground가 자손 글자색을 덮어 hover 때 방향이 안 보이기 때문.
 * #1447e6: 라이트 테마 primary 고정 값. 정렬 메뉴 팝업은 늘 dark라 --primary(다크 값)는 대비가 낮다 (토큰은 추후)
 */
export default function SortStateIcon({ order }: SortStateIconProps) {
  return (
    <span aria-hidden="true" className="flex flex-col gap-0.75">
      <span
        className={cn(
          'size-0 border-x-4 border-x-transparent border-b-[5px]',
          order === 'asc' ? 'border-b-[#1447e6]' : 'border-b-foreground/25',
        )}
      />
      <span
        className={cn(
          'size-0 border-x-4 border-x-transparent border-t-[5px]',
          order === 'desc' ? 'border-t-[#1447e6]' : 'border-t-foreground/25',
        )}
      />
    </span>
  );
}
