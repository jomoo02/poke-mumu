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
import { TypeBadge, TypeIcon, TypeIconV2 } from '@/app/entities/type/ui';
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

  const groupByEffectivenessV2 = (list: TypeDefenseView[], target: number) => {
    return list
      .filter((item) => item.effectiveness === target)
      .map((item) => item.attacker);
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

  const dataWeak2 = [
    {
      label: `x${toMultiplier(4)}`,
      types: groupByEffectivenessV2(typeDefenses, 4),
      textColor: 'text-red-800',
    },
    {
      label: `x${toMultiplier(2)}`,
      types: groupByEffectivenessV2(typeDefenses, 2),
      textColor: 'text-red-500',
    },
  ];
  const dataResistant2 = [
    {
      label: `x${toMultiplier(0.5)}`,
      types: groupByEffectivenessV2(typeDefenses, 0.5),
      textColor: 'text-green-900',
    },
    {
      label: `x${toMultiplier(0.25)}`,
      types: groupByEffectivenessV2(typeDefenses, 0.25),
      textColor: 'text-green-700',
    },
  ];
  const dataImmune = [
    {
      label: `x${toMultiplier(0)}`,
      types: groupByEffectivenessV2(typeDefenses, 0),
      textColor: 'text-zinc-900',
    },
  ];

  const datas = [
    {
      label: '약점',
      items: [
        {
          multiple: `x${toMultiplier(4)}`,
          types: groupByEffectivenessV2(typeDefenses, 4),
        },
        {
          multiple: `x${toMultiplier(2)}`,
          types: groupByEffectivenessV2(typeDefenses, 2),
        },
      ],
      color: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300',
    },
    {
      label: '내성',
      items: [
        {
          multiple: `x${toMultiplier(0.5)}`,
          types: groupByEffectivenessV2(typeDefenses, 0.5),
        },
        {
          multiple: `x${toMultiplier(0.25)}`,
          types: groupByEffectivenessV2(typeDefenses, 0.25),
        },
      ],
      color: 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300',
    },
    {
      label: '무효',
      items: [
        {
          multiple: `x${toMultiplier(0)}`,
          types: groupByEffectivenessV2(typeDefenses, 0),
        },
      ],
      color: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-950 dark:text-zinc-300',
    },
  ];

  return (
    <div className="flex flex-col overflow-hidden bg-card">
      <div className="flex flex-col gap-6">
        {datas.map(({ label, items, color }) => (
          <div key={label}>
            <h3 className="text-lg font-semibold mb-2">{label}</h3>
            <div className="">
              {items.map(({ multiple, types }) => (
                <div
                  key={multiple}
                  className="flex items-center gap-4 py-2 border-t"
                >
                  <div className="w-20 shrink-0">
                    <div
                      className={cn(
                        'px-2.5 py-1 bg-muted rounded-md font-medium text-sm inline-flex',
                        color,
                      )}
                    >
                      {multiple}
                    </div>
                  </div>

                  {types.length === 0 ? (
                    <div className="w-full h-full">-</div>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {types.map((type) => (
                        <TypeIconV2
                          key={type.identifier}
                          type={type}
                          className="size-7.5"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* <div className="grid  gap-6">
        <div>
          <Table className="border-separate border-spacing-0">
            <TableHeader>
              <TableRow>
                <TableHead
                  colSpan={2}
                  className="bg-muted/70 rounded-md text-muted-foreground"
                >
                  약점
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataWeak2.map((weak, idx) => (
                <TableRow key={weak.label}>
                  <TableCell
                    className={cn(
                      weak.textColor,
                      'font-medium w-18',
                      idx === dataWeak2.length - 1 ? '' : 'border-b',
                    )}
                  >
                    {weak.label}
                  </TableCell>
                  <TableCell
                    className={cn(
                      idx === dataWeak2.length - 1 ? '' : 'border-b',
                    )}
                  >
                    {weak.types.length === 0 ? (
                      <div className="w-full h-full">-</div>
                    ) : (
                      <div className=" flex gap-2 flex-wrap">
                        {weak.types.map((type) => (
                          <TypeIconV2
                            key={type.identifier}
                            type={type}
                            className="size-7.5"
                          />
                        ))}
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div>
          <Table className="border-separate border-spacing-0">
            <TableHeader>
              <TableRow>
                <TableHead
                  colSpan={2}
                  className="bg-muted/70 rounded-md text-muted-foreground"
                >
                  내성
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataResistant2.map((weak, idx) => (
                <TableRow key={weak.label}>
                  <TableCell
                    className={cn(
                      weak.textColor,
                      'font-medium w-18',
                      idx === dataResistant2.length - 1 ? '' : 'border-b',
                    )}
                  >
                    {weak.label}
                  </TableCell>
                  <TableCell
                    className={cn(
                      idx === dataResistant2.length - 1 ? '' : 'border-b',
                    )}
                  >
                    {weak.types.length === 0 ? (
                      <div className="w-full h-full">-</div>
                    ) : (
                      <div className=" flex gap-2 flex-wrap">
                        {weak.types.map((type) => (
                          <TypeIconV2
                            key={type.identifier}
                            type={type}
                            className="size-7.5"
                          />
                        ))}
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div>
          <Table className="border-separate border-spacing-0">
            <TableHeader className="">
              <TableRow>
                <TableHead
                  colSpan={2}
                  className="bg-muted/70 rounded-md text-muted-foreground"
                >
                  무효
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataImmune.map((weak, idx) => (
                <TableRow key={weak.label}>
                  <TableCell
                    className={cn(
                      weak.textColor,
                      'font-medium w-18',
                      idx === dataImmune.length - 1 ? '' : 'border-b',
                    )}
                  >
                    {weak.label}
                  </TableCell>
                  <TableCell
                    className={cn(
                      idx === dataImmune.length - 1 ? '' : 'border-b',
                    )}
                  >
                    {weak.types.length === 0 ? (
                      <div className="w-full h-full">-</div>
                    ) : (
                      <div className=" flex gap-2 flex-wrap">
                        {weak.types.map((type) => (
                          <TypeIconV2
                            key={type.identifier}
                            type={type}
                            className="size-7.5"
                          />
                        ))}
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div> */}

      {/* <div className="mt-4">
        <div className=" overflow-hidden">
          <Table>
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
          </Table>
        </div>
      </div> */}
    </div>
  );
}
