import Link from 'next/link';

import { cn } from '@/_shared/lib/cn';
import { getMoveHref, getMoveSubName, type Move } from '@/_entities/move';

interface MoveNameCellProps {
  move: Move;
}

export default function MoveNameCell({ move }: MoveNameCellProps) {
  return (
    <div className="flex flex-col gap-1">
      {/* after:absolute inset-0 — relative인 행 전체를 덮는 stretched link */}
      <Link
        href={getMoveHref(move)}
        className={cn(
          'truncate font-medium outline-none',
          'focus-visible:rounded-sm focus-visible:ring-[3px] focus-visible:ring-ring/50',
          'after:absolute after:inset-0 after:rounded-2xl',
        )}
      >
        {move.nameKo}
      </Link>
      <div className="truncate text-sm font-medium text-foreground/70">
        {getMoveSubName(move)}
      </div>
    </div>
  );
}
