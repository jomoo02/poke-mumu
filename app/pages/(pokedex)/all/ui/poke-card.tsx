import Link from 'next/link';

import { PokeSprite } from '@/app/entities/poke/ui';
import { formatNumber } from '@/app/shared/lib/format';
import { TypeBadge } from '@/app/entities/type/ui';

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
    pokeKey,
    dexNumber,
  } = poke;

  const formattedDexNumber = formatNumber(dexNumber);

  const href = `/pokedex/${dexNumber}/${pokeKey}`;

  const baseStats = [
    { value: hp, content: 'HP' },
    { value: attack, content: '공격' },
    { value: defense, content: '방어' },
    { value: specialAttack, content: '특수공격' },
    { value: specialDefense, content: '특수방어' },
    { value: speed, content: '스피드' },
  ];

  return (
    <div className="border border-border rounded-2xl shadow-sm shadow-card flex flex-col p-6 gap-2 bg-card backdrop-blur-md">
      <Link
        href={href}
        className="flex flex-col items-center rounded-2xl border  border-border bg-muted/40 hover:bg-accent active:bg-accent shadow-muted/70 shadow-sm  "
        aria-label={`${name} 상세 페이지로 이동`}
      >
        <div className="flex justify-center w-full p-4 z-10 ">
          <PokeSprite poke={poke} className="size-19" />
        </div>
        <div className="pb-4">
          <div className="font-medium text-muted-foreground">
            No.{formattedDexNumber}
          </div>
          <div className="text-foreground min-w-0 truncate font-medium text-lg">
            {name}
          </div>
          <div className="text-muted-foreground text-sm truncate min-w-0 min-h-5 font-medium">
            {form}
          </div>
        </div>
      </Link>

      <div className="grid grid-cols-2 w-full gap-2">
        {type1 && (
          <TypeBadge type={type1} className="w-full max-w-40 mx-auto" />
        )}
        {type2 && (
          <TypeBadge type={type2} className="w-full max-w-40 mx-auto" />
        )}
      </div>
      <div className="flex justify-center pt-1">
        <div className="flex justify-center  px-2 py-0.5 rounded-lg gap-3 bg-muted border-border border">
          <div className="text-muted-foreground text-right">총합</div>
          <div className="text-center">{total}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 relative z-0 gap-y-2">
        {baseStats.map((stat) => (
          <div key={stat.content} className="grid grid-cols-2">
            <div className=" text-muted-foreground text-right">
              {stat.content}
            </div>
            <div className="text-center ">{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
