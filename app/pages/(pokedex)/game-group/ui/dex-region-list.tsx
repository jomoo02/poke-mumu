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
    <div className="grid gap-4">
      {dexRegions.map((dex) => (
        <div key={dex.id}>
          <div className="max-w-7xl mx-auto w-full px-6">
            <button
              onClick={() => handleToggle(dex.id)}
              className="text-2xl w-full border  font-semibold  border-border rounded-xl p-5 flex justify-between items-center shadow-sm shadow-border"
            >
              <div> {dex.regionKo} 도감</div>

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
