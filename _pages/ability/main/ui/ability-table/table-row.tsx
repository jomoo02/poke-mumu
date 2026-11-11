import { memo } from 'react';

import { cn } from '@/_shared/lib/cn';
import { IntentPrefetchLink } from '@/_shared/ui/intent-prefetch-link';
import { getAbilityAppeared, getAbilityHref } from '@/_entities/ability';

import type { ListAbility } from '../../model/ability';
import { BODY_ROW_CLASS, GRID_CLASS } from './table-layout';

interface TableRowProps {
  ability: ListAbility;
}

function TableRow({ ability }: TableRowProps) {
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
        {ability.abilityNumber}
      </div>
      <div role="cell" className="min-w-0 px-4">
        {/* 상세 내용은 고를 뜻(hover · focus · touch)을 보일 때만 미리 받는다 */}
        <IntentPrefetchLink
          href={getAbilityHref(ability)}
          className={cn(
            'outline-none block min-w-0 truncate',
            'focus-visible:rounded-xs focus-visible:ring-[3px] focus-visible:ring-ring/50',
            'after:absolute after:inset-0',
          )}
        >
          <span className="text-md font-medium">{ability.nameKo}</span>
        </IntentPrefetchLink>
      </div>
      <div role="cell" className="min-w-0 px-4">
        <p className="line-clamp-2 break-keep text-md">{ability.flavorText}</p>
      </div>
      <div role="cell" className="px-4 text-md">
        {getAbilityAppeared(ability)}
      </div>
    </div>
  );
}

export default memo(TableRow);
