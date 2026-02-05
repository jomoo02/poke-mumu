'use client';

import {
  Table,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
  TableHead,
} from '@/app/shared/ui/table';
import { TypeIcon } from '@/app/entities/type/ui';
import { Type } from '@/app/entities/type/model';

import { type TypeDefenseView } from '../../model';

interface TypeDefensesProps {
  typeDefenses: TypeDefenseView[];
  types: Type[];
}

export default function TypeDefenses({
  typeDefenses,
  types,
}: TypeDefensesProps) {
  const getEffectivenessText = (effectiveness: number) => {
    if (effectiveness === 0) {
      return '무효';
    }
    if (effectiveness < 1) {
      return '내성';
    }
    if (effectiveness === 1) {
      return '보통';
    }
    return '약점';
  };

  const toMultiplier = (value: number): string => {
    const map: Record<number, string> = {
      0: '0',
      0.25: '0.25',
      0.5: '0.5',
      1: '1.0',
      2: '2.0',
      4: '4.0',
    };

    return map[value] ?? String(value);
  };

  const effectivenessTypeDefenses = [
    ...new Set(typeDefenses.map(({ effectiveness }) => effectiveness)),
  ]
    .sort((a, b) => b - a)
    .map((effective) => {
      const found = typeDefenses.filter(
        ({ effectiveness }) => effectiveness === effective,
      );

      return {
        effectivenessText: getEffectivenessText(effective),
        effective: toMultiplier(effective),
        types: found,
      };
    });

  const groupByEffectiveness = (list: TypeDefenseView[], targets: number[]) => {
    return targets.map((value) => ({
      effectiveness: toMultiplier(value),
      attacker: list
        .filter((item) => item.effectiveness === value)
        .map((item) => item.attacker),
    }));
  };
  const weak = groupByEffectiveness(typeDefenses, [4, 2]).filter(
    (group) => group.attacker.length > 0,
  );
  const normal = groupByEffectiveness(typeDefenses, [1]).filter(
    (group) => group.attacker.length > 0,
  );

  const immune = groupByEffectiveness(typeDefenses, [0]).filter(
    (group) => group.attacker.length > 0,
  );
  const resistant = groupByEffectiveness(typeDefenses, [0.5, 0.25]).filter(
    (group) => group.attacker.length > 0,
  );

  const data = [
    { types: weak, label: '약점' },
    { types: resistant, label: '내성' },
    { types: immune, label: '무시' },
    { types: normal, label: '보통' },
  ].filter(({ types }) => types.length > 0);

  return (
    <div className="">
      <h2 className="text-3xl font-semibold mb-6 ">방어 상성</h2>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-6">
        {typeDefenses.map((v) => (
          <div key={v.attacker.identifier} className="flex flex-col gap-2">
            <TypeIcon type={v.attacker} />
            <div className="text-center text-muted-foreground font-medium">
              x{v.effectiveness}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
