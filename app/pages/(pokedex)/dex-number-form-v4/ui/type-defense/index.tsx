'use client';

import {
  Table,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
  TableHead,
} from '@/app/shared/ui/table';
import { TypeBadge, TypeIcon } from '@/app/entities/type/ui';
import { Type } from '@/app/entities/type/model';

import { type TypeDefenseView } from '../../model';
import { Fragment } from 'react/jsx-runtime';

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
    { types: normal, label: '보통' },
    { types: resistant, label: '내성' },
    { types: immune, label: '무효' },
  ].filter(({ types }) => types.length > 0);

  return (
    <div className="">
      <h3 className="text-2xl font-bold mb-4 w-full">방어 상성</h3>
      {/* <div className="h-1 bg-linear-to-r from-border to-border/60 rounded-xl mb-6 " /> */}
      {/* <div className="grid grid-cols-3 sm:grid-cols-6 gap-6">
        {typeDefenses.map((v) => (
          <div
            key={v.attacker.identifier}
            className="flex flex-col gap-2 items-center"
          >
            <TypeIcon type={v.attacker} className="size-7.5" />
            <div className="text-center text-muted-foreground font-medium">
              x{v.effectiveness}
            </div>
          </div>
        ))}
      </div> */}

      <div className="grid lg:grid-cols-2 gap-12">
        {data.map(({ types, label }, index) => (
          <div
            key={label}
            className="flex flex-col gap-2 p-6 rounded-2xl bg-muted/70"
          >
            <div className="font-medium flex text-lg">{label}</div>
            <div className="lg:col-span-3 flex flex-wrap gap-8 flex-1">
              {types.map(({ effectiveness, attacker }) => (
                <Fragment key={effectiveness}>
                  {attacker.map((type) => (
                    <div key={type.identifier} className="">
                      <div className="flex flex-col items-center gap-1">
                        {/* <TypeIcon type={type} /> */}
                        <TypeBadge type={type} className="w-18" />
                        <div className="text-sm">x {effectiveness}</div>
                      </div>
                    </div>
                  ))}
                </Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* <div className="grid lg:grid-cols-3">
        <div className="text-xl flex justify-center items-center">약점</div>
        <div className="lg:col-span-2">
          {weak.map(({ effectiveness, attacker }) => (
            <div key={effectiveness}>
              <div className="bg-muted">{effectiveness}</div>
              <div className="grid grid-cols-4">
                {attacker.map((type) => (
                  <div key={type.identifier} className="flex">
                    <div className="flex flex-col items-center gap-1">
                      <TypeIcon type={type} />
                      <div className="text-muted-foreground font-medium text-sm">
                        {type.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-px bg-border" />
      <div className="grid lg:grid-cols-3">
        <div className="text-xl flex justify-center items-center">내성</div>
        <div className="lg:col-span-2">
          {resistant.map(({ effectiveness, attacker }) => (
            <div key={effectiveness}>
              <div className="bg-muted">{effectiveness}</div>
              <div className="grid grid-cols-4">
                {attacker.map((type) => (
                  <div key={type.identifier} className="flex">
                    <div className="flex flex-col items-center gap-1">
                      <TypeIcon type={type} />
                      <div className="text-muted-foreground font-medium text-sm">
                        {type.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
