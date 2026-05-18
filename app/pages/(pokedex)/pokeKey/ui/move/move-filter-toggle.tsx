// app/pages/(pokedex)/pokeKey/ui/move/move-filter-toggles.tsx
'use client';

import { Type } from '@/app/entities/type/model';
import { TypeIconV3 } from '@/app/entities/type/ui';
import { cn } from '@/app/shared/lib/cn';
import { Button } from '@/app/shared/ui/button';

interface FacetItem {
  identifier: string;
  nameKo: string;
  count: number;
}

interface FilterChipProps {
  label: string;
  count: number;
  active: boolean;

  onClick: () => void;
}

function FilterChip({ label, count, active, onClick }: FilterChipProps) {
  return (
    <Button
      variant={'outline'}
      onClick={onClick}
      className={cn(
        'h-9',
        active ? 'bg-muted dark:bg-muted hover:dark:bg-muted' : '',
      )}
    >
      <span>{label}</span>
    </Button>
  );
}

interface MoveFilterTogglesProps {
  learnMethods: FacetItem[];
  selectedLearnMethods: Set<string>;
  onToggleLearnMethod: (id: string) => void;
  types: FacetItem[];
  selectedTypes: Set<string>;
  onToggleType: (id: string) => void;
  onClearAll?: () => void;
}

export default function MoveFilterToggles({
  learnMethods,
  selectedLearnMethods,
  onToggleLearnMethod,
  types,
  selectedTypes,
  onToggleType,
  onClearAll,
}: MoveFilterTogglesProps) {
  const hasAnyFilter = selectedLearnMethods.size > 0 || selectedTypes.size > 0;

  return (
    <div className="@container">
      <div className="grid gap-6">
        {learnMethods.length > 1 && (
          <div className="flex flex-col gap-1.5">
            <span className="text-xs text-muted-foreground">학습 방법</span>
            <div className="flex flex-wrap gap-1.5">
              {learnMethods.map((m) => (
                <FilterChip
                  key={m.identifier}
                  label={m.nameKo}
                  count={m.count}
                  active={selectedLearnMethods.has(m.identifier)}
                  onClick={() => onToggleLearnMethod(m.identifier)}
                />
              ))}
            </div>
          </div>
        )}

        {types.length > 1 && (
          <div className="flex flex-col gap-1.5">
            <span className="text-xs text-muted-foreground">타입</span>
            <div className="flex flex-wrap gap-1.5">
              {types.map((t) => (
                <FilterChip
                  key={t.identifier}
                  label={t.nameKo}
                  count={t.count}
                  active={selectedTypes.has(t.identifier)}
                  onClick={() => onToggleType(t.identifier)}
                />
              ))}
            </div>
          </div>
        )}

        {hasAnyFilter && onClearAll && (
          <button
            type="button"
            onClick={onClearAll}
            className="self-start text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
          >
            필터 초기화
          </button>
        )}
      </div>
    </div>
  );
}
