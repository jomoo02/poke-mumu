import { memo } from 'react';

import { cn } from '@/_shared/lib/cn';
import { IntentPrefetchLink } from '@/_shared/ui/intent-prefetch-link';
import { getAbilityHref } from '@/_entities/ability';

import type { ListAbility } from '../../model/ability';
import AppearedBadge from './appeared-badge';

interface AbilityCardProps {
  ability: ListAbility;
}

function AbilityCard({ ability }: AbilityCardProps) {
  return (
    <IntentPrefetchLink
      href={getAbilityHref(ability)}
      className={cn(
        'flex h-full flex-col gap-y-1.5 px-4 py-3.5 rounded-2xl bg-card border',
        '[@media(hover:hover)]:hover:bg-muted/70',
        'outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
        'flex gap-x-3.5',
      )}
    >
      <div className="flex justify-between gap-x-3.5">
        <span className="min-w-0 flex-1 truncate text-base font-medium">
          {ability.nameKo}
        </span>
        <div className="w-14.5 flex justify-end h-6">
          <AppearedBadge ability={ability} className="shrink-0 h-fit" />
        </div>
      </div>
      <p className="line-clamp-2 break-keep text-md text-foreground/70 h-10.5 max-w-[90%]">
        {ability.flavorText}
      </p>
    </IntentPrefetchLink>
  );
}

export default memo(AbilityCard);
