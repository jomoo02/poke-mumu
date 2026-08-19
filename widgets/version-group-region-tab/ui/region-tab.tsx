'use client';

import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';

import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import type { Region } from '@/entities/version-group/api';
import { useScrollIntoViewOnClick } from '@/shared/model/useScrollIntoViewOnClick';

interface RegionTabProps {
  regions: Region[];
}

export default function RegionTab({ regions }: RegionTabProps) {
  const handleTabsTriggerClick = useScrollIntoViewOnClick({
    inline: 'center',
    selector: '[data-scroll-tabs-item]',
  });

  const params = useParams<{ region?: string[] }>();

  const searchParams = useSearchParams();

  const query = searchParams.toString();

  const suffix = query ? `?${query}` : '';

  const value = params.region ? params.region[0] : regions[0].identifier;

  const tabs = regions.map(
    ({ regionKo, identifier, isPrimary, versionGroup }) => {
      const pathname = isPrimary
        ? `/pokedex/game/${versionGroup.identifier}`
        : `/pokedex/game/${versionGroup.identifier}/${identifier}`;

      const href = `${pathname}${suffix}`;

      const content = regionKo;

      return {
        href,
        content,
        identifier,
      };
    },
  );

  return (
    <div className="border-b ">
      <Tabs className={'overflow-auto -mx-1 px-1'} value={value}>
        <TabsList variant={'line'} className={'px-0'}>
          {tabs.map(({ href, content, identifier }) => (
            <TabsTrigger
              key={identifier}
              value={identifier}
              nativeButton={false}
              data-scroll-tabs-item
              onClick={handleTabsTriggerClick}
              render={
                <Link href={href} replace className="rounded-lg">
                  {content}
                </Link>
              }
            />
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
