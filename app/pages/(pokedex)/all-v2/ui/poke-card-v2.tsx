import Link from 'next/link';

import { PokeSprite } from '@/app/entities/poke/ui';
import { formatNumber } from '@/app/shared/lib/format';
import { TypeBadge } from '@/app/entities/type/ui';
import { getStatKeys, getStatLabel } from '@/app/entities/stats/model';
import { Table, TableRow, TableBody, TableCell } from '@/app/shared/ui/table';

import { type NationalPokeView } from '../model';

interface PokeCardProps {
  poke: NationalPokeView;
}

export default function PokeCardV2({ poke }: PokeCardProps) {
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

  // const baseStats = [
  //   { value: hp, content: 'HP' },
  //   { value: attack, content: '공격' },
  //   { value: defense, content: '방어' },
  //   { value: specialAttack, content: '특수공격' },
  //   { value: specialDefense, content: '특수방어' },
  //   { value: speed, content: '스피드' },
  // ];

  const statKeys = getStatKeys().filter((statKey) => statKey !== 'total');

  const baseStats = {
    hp,
    attack,
    defense,
    specialAttack,
    specialDefense,
    speed,
  };

  // const baseStats = [
  //   { value: hp, content: getStatLabel('hp') },
  //   { value: attack, content: getStatKo('attack') },
  //   { value: defense, content: getStatKo('defense') },
  //   { value: specialAttack, content: getStatKo('specialAttack') },
  //   { value: specialDefense, content: getStatKo('specialDefense') },
  //   { value: speed, content: getStatKo('speed') },
  // ];

  return (
    <>
      <TableCell className="border-b h-10 w-10">
        <div className="flex items-center h-full">
          <PokeSprite poke={poke} className="size-14" />
          {formattedDexNumber}
        </div>
      </TableCell>
      <TableCell>
        <Link
          href={href}
          className=" "
          aria-label={`${name} 상세 페이지로 이동`}
        >
          <div className="text-foreground min-w-0 truncate font-medium text-lg">
            {name}
          </div>
        </Link>
        <div className="text-muted-foreground text-sm truncate min-w-0 min-h-5 font-medium">
          {form}
        </div>
      </TableCell>
      <TableCell>
        <div className="grid w-full gap-2">
          {type1 && <TypeBadge type={type1} className="w-full max-w-15 " />}
          {type2 && <TypeBadge type={type2} className="w-full max-w-15 " />}
        </div>
      </TableCell>
      <TableCell>{total}</TableCell>
      {statKeys.map((statKey) => (
        <TableCell key={statKey}>{baseStats[statKey]}</TableCell>
      ))}
    </>
  );
}
