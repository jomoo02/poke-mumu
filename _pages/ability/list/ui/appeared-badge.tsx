import { cn } from '@/_shared/lib/cn';
import { getAbilityAppeared, type AbilityDetail } from '@/_entities/ability';

interface AppearedBadgeProps {
  ability: AbilityDetail;
  className?: string;
}

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
