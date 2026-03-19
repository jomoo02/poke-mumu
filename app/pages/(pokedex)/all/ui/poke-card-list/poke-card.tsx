import Link from 'next/link';

import { PokeSprite } from '@/app/entities/poke/ui';
import { type Type } from '@/app/entities/type/model';
import { TypeBadge } from '@/app/entities/type/ui';
import { formatNumber } from '@/app/shared/lib/format';

import { type NationalPokeView } from '../../model';
import StatBar from './stat-bar';

interface PokeCardProps {
  poke: NationalPokeView;
}

export default function PokeCard({ poke }: PokeCardProps) {
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

  const formattedDexNumber = `No.${formatNumber(dexNumber)}`;

  const href = `/pokedex/${dexNumber}/${pokeKey}`;

  return (
    <Link
      href={href}
      className="border rounded-3xl bg-card overflow-hidden hover:shadow-lg active:shadow-lg shadow-sm @container"
    >
      <div className="flex pt-6 px-6  pb-4 gap-4">
        <div className="flex items-center justify-center h-26 w-19 @[300px]:w-22 ">
          <PokeSprite poke={poke} className="size-18" />
        </div>
        <div className="flex-1 overflow-hidden min-w-0 h-full">
          <div className="shrink-0 text-muted-foreground font-semibold tabular-nums ">
            {formattedDexNumber}
          </div>
          <div className="text-lg font-semibold min-w-0 truncate">{name}</div>
          <div className="h-5 text-sm text-muted-foreground font-semibold min-w-0 truncate">
            {form}
          </div>
          <div className="flex gap-1 pt-1">
            {types.map((type) => (
              <TypeBadge
                key={type.identifier}
                type={type}
                className="w-15 h-7 text-sm"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 pt-0 flex flex-col">
        {stats.map((stat) => (
          <StatRow key={stat.label} label={stat.label} value={stat.value} />
        ))}
        <div className="bg-border w-full h-px my-1"></div>
        <div className="flex gap-2 pt-1">
          <div className="shrink-0 text-base font-medium text-muted-foreground w-16 ">
            총합
          </div>
          <div className="shrink-0 font-semibold tabular-nums text-center text-base w-13 ">
            {total}
          </div>
        </div>
      </div>
    </Link>
  );
}

interface StatRowProps {
  label: string;
  value: number;
}

function StatRow({ label, value }: StatRowProps) {
  return (
    <div className="flex gap-2 py-1 text-base items-center first:pt-0">
      <div className="w-16 shrink-0  font-medium text-muted-foreground ">
        {label}
      </div>
      <div className="w-13 shrink-0 font-medium text-center  tabular-nums">
        {value}
      </div>

      <div className="flex-1">
        <StatBar value={value} />
      </div>
    </div>
  );
}
