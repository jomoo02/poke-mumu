'use client';

import { cn } from '@/shared/lib/cn';
import Link from 'next/link';
import { useParams } from 'next/navigation';

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

  return (
    <div className=" overflow-auto flex">
      <div className="p-1 bg-muted rounded-2xl gap-1 flex ">
        {regions.map((region) => (
          <Link
            key={region.identifier}
            href={`/pokedex/game/${versionGroup}/${region.identifier}`}
            className={cn(
              region.identifier === params.region
                ? 'bg-background shadow dark:bg-input/70'
                : 'text-foreground/50 hover:text-foreground',
              'px-4 h-9 inline-flex items-center rounded-xl font-medium border border-transparent',
              'focus-visible:ring-[3px] focus-visible:ring-ring/50 outline-none focus-visible:border-ring whitespace-nowrap',
            )}
          >
            {region.regionKo}
          </Link>
        ))}
      </div>
    </div>
  );
}
