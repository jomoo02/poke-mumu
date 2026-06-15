import Link from 'next/link';

import { PokeSprite } from '@/entities/poke/ui';
import { type Type } from '@/entities/type/model';
import { TypeBadge } from '@/entities/type/ui';
import { formatNumber } from '@/app/shared/lib/format';

// import { type NationalPokeView } from '../../model';
import type { NationalPoke } from '../../model-v2';

interface PokeCardProps {
  poke: NationalPoke;
}

export default function PokeCardV2({ poke }: PokeCardProps) {
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
    { value: hp, label: 'HP' },
    { value: attack, label: '공격' },
    { value: defense, label: '방어' },
    { value: specialAttack, label: '특수공격' },
    { value: specialDefense, label: '특수방어' },
    { value: speed, label: '스피드' },
  ];

  const types = [type1, type2].filter((t): t is Type => t !== null);

  const formattedDexNumber = `${formatNumber(dexNumber)}`;

  const href = `/pokedex/${pokeKey}`;

  return (
    <Link
      href={href}
      className="border flex flex-col rounded-4xl bg-card overflow-hidden hover:bg-accent active:bg-accent shadow-sm @container"
    >
      <div className="flex justify-between p-5 pb-0">
        <div className="shrink-0 text-foreground/50 dark:text-foreground/70 font-extrabold tabular-nums font-suite">
          <span className="text-xl">No.</span>
          <span className="text-2xl">{formattedDexNumber}</span>
        </div>
        <div className="flex flex-col size-15 items-center justify-center bg-muted/70 z-10 rounded-xl">
          <div className="shrink-0 font-medium text-foreground/70 text-sm">
            총합
          </div>
          <div className="shrink-0 font-semibold tabular-nums text-center text-base">
            {total}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-5 pt-3">
        <div className="flex items-center justify-center">
          <PokeSprite poke={poke} className="size-20" />
        </div>
        <div className="flex flex-col justify-center items-center pt-1.5">
          <div className="text-lg text-center font-medium min-w-0 truncate">
            {nameKo}
          </div>
          <div className="text-sm h-5 text-muted-foreground text-center font-medium min-w-0 truncate">
            {formKo}
          </div>
        </div>
        <div className="grid grid-cols-2 pt-1.5 gap-2">
          {types.map((type) => (
            <TypeBadge key={type.identifier} type={type} />
          ))}
        </div>
      </div>
      <div className="p-5 grid grid-cols-3 gap-3.5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center"
          >
            <div className="text-sm text-foreground/70">{stat.label}</div>
            <div className="font-medium text-center text-base tabular-nums">
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </Link>
  );
}
