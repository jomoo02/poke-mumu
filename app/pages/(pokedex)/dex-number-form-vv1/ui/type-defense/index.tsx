'use client';

import { cn } from '@/app/shared/lib/cn';
import { TypeBadge, TypeIcon, TypeIconV2 } from '@/app/entities/type/ui';

import { type TypeDefenseView } from '../../model';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/shared/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/app/shared/ui/tooltip';
import { Button } from '@/app/shared/ui/button';

interface TypeDefensesProps {
  typeDefenses: TypeDefenseView[];
}

export default function TypeDefenses({ typeDefenses }: TypeDefensesProps) {
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

  const groupByEffectivenessV2 = (list: TypeDefenseView[], target: number) => {
    return list
      .filter((item) => item.effectiveness === target)
      .map((item) => item.attacker);
  };
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

  const datas2 = [
    {
      multiple: `x${toMultiplier(4)}`,
      types: groupByEffectivenessV2(typeDefenses, 4),
    },
    {
      multiple: `x${toMultiplier(2)}`,
      types: groupByEffectivenessV2(typeDefenses, 2),
    },
    {
      multiple: `x${toMultiplier(0.5)}`,
      types: groupByEffectivenessV2(typeDefenses, 0.5),
    },
    {
      multiple: `x${toMultiplier(0.25)}`,
      types: groupByEffectivenessV2(typeDefenses, 0.25),
    },
    {
      multiple: `x${toMultiplier(0)}`,
      types: groupByEffectivenessV2(typeDefenses, 0),
    },
  ].filter(({ types }) => types.length > 0);

  return (
    <div className="flex flex-col overflow-hidden">
      {/* <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 p-1">
        {typeDefenses.map(({ attacker, effectiveness }) => (
          <div
            key={attacker.identifier}
            className="flex flex-col items-center justify-center"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={'outline'}
                  className="size-8 p-0 overflow-hidden items-center justify-center border-0 rounded-sm"
                >
                  <TypeIcon type={attacker} size={32} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{attacker.name}</TooltipContent>
            </Tooltip>
            <span className="text-sm font-medium pt-1">x{effectiveness}</span>
          </div>
        ))}
      </div> */}

      {/* <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[18%] pl-0">배율</TableHead>
            <TableHead className="w-full ">타입</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {datas2.map(({ multiple, types }) => (
            <TableRow key={multiple}>
              <TableCell className="pl-0">{multiple}</TableCell>
              <TableCell className="py-4">
                <div className="flex flex-wrap gap-2">
                  {types.map((type) => (
                    <TypeIcon
                      key={type.identifier}
                      type={type}
                      className="size-7"
                    />
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
      {/* <div className="flex flex-col">
        {datas.map(({ label, items, color }) => (
          <div key={label} className="mt-4 first:mt-0">
            <div className="font-medium pb-3">{label}</div>
            <div className="">
              {items.map(({ multiple, types }) => (
                <div key={multiple} className="flex items-center gap-4 py-3 ">
                  {types.length === 0 ? (
                    <div className="w-full h-full">-</div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {types.map((type) => (
                        <div
                          key={type.identifier}
                          className="flex items-center gap-2 "
                        >
                          {' '}
                          <TypeBadge
                            key={type.identifier}
                            type={type}
                            className="w-18"
                          />
                          <span className="text-xs text-muted-foreground font-medium w-10  bg-muted rounded-full ">
                            {multiple}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div> */}
      <div className="flex flex-col">
        {datas.map(({ label, items, color }) => (
          <div key={label} className="mt-4 first:mt-0 border rounded-xl">
            <div className="font-medium py-2 px-4">{label}</div>
            <div className="">
              {items.map(({ multiple, types }) => (
                <div
                  key={multiple}
                  className="flex items-center gap-4 py-2 border-t px-4"
                >
                  <div className="w-20 sm:w-28 shrink-0">
                    <div
                      className={cn(
                        'px-2.5 py-1 bg-muted rounded-md font-semibold text-sm inline-flex',
                        color,
                      )}
                    >
                      {multiple}
                    </div>
                  </div>

                  {types.length === 0 ? (
                    <div className="w-full h-full">-</div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {types.map((type) => (
                        <TypeIconV2
                          key={type.identifier}
                          type={type}
                          className="size-6"
                          // className="size-7.5"
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
    </div>
  );
}
