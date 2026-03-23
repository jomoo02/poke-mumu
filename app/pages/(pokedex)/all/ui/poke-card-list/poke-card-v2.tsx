import Link from 'next/link';

import { PokeSprite } from '@/app/entities/poke/ui';
import { type Type } from '@/app/entities/type/model';
import { TypeBadge } from '@/app/entities/type/ui';
import { formatNumber } from '@/app/shared/lib/format';

import { type NationalPokeView } from '../../model';

interface PokeCardProps {
  poke: NationalPokeView;
}

export default function PokeCardV2({ poke }: PokeCardProps) {
  const {
    dexNumber,
    name,
    form,
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

  const href = `/pokedex/${dexNumber}/${pokeKey}`;

  return (
    <Link
      href={href}
      className="border flex flex-col rounded-3xl bg-card overflow-hidden hover:shadow-lg active:shadow-lg shadow-sm @container"
    >
      <div className="flex justify-between p-6 pb-0">
        <div className="shrink-0 text-muted-foreground/70 font-black tabular-nums">
          <span className="text-xl">No.</span>
          <span className="text-2xl">{formattedDexNumber}</span>
        </div>
        <div className="flex  justify-center">
          <div className="flex flex-col size-16 items-center justify-center bg-muted rounded-xl">
            <div className="shrink-0 font-semibold text-muted-foreground text-sm ">
              총합
            </div>
            <div className="shrink-0 font-semibold tabular-nums text-center text-base ">
              {total}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-4">
        <div className="flex items-center justify-center ">
          <PokeSprite poke={poke} className="size-18" />
        </div>

        <div className="flex flex-col justify-center items-center pt-1.5">
          <div className="text-lg text-center font-semibold min-w-0 truncate">
            {name}
          </div>
          <div className="text-sm h-5 text-muted-foreground text-center font-semibold min-w-0 truncate">
            {form}
          </div>
        </div>
        <div className="flex justify-center gap-2 pt-1.5">
          {types.map((type) => (
            <TypeBadge
              key={type.identifier}
              type={type}
              className="w-20 h-7.5 text-sm"
            />
          ))}
        </div>
      </div>
      <div className="p-6 grid grid-cols-3 gap-y-4 gap-x-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center"
          >
            <div className="text-sm  font-medium text-muted-foreground ">
              {stat.label}
            </div>
            <div className="font-medium text-center text-base tabular-nums">
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </Link>
  );
}
