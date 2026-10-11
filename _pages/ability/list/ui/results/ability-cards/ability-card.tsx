import Link from 'next/link';

import { cn } from '@/_shared/lib/cn';
import type { AbilityDetail } from '@/_entities/ability';
import { getAbilityHref, getAbilitySubName } from '@/_entities/ability';

import AppearedBadge from '../appeared-badge';

interface AbilityItemProps {
  ability: AbilityDetail;
}

export default function AbilityItem({ ability }: AbilityItemProps) {
  const href = getAbilityHref(ability);
  const subName = getAbilitySubName(ability);

  return (
    <li
      className={cn(
        'gap-4 flex flex-col py-4 relative rounded-2xl -mx-3 px-3 content-start',
        'before:absolute before:inset-x-3 before:top-0 before:h-px before:bg-border first:before:hidden',
        '[@media(hover:hover)]:hover:bg-muted/70',
        '[@media(hover:hover)]:hover:before:opacity-0 [@media(hover:hover)]:[li:hover+&]:before:opacity-0',
        'has-[a:focus-visible]:before:opacity-0 [li:has(a:focus-visible)+&]:before:opacity-0',
      )}
    >
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <Link
            href={href}
            className={cn(
              'text-lg font-medium',
              'after:absolute after:inset-0 after:rounded-2xl',
            )}
          >
            {ability.nameKo}
          </Link>
          <AppearedBadge ability={ability} className="h-fit" />
        </div>
        <div className="truncate text-sm text-foreground/70 font-medium">
          {subName}
        </div>
      </div>
      <p className="line-clamp-2 break-keep text-md w-[95%]">
        {ability.flavorText}
      </p>
    </li>
  );
}
