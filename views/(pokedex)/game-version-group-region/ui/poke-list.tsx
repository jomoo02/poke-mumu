'use client';

import { useSearchParams } from 'next/navigation';

import { cn } from '@/shared/lib/cn';
import { PokeLinkDesktop, PokeLinkMobile } from '@/features/poke-link/ui';

import type { PokeListMode, RegionalPoke } from '../model';

interface PokeListProps {
  pokes: RegionalPoke[];
}

export default function PokeList({ pokes }: PokeListProps) {
  const params = useSearchParams();
  const mode: PokeListMode = params.get('mode') === 'list' ? 'list' : 'grid';

  if (mode === 'grid') {
    return (
      <div
        className={cn(
          'grid gap-6',
          'md:gap-12 grid-cols-[repeat(auto-fill,minmax(128px,1fr))]',
        )}
      >
        {pokes.map((poke) => (
          <PokeLinkDesktop
            key={poke.pokeKey}
            poke={poke}
            formatLength={3}
            showForm={false}
            className="flex min-w-0"
          />
        ))}
      </div>
    );
  }

  return (
    <div className={cn('grid gap-4 max-w-lg mx-auto w-full')}>
      {pokes.map((poke) => (
        <PokeLinkMobile
          key={poke.pokeKey}
          poke={poke}
          formatLength={3}
          showForm={false}
          className="min-w-0"
        />
      ))}
    </div>
  );
}
