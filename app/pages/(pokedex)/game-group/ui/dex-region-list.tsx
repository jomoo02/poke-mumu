'use client';

import { useState } from 'react';

import { RegionalPokeView } from '../model';
import Regionaldex from './regionaldex';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/app/shared/lib/cn';

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

  return (
    <div className="grid py-4">
      {dexRegions.map((dex, index) => (
        <div key={dex.id} className="">
          <div className="max-w-7xl mx-auto w-full px-6">
            {index > 0 && <div className="w-full h-px bg-border my-2"></div>}
            <button
              onClick={() => handleToggle(dex.id)}
              className="text-2xl w-full font-semibold  rounded-xl px-4 py-6 flex justify-between items-center hover:bg-accent active:bg-accent "
            >
              <div>{dex.regionKo} 도감</div>
              <ChevronDown
                className={cn(
                  'size-8 transform duration-400',
                  visibleIds.has(dex.id) ? 'rotate-180' : '',
                )}
              />
            </button>
          </div>

          {visibleIds.has(dex.id) && <Regionaldex pokes={dex.entries} />}
        </div>
      ))}
    </div>
  );
}
