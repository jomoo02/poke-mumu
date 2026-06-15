'use client';

import { RegionalPoke } from '../model/poke';

import { cn } from '@/shared/lib/cn';

import { NationalPokeItem, PokeItem } from '@/features/poke-item/ui';
import { PokeLink } from '@/features/poke-link/ui';
interface PokeListProps {
  pokes: RegionalPoke[];
}

export default function PokeListV2({ pokes }: PokeListProps) {
  return (
    <div
      className={cn(
        'grid gap-4 sm:gap-6 md:gap-12 sm:grid-cols-[repeat(auto-fill,minmax(138px,1fr))]',
      )}
    >
      {pokes.map((poke, idx) => (
        <Item key={poke.pokeKey} poke={poke} />
      ))}
    </div>
  );
}

interface ItemProps {
  poke: RegionalPoke;
}

function Item({ poke }: ItemProps) {
  return (
    <div>
      <PokeLink
        poke={poke}
        formatLength={3}
        showForm={false}
        className="hidden sm:flex"
      />
      <PokeItem
        poke={poke}
        formatLength={3}
        showForm={false}
        className="sm:hidden"
      />
    </div>
  );
}
