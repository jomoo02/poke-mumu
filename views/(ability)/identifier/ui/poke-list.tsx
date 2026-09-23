import { Fragment } from 'react';

import {
  PokeLinkHorizontal,
  PokeLinkVertical,
} from '@/features/poke-link-v2/ui';

import { AbilityPoke } from '../model/poke';

interface PokeListProps {
  pokes: AbilityPoke[];
  title: string;
}

export default function PokeList({ pokes, title }: PokeListProps) {
  const zeroCase = `${title}으로 보유 중인 포켓몬이 없습니다.`;

  return (
    <div className="flex flex-col gap-6 mt-6">
      <h3 className="text-lg font-semibold">
        {title} ({pokes.length})
      </h3>
      {pokes.length === 0 ? (
        <div className="-mt-2 text-foreground/70">{zeroCase}</div>
      ) : (
        <div className="grid gap-4 sm:gap-6 md:gap-12 sm:grid-cols-[repeat(auto-fill,minmax(128px,1fr))]">
          {pokes.map((poke) => (
            <Fragment key={poke.pokeKey}>
              <PokeLinkHorizontal
                poke={poke}
                formatLength={4}
                showForm={true}
                className="sm:hidden min-w-0"
              />
              <PokeLinkVertical
                poke={poke}
                formatLength={4}
                showForm={true}
                className="hidden sm:flex min-w-0"
              />
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
