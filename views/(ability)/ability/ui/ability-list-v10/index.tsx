'use client';

import type { Ability } from '@/entities/ability/model';

import AbilityAccentTiles from './ability-accent-tiles';
import AbilityCellGrid from './ability-cell-grid';
import AbilityDividedGrid from './ability-divided-grid';
import AbilityInlineFlow from './ability-inline-flow';
import AbilityPills from './ability-pills';
import AbilityRuledColumns from './ability-ruled-columns';
import useAbilityList from './useAbilityList';

interface AbilityListProps {
  abilities: Ability[];
}

const VARIANTS: {
  label: string;
  Component: React.ComponentType<{ abilities: Ability[] }>;
}[] = [
  { label: 'A. 구분선 그리드', Component: AbilityDividedGrid },
  { label: 'B. 필', Component: AbilityPills },
  { label: 'C. 셀 그리드', Component: AbilityCellGrid },
  { label: 'D. 액센트 타일', Component: AbilityAccentTiles },
  { label: 'E. 신문 단', Component: AbilityRuledColumns },
  { label: 'F. 문장형 흐름', Component: AbilityInlineFlow },
];

export default function AbilityListV10({ abilities }: AbilityListProps) {
  const { filteredAbilities } = useAbilityList(abilities);

  return (
    <div className="flex flex-col gap-6">
      <div aria-live="polite" className="text-sm text-foreground/70">
        {filteredAbilities.length}개의 특성
      </div>
      {filteredAbilities.length === 0 ? (
        <div className="font-medium text-muted-foreground">
          일치하는 특성이 없습니다
        </div>
      ) : (
        <div className="flex flex-col gap-16">
          {VARIANTS.map(({ label, Component }) => (
            <section key={label} className="flex flex-col gap-4">
              <h2 className="text-sm font-medium text-muted-foreground">
                {label}
              </h2>
              <Component abilities={filteredAbilities} />
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
