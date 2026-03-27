'use client';

import { cn } from '@/app/shared/lib/cn';
import { TypeIconV2 } from '@/app/entities/type/ui';

import { type TypeDefenseView } from '../../model';

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

  return (
    <div className="flex flex-col overflow-hidden bg-card">
      <div className="flex flex-col">
        {datas.map(({ label, items, color }) => (
          <div key={label} className="mt-4 first:mt-0">
            <div className="font-semibold text-lg pb-1">{label}</div>
            <div className="">
              {items.map(({ multiple, types }) => (
                <div
                  key={multiple}
                  className="flex items-center gap-4 py-2 border-t first:border-t-0 "
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
    </div>
  );
}
