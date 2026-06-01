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
    <div>
      {regions.map((region) => (
        <Link
          key={region.identifier}
          href={`/pokedex/game/${versionGroup}/${region.identifier}`}
          className={cn(
            region.identifier === params.region ? 'bg-amber-500' : '',
          )}
        >
          {region.regionKo}
        </Link>
      ))}
    </div>
  );
}
