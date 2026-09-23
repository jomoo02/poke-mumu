import { Fragment } from 'react';

import { cn } from '@/shared/lib/cn';
import {
  PokeLinkHorizontal,
  PokeLinkVertical,
} from '@/features/poke-link-v2/ui';

import type { RegionalPoke } from '../model';

interface PokeListProps {
  pokes: RegionalPoke[];
}

export default function PokeList({ pokes }: PokeListProps) {
  return (
    <div className="@container">
      <ul className="grid grid-cols-1 gap-4 @[31rem]:hidden">
        {pokes.map((poke) => (
          <PokeLinkHorizontal
            key={poke.pokeKey}
            poke={poke}
            formatLength={3}
            showForm={false}
            // className="sm:hidden min-w-0"
          />
        ))}
      </ul>

      <div
        className={cn(
          // 'grid gap-4',
          // 'sm:gap-6 md:gap-12 sm:grid-cols-[repeat(auto-fill,minmax(128px,1fr))]',
          'hidden @[31rem]:grid justify-between gap-y-9',
          'grid-cols-[repeat(3,140px)]',
          '@[42rem]:grid-cols-[repeat(4,140px)]',
          '@[64rem]:grid-cols-[repeat(6,140px)]',
          '@[86rem]:grid-cols-[repeat(7,140px)]',

          // 'hidden gap-9 @[32rem]:grid',
          // 'grid-cols-3',
          // '@[44rem]:grid-cols-4',
          // '@[66rem]:grid-cols-6',
          // '@[78rem]:grid-cols-7',
          // '@[89rem]:grid-cols-8',
        )}
      >
        {pokes.map((poke) => (
          <Fragment key={poke.pokeKey}>
            {/* <PokeLinkHorizontal
              poke={poke}
              formatLength={3}
              showForm={false}
              className="sm:hidden min-w-0"
            /> */}
            <PokeLinkVertical
              poke={poke}
              formatLength={3}
              showForm={false}
              className="min-w-0"
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
