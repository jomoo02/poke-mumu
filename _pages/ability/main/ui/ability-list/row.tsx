import { memo } from 'react';

import { cn } from '@/_shared/lib/cn';
import { IntentPrefetchLink } from '@/_shared/ui/intent-prefetch-link';
import { getAbilityHref } from '@/_entities/ability';

import type { ListAbility } from '../../model/ability';
import AppearedBadge from './appeared-badge';

interface RowProps {
  ability: ListAbility;
}

// [번호  이름 ··········· 등장] 한 줄 카드. 설명은 상세에서 본다 (카드 모양은 전국도감 종족값 카드와 같다)
function Row({ ability }: RowProps) {
  return (
    <IntentPrefetchLink
      href={getAbilityHref(ability)}
      className={cn(
        'flex h-14 items-center gap-x-3.5 px-4 rounded-2xl bg-card border',
        '[@media(hover:hover)]:hover:bg-muted/70',
        'outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
      )}
    >
      <span className="w-9 shrink-0 text-sm font-medium tabular-nums text-foreground/70">
        {ability.abilityNumber.toString().padStart(3, '0')}
      </span>
      <span className="min-w-0 flex-1 truncate text-md font-medium">
        {ability.nameKo}
      </span>
      <AppearedBadge ability={ability} className="shrink-0" />
    </IntentPrefetchLink>
  );
}

export default memo(Row);
