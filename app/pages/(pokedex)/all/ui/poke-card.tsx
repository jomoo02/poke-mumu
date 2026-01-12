import Link from 'next/link';

import { cn } from '@/app/shared/lib/cn';
import { PokeSprite } from '@/app/entities/poke/ui';
import { formatNumber } from '@/app/shared/lib/format';
import { TypeIcon, TypeBadge } from '@/app/entities/type/ui';

import { type NationalPokeView } from '../model';

interface PokeCardProps {
  poke: NationalPokeView;
}

export default function PokeCard({ poke }: PokeCardProps) {
  const {
    name,
    form,
    total,
    hp,
    attack,
    defense,
    specialAttack,
    specialDefense,
    speed,
    type1,
    type2,
  } = poke;

  const dexNumber = formatNumber(poke.dexNumber);

  const href = `/pokedex/${poke.dexNumber}/${poke.pokeKey}`;

  const baseStats = [
    { value: hp, content: 'HP' },
    { value: attack, content: '공격' },
    { value: defense, content: '방어' },
    { value: specialAttack, content: '특수공격' },
    { value: specialDefense, content: '특수방어' },
    { value: speed, content: '스피드' },
  ];

  return (
    <div className="border border-border rounded-2xl shadow-sm shadow-border flex flex-col p-6 gap-2">
      <Link
        href={href}
        className="bg-accent/40 flex flex-col items-center rounded-2xl shadow-sm shadow-accent/40"
        aria-label={`${name} 상세 페이지로 이동`}
      >
        <div className="flex justify-center w-full p-4 ">
          <PokeSprite poke={poke} className="size-19" />
        </div>
        <div className="pb-4">
          <div className="text-muted-foreground font-medium">
            No.{dexNumber}
          </div>
          <div className="text-foreground min-w-0 truncate font-medium text-lg">
            {name}
          </div>
          <div className="text-muted-foreground text-sm truncate min-w-0 min-h-5">
            {form}
          </div>
        </div>
      </Link>
      <div className="flex justify-between flex-col items-center"></div>
      <div className="grid grid-cols-2 w-full gap-2">
        {type1 && (
          <TypeBadge type={type1} className="w-full max-w-40 mx-auto" />
        )}
        {type2 && (
          <TypeBadge type={type2} className="w-full max-w-40 mx-auto" />
        )}
      </div>
      <div className="flex justify-center py-1">
        <div className="flex justify-center bg-muted px-2 rounded-lg py-1 gap-3 border-border border text-sm">
          <div className="text-muted-foreground text-right">총합</div>
          <div className="text-center font-medium">{total}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 relative z-0 gap-y-2">
        {baseStats.map((stat) => (
          <div key={stat.content} className="grid grid-cols-2">
            <div className="text-muted-foreground   text-right">
              {stat.content}
            </div>
            <div className="text-center  ">{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
