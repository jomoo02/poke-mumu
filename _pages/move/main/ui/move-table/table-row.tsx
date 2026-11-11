import { memo } from 'react';

import { cn } from '@/_shared/lib/cn';
import { IntentPrefetchLink } from '@/_shared/ui/intent-prefetch-link';
import { getMoveHref } from '@/_entities/move';
import { TypeIcon } from '@/_entities/type';
import { DamageClassIcon } from '@/_entities/damage-class';

import type { ListMove } from '../../model/move';
import MoveStatValue from '../move-stat-value';
import { BODY_ROW_CLASS, GRID_CLASS } from './table-layout';

interface TableRowProps {
  move: ListMove;
}

function TableRow({ move }: TableRowProps) {
  return (
    <div
      role="row"
      className={cn(
        // 머리글과 같은 grid (열이 어긋나지 않게)
        GRID_CLASS,
        BODY_ROW_CLASS,
        'relative [@media(hover:hover)]:hover:bg-muted/70',
      )}
    >
      <div role="cell" className="px-4 text-md tabular-nums">
        {move.moveNumber}
      </div>
      <div role="cell" className="min-w-0 px-4">
        {/* 상세 내용은 고를 뜻(hover · focus · touch)을 보일 때만 미리 받는다 */}
        <IntentPrefetchLink
          href={getMoveHref(move)}
          className={cn(
            'outline-none block min-w-0 truncate',
            'focus-visible:rounded-xs focus-visible:ring-[3px] focus-visible:ring-ring/50',
            'after:absolute after:inset-0',
          )}
        >
          <span className="text-md font-medium">{move.nameKo}</span>
        </IntentPrefetchLink>
      </div>
      {/* 접근 이름은 아이콘의 alt */}
      <div role="cell" className="flex px-4">
        <TypeIcon type={move.type} />
      </div>
      <div role="cell" className="flex px-4">
        {/* Z·다이맥스 기술은 분류가 없다. '-'는 스크린리더가 '대시'로 읽으므로 '없음'으로 읽힌다 */}
        {move.damageClass ? (
          <DamageClassIcon damageClass={move.damageClass} />
        ) : (
          <span className="text-md">
            <span aria-hidden>-</span>
            <span className="sr-only">없음</span>
          </span>
        )}
      </div>
      <div role="cell" className="px-4 text-right text-md">
        <MoveStatValue value={move.power} />
      </div>
      <div role="cell" className="px-4 text-right text-md">
        <MoveStatValue value={move.accuracy} />
      </div>
      <div role="cell" className="px-4 text-right text-md">
        <MoveStatValue value={move.pp} />
      </div>
      {/* 두 줄을 넘으면 '…'로 자른다. 잘린 전체 문장은 마우스를 올리면 보인다 */}
      <div role="cell" className="min-w-0 px-4">
        <p title={move.description} className="line-clamp-2 break-keep text-md">
          {move.description}
        </p>
      </div>
    </div>
  );
}

export default memo(TableRow);
