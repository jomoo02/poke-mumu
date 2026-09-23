'use client';

import type { Ability } from '@/entities/ability/model';

import AbilityTableHeader from './header';
import AbilityTableRow from './row';
import { useAbilitySort } from '../../lib/ability-sort';

interface AbilityTableProps {
  abilities: Ability[];
}

export default function AbilityTable({ abilities }: AbilityTableProps) {
  const { sort, toggleSort } = useAbilitySort();

  return (
    <table className="border-separate border-spacing-0 xl:h-1">
      <AbilityTableHeader sort={sort} onToggleSort={toggleSort} />
      <tbody>
        {abilities.map((ability) => (
          <AbilityTableRow key={ability.identifier} ability={ability} />
        ))}
      </tbody>
    </table>
  );
}
