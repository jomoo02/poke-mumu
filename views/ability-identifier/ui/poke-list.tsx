import Link from 'next/link';

import { cn } from '@/shared/lib/cn';
import { getObjectParticle } from '@/shared/lib/utils';
import { NationalPokeItem, PokeItem } from '@/features/poke-item/ui';

import type { AbilityPoke } from '../api';
import { PokeLinkDesktop } from '@/features/poke-link/ui/poke-link/desktop';
import { PokeLink } from '@/features/poke-link/ui';

interface PokeListProps {
  pokes: AbilityPoke[];
  abilityName: string;
}

export default function PokeList({ pokes, abilityName }: PokeListProps) {
  const normalPokes = pokes.filter((poke) => !poke.isHidden);
  const hiddenPokes = pokes.filter((poke) => poke.isHidden);

  const title = '보유 포켓몬';
  const normalTitle = '일반 특성';
  const hiddenTitle = '숨겨진 특성';

  const description = `특성 ${abilityName}${getObjectParticle(abilityName)} 보유한 포켓몬 목록`;

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-wide mt-10">{title}</h2>
      <p className="pt-3 text-foreground/70">{description}</p>
      {/* <div className="grid lg:grid-cols-12 gap-6">
        <ItemList
          pokes={normalPokes}
          title={normalTitle}
          className="mt-8 lg:col-span-5"
        />
        <ItemList
          pokes={hiddenPokes}
          title={hiddenTitle}
          className="mt-8 lg:col-span-5 lg:col-start-8"
        />
      </div> */}
      <div className="flex flex-col gap-6">
        <ItemList
          pokes={normalPokes}
          title={normalTitle}
          className="mt-8 lg:col-span-5"
        />
        <ItemList
          pokes={hiddenPokes}
          title={hiddenTitle}
          className="mt-8 lg:col-span-5 lg:col-start-8"
        />
      </div>
    </div>
  );
}

interface ItemListProps {
  title: string;
  pokes: AbilityPoke[];
  className?: string;
}

function ItemList({ title, pokes, className }: ItemListProps) {
  return (
    <div className={cn(pokes.length === 0 && 'opacity-30', className)}>
      <h3 className="text-xl font-semibold mt-8">{title}</h3>
      <div className="pt-6 grid gap-4 sm:gap-6 md:gap-12 sm:grid-cols-[repeat(auto-fill,minmax(128px,1fr))]">
        {pokes.map((poke) => (
          <Item key={poke.pokeKey} poke={poke} />
        ))}
      </div>
    </div>
  );
}

interface ItemProps {
  poke: AbilityPoke;
}

function Item({ poke }: ItemProps) {
  const href = `/pokedex/${poke.pokeKey}`;

  return (
    <div>
      <PokeLinkDesktop poke={poke} />
      {/* <PokeItem poke={poke} className="p-1" /> */}
    </div>
  );
}
