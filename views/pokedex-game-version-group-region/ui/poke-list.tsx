'use client';

import { Fragment } from 'react';

import { cn } from '@/shared/lib/cn';
import { PokeLinkDesktop, PokeLinkMobile } from '@/features/poke-link/ui';

import type { RegionalPoke } from '../model/poke';

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
