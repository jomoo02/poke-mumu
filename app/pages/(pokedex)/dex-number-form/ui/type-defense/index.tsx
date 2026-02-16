'use client';

import {
  Table,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
  TableHead,
  TableFooter,
} from '@/app/shared/ui/table';
import { TypeBadge, TypeIcon } from '@/app/entities/type/ui';
import { Type } from '@/app/entities/type/model';

import { type TypeDefenseView } from '../../model';
import { Fragment } from 'react/jsx-runtime';
import { cn } from '@/app/shared/lib/cn';

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
    {
      types: weak,
      label: '약점',
      bgColor: 'bg-red-500/15',
      textColor: 'text-red-600',
    },
    {
      types: resistant,
      label: '내성',
      bgColor: 'bg-green-500/15',
      textColor: 'text-green-700',
    },
    {
      types: immune,
      label: '무효',
      bgColor: 'bg-zinc-500/15',
      textColor: 'text-zinc-600',
    },
  ].filter(({ types }) => types.length > 0);

  return (
    <div className="flex flex-col overflow-hidden  ">
      <div className="grid grid-cols-3 sm:grid-cols-6 xl:grid-cols-9 gap-4 bg-muted/70 border rounded-2xl p-4">
        {typeDefenses.map((type) => (
          <div
            key={type.attacker.identifier}
            className="flex flex-col items-center justify-center bg-card p-4 rounded-xl border"
          >
            <TypeIcon type={type.attacker} className="size-7.5" />
            <div className="text-sm flex items-center pt-2">
              x{type.effectiveness}
            </div>
          </div>
        ))}
      </div>

      <div className="py-6">
        <div className=" overflow-hidden">
          <Table>
            {/* <TableHeader>
              <TableRow>
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHeader> */}
            <TableBody>
              {data.map(({ types, label, bgColor, textColor }) => (
                <TableRow key={label}>
                  <TableCell className="">
                    <span className={cn('text-sm sm:text-base ', textColor)}>
                      {label}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 flex-wrap">
                      {types.map((w) => (
                        <Fragment key={w.effectiveness}>
                          {w.attacker.map((t) => (
                            <div
                              key={t.identifier}
                              className={cn(
                                'flex gap-1 items-center px-2 py-1 rounded-md text-sm sm:text-base ',
                                bgColor,
                              )}
                            >
                              <span className="">{t.name}</span>
                              <span className={cn('', textColor)}>
                                x{w.effectiveness}
                              </span>
                            </div>
                          ))}
                        </Fragment>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            {/* <TableFooter>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableFooter> */}
          </Table>
        </div>
      </div>
    </div>
  );
}
