'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { cn } from '@/shared/lib/cn';

interface RegionTabProps {
  versionGroup: string;
  regions: {
    regionKo: string | null;
    identifier: string;
  }[];
}

export default function RegionTab({ versionGroup, regions }: RegionTabProps) {
  const params = useParams<{ region: string }>();

  if (regions.length === 1) {
    return null;
  }

  return (
    <div className="border-b">
      <div className=" overflow-auto flex gap-1 p-1 -m-1">
        {regions.map((region) => (
          <RegionTabItem
            key={region.identifier}
            href={`/pokedex/game/${versionGroup}/${region.identifier}`}
            className={
              region.identifier === params.region
                ? 'font-medium border-b-foreground'
                : 'hover:text-foreground active:text-foreground text-foreground/70'
            }
          >
            {region.regionKo}
          </RegionTabItem>
        ))}
      </div>
    </div>
  );
}

interface RegionTabItemProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

function RegionTabItem({ href, className, children }: RegionTabItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center px-3 py-2 h-11 gap-x-2 border-b-2 border-transparent relative',
        className,
      )}
    >
      <div className="text-md">{children}</div>
    </Link>
  );
}
