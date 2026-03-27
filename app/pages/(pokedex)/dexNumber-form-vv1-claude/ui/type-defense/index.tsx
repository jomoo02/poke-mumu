'use client';

import { cn } from '@/app/shared/lib/cn';
import { TypeIconV2 } from '@/app/entities/type/ui';
import { type TypeDefenseView } from '../../../dex-number-form-vv1/model';

interface TypeDefensesProps {
  typeDefenses: TypeDefenseView[];
}

export default function TypeDefenses({ typeDefenses }: TypeDefensesProps) {
  const toMultiplier = (value: number): string => {
    const map: Record<number, string> = {
      0: '0',
      0.25: '¼',
      0.5: '½',
      1: '1',
      2: '2',
      4: '4',
    };
    return map[value] ?? String(value);
  };

  const groupByEffectiveness = (list: TypeDefenseView[], target: number) =>
    list.filter((item) => item.effectiveness === target).map((item) => item.attacker);

  const sections = [
    {
      label: '약점',
      rows: [
        { multiplier: 4, label: `×${toMultiplier(4)}` },
        { multiplier: 2, label: `×${toMultiplier(2)}` },
      ],
      badgeClass: 'bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-400',
    },
    {
      label: '내성',
      rows: [
        { multiplier: 0.5, label: `×${toMultiplier(0.5)}` },
        { multiplier: 0.25, label: `×${toMultiplier(0.25)}` },
      ],
      badgeClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400',
    },
    {
      label: '무효',
      rows: [{ multiplier: 0, label: `×${toMultiplier(0)}` }],
      badgeClass: 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400',
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {sections.map(({ label, rows, badgeClass }) => (
        <div key={label}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            {label}
          </h3>
          <div className="flex flex-col gap-2">
            {rows.map(({ multiplier, label: rowLabel }) => {
              const types = groupByEffectiveness(typeDefenses, multiplier);
              return (
                <div key={rowLabel} className="flex items-center gap-3">
                  <span
                    className={cn(
                      'w-10 shrink-0 text-center text-sm font-bold rounded-md py-0.5',
                      badgeClass,
                    )}
                  >
                    {rowLabel}
                  </span>
                  {types.length === 0 ? (
                    <span className="text-sm text-muted-foreground">—</span>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {types.map((type) => (
                        <TypeIconV2
                          key={type.identifier}
                          type={type}
                          className="size-7"
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
