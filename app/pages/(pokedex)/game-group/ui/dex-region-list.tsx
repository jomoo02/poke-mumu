'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/app/shared/lib/cn';
import { Button } from '@/app/shared/ui/button';
import { RegionalPokeView } from '../model';
import Regionaldex from './regional-dex';

interface DexRegionListProps {
  dexRegions: {
    entries: RegionalPokeView[];
    id: number;
    region: string;
    regionKo: string | null;
  }[];
}

export default function DexRegionList({ dexRegions }: DexRegionListProps) {
  const [visibleIds, setVisibleIds] = useState<Set<number>>(() => {
    const set: Set<number> = new Set();
    set.add(dexRegions[0].id);
    return set;
  });

  const handleToggle = (id: number) => {
    setVisibleIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const collapsible = dexRegions.length > 1;

  return (
    <div className="max-w-7xl w-full mx-auto">
      {dexRegions.map((dex, index) => (
        <div key={dex.id}>
          {collapsible ? (
            <div className="relative">
              {index > 0 && <div className="w-full h-px bg-border my-3" />}
              <Button
                variant={'ghost'}
                onClick={() => handleToggle(dex.id)}
                data-dex-h2={`${dex.regionKo} 도감`}
                data-dex-range={`No.${dex.entries[0].regionalDexNumber} ~ ${dex.entries.at(-1)?.regionalDexNumber}`}
                className=" w-full rounded-4xl px-0 h-14 sm:h-16 flex justify-between items-center hover:bg-transparent dark:hover:bg-transparent group"
              >
                <div className="flex items-end gap-x-4">
                  <h2 className="text-xl font-semibold group-hover:underline underline-offset-4 break-keep text-pretty">
                    {dex.regionKo} 도감
                  </h2>
                  <div className="text-muted-foreground text-base font-medium">
                    {`No.${dex.entries[0].regionalDexNumber} ~
                  ${dex.entries.at(-1)?.regionalDexNumber}`}
                  </div>
                </div>

                <ChevronDown
                  className={cn(
                    'size-8 transform duration-400',
                    visibleIds.has(dex.id) ? 'rotate-180' : '',
                  )}
                />
              </Button>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-x-4 h-14 sm:h-16">
                <h2
                  className="text-xl font-semibold break-keep text-pretty"
                  data-dex-h2={`${dex.regionKo} 도감`}
                  data-dex-range={`No.${dex.entries[0].regionalDexNumber} ~ ${dex.entries.at(-1)?.regionalDexNumber}`}
                >
                  {dex.regionKo} 도감
                </h2>
                <div className="text-muted-foreground text-base font-medium">
                  {`No.${dex.entries[0].regionalDexNumber} ~
                  ${dex.entries.at(-1)?.regionalDexNumber}`}
                </div>
              </div>
            </div>
          )}

          {visibleIds.has(dex.id) && (
            <div className="py-6">
              <Regionaldex pokes={dex.entries} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
