import Link from 'next/link';

import { PokeSprite } from '@/entities/poke/ui';
import { type Type } from '@/entities/type/model';
import { TypeIcon } from '@/entities/type/ui';
import { formatNumber } from '@/shared/lib/format';
import { cn } from '@/shared/lib/cn';

import { type NationalPoke } from '../../model/poke';

interface PokeCardProps {
  poke: NationalPoke;
  index: number;
  sortKey: string;
}

export default function PokeCard({ poke, index, sortKey }: PokeCardProps) {
  const {
    dexNumber,
    nameKo,
    formKo,
    type1,
    type2,
    hp,
    attack,
    defense,
    specialAttack,
    specialDefense,
    speed,
    total,
    pokeKey,
  } = poke;

  const stats = [
    { key: 'hp', value: hp, label: 'H' },
    { key: 'attack', value: attack, label: 'A' },
    { key: 'defense', value: defense, label: 'B' },
    { key: 'special_attack', value: specialAttack, label: 'C' },
    { key: 'special_defense', value: specialDefense, label: 'D' },
    { key: 'speed', value: speed, label: 'S' },
    { key: 'total', value: total, label: '총합' },
  ];

  const types = [type1, type2].filter((t): t is Type => t !== null);

  // 현재 정렬 키와 일치하는 필드 여부
  const isActive = (key: string) => key === sortKey;

  return (
    <Link
      href={`/pokedex/${pokeKey}`}
      className={cn(
        'border block rounded-4xl shadow-sm @container',
        'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 outline-none',
        'bg-card hover:bg-accent/70 dark:hover:bg-accent active:bg-accent',
      )}
    >
      <div className="flex px-5 pt-5 gap-3 justify-between">
        <div className="flex items-center justify-center size-24.5 bg-muted/50 rounded-4xl shrink-0">
          <PokeSprite poke={poke} className="size-18" />
        </div>
        <div className="flex-1 overflow-hidden">
          <div
            className={cn(
              'truncate font-medium tabular-nums text-sm',
              isActive('dex_number') ? 'text-primary' : 'text-foreground/70',
            )}
          >
            {`No.${formatNumber(dexNumber)}`}
          </div>

          <div
            className={cn(
              'text- min-w-0 truncate font-medium',
              isActive('name') && 'text-primary',
            )}
          >
            {nameKo}
          </div>
          <div className="text-sm h-5 text-foreground/50 dark:text-foreground/70 font-medium min-w-0 truncate">
            {formKo}
          </div>

          <div className="flex gap-1 pt-1.5">
            {types.map((type) => (
              <TypeIcon
                key={type.identifier}
                type={type}
                className="size-7 p-0.5 rounded-md"
              />
            ))}
          </div>
        </div>

        <div className="text-foreground/50 truncate font-semibold text-sm font-suite shrink-0 ">
          #{index}
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 px-5 py-5">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col">
            <div
              className={cn(
                'text-sm text-center shrink-0 font-medium',
                isActive(stat.key)
                  ? 'text-primary'
                  : 'text-foreground/50 dark:text-foreground/70',
              )}
            >
              {stat.label}
            </div>
            <div
              className={cn(
                'text-center tabular-nums text-md',
                isActive(stat.key) && 'text-primary font-medium',
              )}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </Link>
  );
}
