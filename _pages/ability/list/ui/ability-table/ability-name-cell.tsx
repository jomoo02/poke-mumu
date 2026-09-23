import Link from 'next/link';

import { cn } from '@/_shared/lib/cn';
import {
  getAbilityHref,
  getAbilitySubName,
  type AbilityDetail,
} from '@/_entities/ability/model';

interface AbilityNameCellProps {
  ability: AbilityDetail;
}

export default function AbilityNameCell({ ability }: AbilityNameCellProps) {
  return (
    <div className="flex flex-col gap-1">
      {/* after:absolute inset-0 — relative인 행 전체를 덮는 stretched link */}
      <Link
        href={getAbilityHref(ability)}
        className={cn(
          'truncate font-semibold outline-none',
          'focus-visible:rounded-sm focus-visible:ring-[3px] focus-visible:ring-ring/50',
          'after:absolute after:inset-0 after:rounded-2xl',
        )}
      >
        {ability.nameKo}
      </Link>
      <div className="truncate text-sm font-medium text-foreground/70">
        {getAbilitySubName(ability)}
      </div>
    </div>
  );
}
