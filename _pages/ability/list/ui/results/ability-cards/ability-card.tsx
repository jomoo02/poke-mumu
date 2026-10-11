import Link from 'next/link';

import { cn } from '@/_shared/lib/cn';
import {
  getAbilityHref,
  getAbilitySubName,
  type AbilityDetail,
} from '@/_entities/ability';

import AppearedBadge from '../appeared-badge';

interface AbilityCardProps {
  ability: AbilityDetail;
}

export default function AbilityCard({ ability }: AbilityCardProps) {
  const href = getAbilityHref(ability);
  const subName = getAbilitySubName(ability);

  return (
    <li
      className={cn(
        'gap-5 flex flex-col py-5 relative rounded-2xl -mx-3 px-3 content-start',
        'before:absolute before:inset-x-3 before:top-0 before:h-px before:bg-border first:before:hidden',
        '[@media(hover:hover)]:hover:bg-muted/70',
        '[@media(hover:hover)]:hover:before:opacity-0 [@media(hover:hover)]:[li:hover+&]:before:opacity-0',
        'has-[a:focus-visible]:before:opacity-0 [li:has(a:focus-visible)+&]:before:opacity-0',
      )}
    >
      <div className="flex flex-col gap-2.5">
        <span className="text-sm font-medium tabular-nums text-foreground/70">
          #{ability.abilityNumber}
        </span>

        <div className="flex flex-col gap-0.5">
          <div className="flex justify-between gap-4">
            <Link
              href={href}
              className={cn(
                'truncate text-lg font-medium',
                'after:absolute after:inset-0 after:rounded-2xl',
              )}
            >
              {ability.nameKo}
            </Link>
            <AppearedBadge ability={ability} className="h-fit shrink-0" />
          </div>
          <div className="truncate text-sm text-foreground/70 font-medium">
            {subName}
          </div>
        </div>
      </div>
      <p className="line-clamp-2 break-keep text-md w-[95%]">
        {ability.flavorText}
      </p>
    </li>
  );
}
