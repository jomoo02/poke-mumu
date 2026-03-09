import Link from 'next/link';
import { type NationalPokeView, type TableHead } from '../../model';
import { PokeSprite } from '@/app/entities/poke/ui';
import { formatNumber } from '@/app/shared/lib/format';
import { TypeBadge } from '@/app/entities/type/ui';

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
    // align: 'right',
    className: 'lg:min-w-31',
    cell: (poke) => (
      <div className="flex gap-3 sm:gap-4 lg:gap-3 xl:gap-4">
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
    className: 'lg:min-w-34 xl:min-w-50',
    cell: (poke) => (
      <div className="flex flex-col justify-center overflow-hidden w-full min-w-0 max-w-24 2xs:max-w-28 xs:max-w-none md:max-w-none lg:max-w-34 xl:min-w-50 xl:max-w-none">
        <Link
          href={`/pokedex/${poke.dexNumber}/${poke.pokeKey}`}
          className="w-full  p-1 pl-0 pb-0"
          aria-label={`${poke.name} 상세 페이지로 이동`}
        >
          <div className="text-foreground text-sm xl:text-base  truncate font-medium hover:underline active:underline">
            {poke.name}
          </div>
        </Link>
        <div className="text-muted-foreground text-xs xl:text-sm truncate font-medium">
          {poke.form}
        </div>
      </div>
    ),
  },
  {
    id: 'type',
    label: '타입',
    sortable: false,
    className: 'w-22 max-w-22',
    cell: (poke) => (
      <div className="flex flex-col gap-1 justify-center items-start w-full ">
        {poke.type1 && <TypeBadge type={poke.type1} className="w-16 h-7.25" />}
        {poke.type2 && <TypeBadge type={poke.type2} className="w-16 h-7.25" />}
      </div>
    ),
  },
  {
    id: 'total',
    label: '총합',
    cell: (poke) => poke.total,
    align: 'right',
    className: 'hidden xs:table-cell font-medium',
    // className: 'hidden xs:table-cell w-26 max-w-26',
  },
  {
    id: 'hp',
    label: 'HP',
    cell: (poke) => poke.hp,
    align: 'right',
    className: 'hidden lg:table-cell',
    // className: 'hidden lg:table-cell  w-26 max-w-26',
  },
  {
    id: 'attack',
    label: '공격',
    cell: (poke) => poke.attack,
    align: 'right',
    className: 'hidden lg:table-cell',
    // className: 'hidden lg:table-cell  w-26 max-w-26',
  },
  {
    id: 'defense',
    label: '방어',
    cell: (poke) => poke.defense,
    align: 'right',
    className: 'hidden lg:table-cell',
    // className: 'hidden lg:table-cell  w-26 max-w-26',
  },
  {
    id: 'specialAttack',
    label: '특수공격',
    cell: (poke) => poke.specialAttack,
    align: 'right',
    className: 'hidden lg:table-cell',
    // className: 'hidden lg:table-cell w-27.5 max-w-27.5',
  },
  {
    id: 'specialDefense',
    label: '특수방어',
    cell: (poke) => poke.specialDefense,
    align: 'right',
    className: 'hidden lg:table-cell',
    // className: 'hidden lg:table-cell w-27.5 max-w-27.5',
  },
  {
    id: 'speed',
    label: '스피드',
    cell: (poke) => poke.speed,
    align: 'right',
    className: 'hidden lg:table-cell',
    // className: 'hidden lg:table-cell w-26.5 max-w-26.5',
  },
];

export { columns };
