import Link from 'next/link';

import { formatNumber } from '@/app/shared/lib/format';
import { TypeBadge } from '@/app/entities/type/ui';

import { type NationalPokeView, type TableHead } from '../../model';
import { PokeSprite } from '@/app/entities/poke/ui';

type Column = {
  id: TableHead;
  header: string;
  sortable?: boolean;
  align?: 'left' | 'right';
  width?: string;
  cell: (poke: NationalPokeView) => React.ReactNode;
};

export const columns: Column[] = [
  // {
  //   id: 'pokeImage',
  //   header: '',
  //   sortable: false,
  //   width: 'w-20',
  //   cell: (poke) => (
  //     <Link href={`/pokedex/${poke.dexNumber}/${poke.pokeKey}`}>
  //       <PokeSprite poke={poke} className="size-12 " />
  //     </Link>
  //   ),
  // },
  {
    id: 'dexNumber',
    header: '도감번호',
    sortable: true,
    width: 'w-38 min-w-38',
    cell: (poke) => (
      <div className="flex items-center gap-4">
        <Link href={`/pokedex/${poke.dexNumber}/${poke.pokeKey}`}>
          <PokeSprite poke={poke} className="size-12 " />
        </Link>
        <div className="text-sm">#{formatNumber(poke.dexNumber)}</div>
      </div>
    ),
  },
  {
    id: 'name',
    header: '이름',
    width: 'min-w-0 flex-1',
    sortable: true,
    cell: (poke) => (
      <div className="flex flex-col justify-center overflow-hidden w-full truncate ">
        <Link
          href={`/pokedex/${poke.dexNumber}/${poke.pokeKey}`}
          className="w-full p-1 pl-0 pb-0 overflow-hidden"
          aria-label={`${poke.name} 상세 페이지로 이동`}
        >
          <div className="text-foreground truncate font-medium hover:underline active:underline">
            {poke.name}
          </div>
        </Link>
        <div className="text-muted-foreground text-sm font-medium">
          {poke.form}
        </div>
      </div>
    ),
  },
  {
    id: 'type',
    header: '타입',
    sortable: false,
    width: 'w-26 min-w-26',
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
];
