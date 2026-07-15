'use client';

import { cn } from '@/shared/lib/cn';
import type { RegionalPoke } from '../model/poke';
import { Fragment } from 'react/jsx-runtime';
import { PokeLinkDesktop, PokeLinkMobile } from '@/features/poke-link/ui';

interface PokeListProps {
  pokes: RegionalPoke[];
}

export default function PokeList({ pokes }: PokeListProps) {
  return (
    <div
      className={cn(
        'grid gap-4',
        'sm:gap-6 md:gap-12 sm:grid-cols-[repeat(auto-fill,minmax(128px,1fr))]',
      )}
    >
      {pokes.map((poke) => (
        <Fragment key={poke.pokeKey}>
          <PokeLinkMobile
            poke={poke}
            formatLength={3}
            showForm={false}
            className="sm:hidden"
          />
          <PokeLinkDesktop
            poke={poke}
            formatLength={3}
            showForm={false}
            className="hidden sm:flex"
          />
        </Fragment>
      ))}
    </div>
  );
}
