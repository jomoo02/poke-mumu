import { cn } from '@/shared/lib/cn';

import type { VersionGroup } from '../model';

interface VersionGroupBadgeProps {
  versionGroup: Pick<VersionGroup, 'identifier' | 'nameKo'>;
  className?: string;
}

export function VersionGroupBadge({
  versionGroup,
  className,
}: VersionGroupBadgeProps) {
  return (
    <div className="bg-muted/70 py-1.25 px-2.5 rounded-lg w-fit flex items-center truncate">
      <span className={cn('text-sm font-medium', className)}>
        {versionGroup.nameKo}
      </span>
    </div>
  );
}
