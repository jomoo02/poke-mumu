import Link from 'next/link';

import { cn } from '@/_shared/lib/cn';
import { getMoveHref, getMoveSubName, type Move } from '@/_entities/move';

interface MoveNameCellProps {
  move: Move;
}

// /move의 MoveNameCell에서 stretched link(after:inset-0)만 뺐다.
// 이름 칸이 sticky가 되면 after가 이 칸 안에만 깔리므로, 행 전체 클릭은 행의 오버레이 링크가 맡는다.
// 이 링크는 키보드 포커스·스크린리더용으로 남긴다
export default function MoveNameCell({ move }: MoveNameCellProps) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <Link
        href={getMoveHref(move)}
        className={cn(
          'relative truncate font-medium outline-none max-lg:text-md',
          'focus-visible:rounded-sm focus-visible:ring-[3px] focus-visible:ring-ring/50',
        )}
      >
        {move.nameKo}
      </Link>
      {/* lg 미만은 고정 칸 폭이 좁아 영·일 이름을 숨긴다 */}
      <div className="hidden truncate text-sm font-medium text-foreground/70 lg:block">
        {getMoveSubName(move)}
      </div>
    </div>
  );
}
