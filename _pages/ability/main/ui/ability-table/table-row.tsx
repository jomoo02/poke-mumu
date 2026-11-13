import { memo } from 'react';

import { cn } from '@/_shared/lib/cn';
import { IntentPrefetchLink } from '@/_shared/ui/intent-prefetch-link';
import { getAbilityAppeared, getAbilityHref } from '@/_entities/ability';

import type { ListAbility } from '../../model/ability';

interface TableRowProps {
  ability: ListAbility;
}

// 열 너비(grid-cols)는 table-header · skeleton과 같은 값을 쓴다.
// 높이 고정 64px: 설명은 두 줄까지(line-clamp-2)라 어느 폭에서도 넘치지 않는다
function TableRow({ ability }: TableRowProps) {
  return (
    <div
      role="row"
      className={cn(
        'grid grid-cols-[minmax(9rem,1.75fr)_minmax(0,5fr)_6rem] items-center',
        'h-16 border-b last:border-b-0',
        'relative [@media(hover:hover)]:hover:bg-muted/70',
      )}
    >
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
      {/* 가장 긴 값 '챔피언스' + px-4에 맞춘 폭 */}
      <div role="cell" className="px-4 text-md whitespace-nowrap">
        {getAbilityAppeared(ability)}
      </div>
    </div>
  );
}

export default memo(TableRow);
