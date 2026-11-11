import { cn } from '@/_shared/lib/cn';
import { getAbilityAppeared } from '@/_entities/ability';

import type { ListAbility } from '../../model/ability';

interface AppearedBadgeProps {
  ability: ListAbility;
  className?: string;
}

// 등장 세대 ('3세대', '챔피언스')
export default function AppearedBadge({
  ability,
  className,
}: AppearedBadgeProps) {
  return (
    <span
      className={cn(
        'block w-fit truncate rounded-md bg-muted px-2 py-1 text-xs font-medium text-foreground/70',
        className,
      )}
    >
      {getAbilityAppeared(ability)}
    </span>
  );
}
