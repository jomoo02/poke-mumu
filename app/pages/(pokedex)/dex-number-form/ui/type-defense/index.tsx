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
    { types: resistant, label: '내성' },
    { types: immune, label: '무시' },
    { types: normal, label: '보통' },
  ].filter(({ types }) => types.length > 0);

  return (
    <div className="flex flex-col  gap-6 ">
      <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-9 gap-6">
        {typeDefenses.map((type) => (
          <div
            key={type.attacker.identifier}
            className="flex flex-col items-center justify-center"
          >
            <TypeIcon type={type.attacker} className="size-7.5" />
            <div className="h-8 text-sm font-medium flex items-center">
              x{type.effectiveness}
            </div>
          </div>
        ))}
      </div>
      <div className="flex">
        <div className="flex items-start min-w-24">
          {' '}
          <div className="py-1.5 px-3 bg-red-500/15 text-red-600 text-sm rounded-lg flex truncate">
            약점
          </div>
        </div>

        <div className="flex gap-6 flex-wrap">
          {weak.map((w) => (
            <Fragment key={w.effectiveness}>
              {w.attacker.map((t) => (
                <div
                  key={t.identifier}
                  className="flex gap-1.5 items-center px-3 py-1.5 bg-red-500/15 text-sm rounded-lg"
                >
                  <span className="font-medium">{t.name}</span>
                  <span className="text-red-600 font-medium ">
                    x{w.effectiveness}
                  </span>
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
      <div className="flex">
        <div className="flex items-start min-w-24">
          <div className="py-1.5 px-3 bg-green-500/15 text-green-700 text-sm rounded-lg truncate">
            내성
          </div>
        </div>

        <div className="flex gap-6 flex-wrap">
          {resistant.map((w) => (
            <Fragment key={w.effectiveness}>
              {w.attacker.map((t) => (
                <div
                  key={t.identifier}
                  className="flex gap-1.5 items-center bg-green-500/15 text-sm px-3 py-1.5 rounded-lg"
                >
                  <span className="font-medium">{t.name}</span>
                  <span className="  text-green-700 font-medium  ">
                    x{w.effectiveness}
                  </span>
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
      <div className="flex">
        <div className="flex items-start min-w-24">
          <div className="py-1.5 px-3 bg-zinc-500/15 text-zinc-700 text-sm rounded-lg truncate">
            무효
          </div>
        </div>

        <div className="flex gap-6 flex-wrap">
          {immune.map((w) => (
            <Fragment key={w.effectiveness}>
              {w.attacker.map((t) => (
                <div
                  key={t.identifier}
                  className="flex gap-1.5 items-center bg-zinc-500/15 text-sm px-3 py-1.5 rounded-lg"
                >
                  <span className="font-medium">{t.name}</span>
                  <span className="  text-zinc-700 font-medium  ">
                    x{w.effectiveness}
                  </span>
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
      {/* <div className="w-full">
        <div className=" text-muted-foreground text-center pb-1 text-xs font-medium">
          기준 타입
        </div>
        <div className="flex gap-2 w-full  text-muted-foreground justify-center">
          {types.map((type) => (
            <div
              key={type.identifier}
              className="flex flex-col gap-1 items-center"
            >
              <TypeIcon type={type} className="size-7" />
              <div className="text-sm text-center text-muted-foreground font-medium">
                {type.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 max-w-4xl w-full mx-auto">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center  text-sm font-medium  ">
                배율
              </TableHead>
              <TableHead className="   px-2 sm:px-4 font-medium text-sm ">
                <div className="gap-4 grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-6   h-full ">
                  <div className="text-center flex items-center w-full justify-center">
                    타입
                  </div>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {effectivenessTypeDefenses.map(
              ({ effective, types, effectivenessText }) => (
                <TableRow
                  key={effective}
                  className="border-border hover:bg-transparent"
                >
                  <TableCell className="px-2 sm:px-4 sm:w-20 text-center">
                    x {effective}
                    <div className="text-muted-foreground  text-sm font-medium">
                      {effectivenessText}
                    </div>
                  </TableCell>
                  <TableCell className="px-2 sm:px-4 gap-4 grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-6  py-4">
                    {types.map((type) => (
                      <div
                        key={type.attacker.name}
                        className="flex flex-col gap-1 items-center"
                      >
                        <TypeIcon type={type.attacker} className="size-7" />
                        <div className="text-sm text-center text-muted-foreground font-medium">
                          {type.attacker.name}
                        </div>
                      </div>
                    ))}
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </div> */}
    </div>
  );
}
