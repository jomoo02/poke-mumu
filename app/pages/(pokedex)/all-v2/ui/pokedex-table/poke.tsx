import { formatNumber } from '@/app/shared/lib/format';
import { NationalPokeView } from '../../model';
import { getStatKeys } from '@/app/entities/stats/model';
import { PokeSprite } from '@/app/entities/poke/ui';
import Link from 'next/link';
import { TypeBadge } from '@/app/entities/type/ui';
import { cn } from '@/app/shared/lib/cn';

export default function Poke({ poke }: { poke: NationalPokeView }) {
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

  const statKeys = getStatKeys().filter((statKey) => statKey !== 'total');

  const baseStats = {
    hp,
    attack,
    defense,
    specialAttack,
    specialDefense,
    speed,
  };

  const specialCase = ['specialAttack', 'specialDefense', 'speed'];

  return (
    <div className="h-full w-full px-4 xl:px-16 flex">
      <div className=" sticky left-0 border-b  h-full">
        <div className="bg-card w-20 min-w-20 md:w-26 md:min-w-26 h-full flex justify-center items-center">
          <PokeSprite poke={poke} className="size-12 md:size-14 " />
        </div>
      </div>
      <div
        className={cn(
          'h-full w-26 min-w-26  md:w-34 md:min-w-34  flex',
          // '2xl:w-58 2xl:min-w-58',
          // 'flex items-center h-full',
        )}
      >
        <div className="text-sm md:text-base px-4 border-b w-full inline-flex items-center">
          No.{formattedDexNumber}
        </div>
      </div>

      <div className="h-full min-w-34 md:min-w-44 lg:min-w-52 max-w-34 md:max-w-44 lg:max-w-none   px-4  border-b flex flex-col justify-center ">
        <Link
          href={href}
          className=""
          aria-label={`${name} 상세 페이지로 이동`}
        >
          <div className="text-foreground  truncate font-medium text-sm md:text-base">
            {name}
          </div>
        </Link>
        <div className="text-muted-foreground text-sm truncate font-medium">
          {form}
        </div>
      </div>
      <div className="flex flex-col px-4  w-25 min-w-25 xl:w-32 xl:min-w-32 2xl:w-44 2xl:min-w-44 items-center gap-1 justify-center border-b">
        {type1 && <TypeBadge type={type1} className="w-full max-w-17 " />}
        {type2 && <TypeBadge type={type2} className="w-full max-w-17 " />}
      </div>
      <div className="flex items-center px-4  justify-end border-b text-sm md:text-base w-26 min-w-26">
        {total}
      </div>
      {statKeys.map((statKey) => (
        <div
          key={statKey}
          className={cn(
            'flex items-center px-4 justify-end border-b text-sm md:text-base ',
            specialCase.includes(statKey) ? 'w-30 min-w-30' : 'w-26 min-w-26  ',
          )}
        >
          {baseStats[statKey]}
        </div>
      ))}
    </div>
  );
}
