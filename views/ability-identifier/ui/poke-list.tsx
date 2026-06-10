import Link from 'next/link';

import { cn } from '@/shared/lib/cn';
import { getObjectParticle } from '@/shared/lib/utils';
import PokeItem from '@/features/poke-item/ui';

import type { AbilityPoke } from '../api';

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
      <div className="grid lg:grid-cols-12 gap-6">
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
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-1 pt-6 gap-x-6 lg:max-w-md gap-y-3">
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
    <Link
      href={href}
      className={cn(
        'block border border-transparent hover:bg-muted rounded-2xl',
        'outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring',
        '-mx-1',
      )}
    >
      <PokeItem poke={poke} className="p-1" />
    </Link>
  );
}
