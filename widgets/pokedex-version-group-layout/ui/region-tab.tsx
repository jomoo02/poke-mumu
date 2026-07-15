'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { cn } from '@/shared/lib/cn';

interface RegionTabProps {
  versionGroup: string;
  regions: {
    versionGroup: {
      identifier: string;
      nameKo: string;
    };
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
          // <Link
          //   key={region.identifier}
          //   href={`/pokedex/game/${versionGroup}/${region.identifier}`}
          //   className={cn(
          //     region.identifier === params.region
          //       ? 'bg-background shadow dark:bg-input/70'
          //       : 'text-foreground/50 hover:text-foreground',
          //     'px-4 h-9 inline-flex items-center rounded-xl font-medium border border-transparent',
          //     'focus-visible:ring-[3px] focus-visible:ring-ring/50 outline-none focus-visible:border-ring whitespace-nowrap',
          //   )}
          // >
          //   {region.regionKo}
          // </Link>
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
