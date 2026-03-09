import Link from 'next/link';

import { formatNumber } from '@/app/shared/lib/format';
import { TypeBadge } from '@/app/entities/type/ui';

import { type NationalPokeView, type TableHead } from '../../model';

type Column = {
  id: TableHead;
  header: string;
  sortable?: boolean;
  align?: 'left' | 'right';
  width?: string;
  cell: (poke: NationalPokeView) => React.ReactNode;
};

export const columns: Column[] = [
  {
    id: 'dexNumber',
    header: '도감번호',
    sortable: true,
    width: 'w-26 min-w-26 md:w-32 md:min-w-32',
    cell: (poke) => `#${formatNumber(poke.dexNumber)}`,
  },
  {
    id: 'name',
    header: '이름',
    width:
      'min-w-34 md:min-w-44 w-34 md:w-44 lg:w-48 lg:min-w-48 xl:flex-1 2xl:w-full',
    sortable: true,
    cell: (poke) => (
      <div className="flex flex-col justify-center overflow-hidden w-full">
        <Link
          href={`/pokedex/${poke.dexNumber}/${poke.pokeKey}`}
          className="w-full  p-1 pl-0 pb-0"
          aria-label={`${poke.name} 상세 페이지로 이동`}
        >
          <div className="text-foreground  truncate font-medium hover:underline active:underline">
            {poke.name}
          </div>
        </Link>
        <div className="text-muted-foreground text-sm sm:text-sm truncate font-medium">
          {poke.form}
        </div>
      </div>
    ),
  },
  {
    id: 'type',
    header: '타입',
    sortable: false,
    width: 'w-25 min-w-25 md:w-30 md:min-w-30',
    cell: ({ type1, type2 }) => (
      <div className="flex flex-col gap-1 justify-center items-start w-full ">
        {type1 && (
          <TypeBadge type={type1} className="w-17.5 max-w-17.5 h-7.25" />
        )}
        {type2 && (
          <TypeBadge type={type2} className="w-17.5 max-w-17.5 h-7.25" />
        )}
      </div>
    ),
  },
  {
    id: 'total',
    align: 'right',
    header: '총합',
    sortable: true,
    width: 'w-26 min-w-26',
    cell: ({ total }) => total,
  },
  {
    id: 'hp',
    sortable: true,
    header: 'HP',
    align: 'right',
    width: 'w-24 min-w-24',
    cell: ({ hp }) => hp,
  },
  {
    id: 'attack',
    sortable: true,
    header: '공격',
    align: 'right',
    width: 'w-26 min-w-26',
    cell: ({ attack }) => attack,
  },
  {
    id: 'defense',
    header: '방어',
    sortable: true,
    align: 'right',
    width: 'w-26 min-w-26',
    cell: ({ defense }) => defense,
  },
  {
    id: 'specialAttack',
    header: '특수공격',
    sortable: true,
    width: 'w-30 min-w-30',
    align: 'right',
    cell: ({ specialAttack }) => specialAttack,
  },
  {
    id: 'specialDefense',
    header: '특수방어',
    sortable: true,
    align: 'right',
    width: 'w-30 min-w-30',
    cell: ({ specialDefense }) => specialDefense,
  },
  {
    id: 'speed',
    sortable: true,
    header: '스피드',
    align: 'right',
    width: 'w-28 min-w-28 ',
    cell: ({ speed }) => speed,
  },
];
