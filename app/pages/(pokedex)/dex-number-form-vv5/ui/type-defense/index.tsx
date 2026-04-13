'use client';

import { Fragment } from 'react/jsx-runtime';

import { TypeBadge } from '@/app/entities/type/ui';

import { type TypeDefenseView } from '../../model';
import { Type } from '@/app/entities/type/model';

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

interface TypeDefensesProps {
  types: Type[];
  typeDefenses: TypeDefenseView[];
}

export default function TypeDefenses({
  typeDefenses,
  types,
}: TypeDefensesProps) {
  const defenseGroups = [
    {
      label: '약점',
      items: [4, 2],
    },
    {
      label: '내성',
      items: [0.5, 0.25],
    },
    {
      label: '무효',
      items: [0],
    },
  ]
    .map(({ label, items }) => ({
      label,
      items: items
        .map((multiplier) => ({
          multiple: `${multiplier}배`,
          // multiple: `${toMultiplier(multiplier)}배`,
          types: typeDefenses
            .filter((item) => item.effectiveness === multiplier)
            .map((item) => item.attacker),
        }))
        .filter(({ types }) => types.length > 0),
    }))
    .filter(({ items }) => items.length > 0);

  return (
    <div className="grid sm:grid-cols-3 gap-6">
      {/* <div className="w-full h-px bg-border" /> */}
      {defenseGroups.map(({ label, items }) => (
        <div
          key={label}
          className="border p-6 rounded-3xl flex flex-col gap-3 bg-card"
        >
          <h3 className="font-semibold text-xl">{label}</h3>
          <div className="flex flex-col gap-3">
            {items.map(({ multiple, types }, index) => (
              <Fragment key={multiple}>
                {index > 0 && <div className="w-full h-px bg-border my-1.5" />}
                {/* <div className="flex flex-col gap-3"> */}
                <div className="font-semibold">{multiple}</div>
                <div className="flex flex-wrap gap-3">
                  {types.map((type) => (
                    <TypeBadge
                      key={type.identifier}
                      type={type}
                      className="w-20"
                    />
                  ))}
                </div>
                {/* </div> */}
              </Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
