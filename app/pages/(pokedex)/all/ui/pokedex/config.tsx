import Link from 'next/link';

import { PokeSprite } from '@/app/entities/poke/ui';
import { formatNumber } from '@/app/shared/lib/format';
import { TypeBadge } from '@/app/entities/type/ui';

import { type NationalPokeView, type TableHead } from '../../model';

type Coulmn = {
  id: TableHead;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'right';
  cell: (poke: NationalPokeView) => React.ReactNode;
  className?: string;
};

const columns: Coulmn[] = [
  {
    id: 'dexNumber',
    label: '도감번호',

    className: 'w-32 sm:w-44 lg:w-36 xl:w-44 2xl:48',
    cell: (poke) => (
      <div className="flex gap-3 sm:gap-4">
        <Link href={`/pokedex/${poke.dexNumber}/${poke.pokeKey}`}>
          <PokeSprite poke={poke} className="size-11 2xs:size-12 xl:size-14 " />
        </Link>
        <div className="text-sm xl:text-base self-stretch flex items-center">
          {formatNumber(poke.dexNumber)}
        </div>
      </div>
    ),
  },
  {
    id: 'name',
    label: '이름',
    className: 'min-w-0',
    cell: (poke) => (
      <div className="flex flex-col justify-center min-w-0 overflow-hidden">
        <Link
          href={`/pokedex/${poke.dexNumber}/${poke.pokeKey}`}
          className="inline-block w-fit hover:underline active:underline  "
          aria-label={`${poke.name} 상세 페이지로 이동`}
        >
          <div className="truncate w-fit text-base text-foreground">
            {poke.name}
          </div>
        </Link>
        <div className="text-muted-foreground text-sm truncate min-w-0 font-medium">
          {poke.form}
        </div>
      </div>
    ),
  },
  {
    id: 'type',
    label: '타입',
    sortable: false,
    className: 'w-24 lg:w-22 xl:w-24 2xl:w-28',
    cell: (poke) => (
      <div className="flex flex-col gap-1 justify-center items-start w-full ">
        {poke.type1 && (
          <TypeBadge type={poke.type1} className="w-15.5 h-7.25" />
        )}
        {poke.type2 && (
          <TypeBadge type={poke.type2} className="w-15.5 h-7.25" />
        )}
      </div>
    ),
  },
  {
    id: 'total',
    label: '총합',
    cell: (poke) => poke.total,
    align: 'right',
    className: 'hidden xs:table-cell font-medium w-26 lg:w-20 xl:w-26 2xl:w-32',
    // className: 'hidden xs:table-cell w-26 max-w-26',
  },
  {
    id: 'hp',
    label: 'HP',
    cell: (poke) => poke.hp,
    align: 'right',
    className: 'hidden lg:table-cell w-20 xl:w-26 2xl:w-32',
    // className: 'hidden lg:table-cell  w-26 max-w-26',
  },
  {
    id: 'attack',
    label: '공격',
    cell: (poke) => poke.attack,
    align: 'right',
    className: 'hidden lg:table-cell w-20 xl:w-26 2xl:w-32',
    // className: 'hidden lg:table-cell  w-26 max-w-26',
  },
  {
    id: 'defense',
    label: '방어',
    cell: (poke) => poke.defense,
    align: 'right',
    className: 'hidden lg:table-cell w-20 xl:w-26 2xl:w-32',
    // className: 'hidden lg:table-cell  w-26 max-w-26',
  },
  {
    id: 'specialAttack',
    label: '특수공격',
    cell: (poke) => poke.specialAttack,
    align: 'right',
    className: 'hidden lg:table-cell w-25 xl:w-30 2xl:w-34',
    // className: 'hidden lg:table-cell w-27.5 max-w-27.5',
  },
  {
    id: 'specialDefense',
    label: '특수방어',
    cell: (poke) => poke.specialDefense,
    align: 'right',
    className: 'hidden lg:table-cell w-25 xl:w-30 2xl:w-34',
    // className: 'hidden lg:table-cell w-27.5 max-w-27.5',
  },
  {
    id: 'speed',
    label: '스피드',
    cell: (poke) => poke.speed,
    align: 'right',
    className: 'hidden lg:table-cell w-22 xl:w-24 2xl:w-28',
    // className: 'hidden lg:table-cell w-26.5 max-w-26.5',
  },
];

export { columns };
