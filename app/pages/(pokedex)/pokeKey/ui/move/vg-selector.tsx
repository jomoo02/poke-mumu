// app/pages/(pokedex)/pokeKey/ui/move/vg-selector.tsx
'use client';

import { useMemo } from 'react';

import { cn } from '@/app/shared/lib/cn';
import type { AvailableVg } from '../../api/move';
import { Button } from '@/app/shared/ui/button';

interface VgSelectorProps {
  availableVgs: AvailableVg[];
  currentVg: number;
  onVgChange: (vg: number) => void;
}

export default function VgSelector({
  availableVgs,
  currentVg,
  onVgChange,
}: VgSelectorProps) {
  const byGeneration = useMemo(() => {
    const map = new Map<number, AvailableVg[]>();
    for (const vg of availableVgs) {
      if (!map.has(vg.generation)) {
        map.set(vg.generation, []);
      }
      map.get(vg.generation)!.push(vg);
    }
    return map;
  }, [availableVgs]);

  // 현재 vg가 속한 세대 (URL의 vg에서 역산)
  const activeGen = useMemo(() => {
    const found = availableVgs.find((v) => v.versionGroupId === currentVg);
    return found?.generation ?? availableVgs.at(-1)?.generation ?? null;
  }, [availableVgs, currentVg]);

  const generations = Array.from(byGeneration.keys());
  const currentVgsInGen =
    activeGen != null ? (byGeneration.get(activeGen) ?? []) : [];

  // 세대 클릭 → 그 세대의 첫 vg로 자동 전환
  const handleGenClick = (gen: number) => {
    const firstVg = byGeneration.get(gen)?.[0];
    if (firstVg) {
      onVgChange(firstVg.versionGroupId);
    }
  };

  if (availableVgs.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        학습 가능한 버전이 없어요.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* 1단: 세대 탭 */}
      <div className="overflow-x-auto">
        <div className="inline-flex items-center gap-1 p-1 rounded-full bg-muted dark:bg-card self-start ">
          {generations.map((gen) => {
            const isActive = gen === activeGen;
            return (
              <Button
                key={gen}
                variant={'ghost'}
                type="button"
                onClick={() => handleGenClick(gen)}
                className={cn(
                  'h-9',
                  isActive
                    ? 'bg-card text-foreground shadow-sm hover:bg-background dark:bg-input hover:dark:bg-input'
                    : 'text-muted-foreground hover:text-foreground hover:bg-transparent',
                )}
              >
                {gen}세대
              </Button>
            );
          })}
        </div>
      </div>

      {/* 2단: 선택된 세대의 vg 칩 (한 개여도 표시) */}
      {currentVgsInGen.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {currentVgsInGen.map((vg) => {
            const isActive = vg.versionGroupId === currentVg;
            return (
              <Button
                variant={'outline'}
                key={vg.versionGroupId}
                onClick={() => onVgChange(vg.versionGroupId)}
                className={cn(
                  isActive ? 'bg-muted dark:bg-muted dark:hover:bg-muted' : '',
                )}
              >
                {vg.nameKo}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}
