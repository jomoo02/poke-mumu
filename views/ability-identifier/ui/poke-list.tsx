import Link from 'next/link';

import { cn } from '@/shared/lib/cn';
import { PokeSprite } from '@/entities/poke/ui';
import { getObjectParticle } from '@/shared/lib/utils';

import { type Poke } from '../model';
import { ChevronRightIcon } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';

interface PokeListProps {
  pokes: Poke[];
  abilityName: string;
}

export default function PokeList({ pokes, abilityName }: PokeListProps) {
  const normalAbilityPokes = pokes.filter((poke) => !poke.isHidden);
  const hiddenAbilityPokes = pokes.filter((poke) => poke.isHidden);

  const description = `특성 ${abilityName}${getObjectParticle(abilityName)} 보유한 포켓몬 목록`;
  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold tracking-wide mt-12">포켓몬</h2>

        <p className="text-muted-foreground text-md pt-3">{description}</p>
        <div className="flex flex-col gap-6">
          <div className="pt-6">
            <h3 className="text-xl font-medium">일반 특성</h3>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3  pt-6">
              {normalAbilityPokes.map((poke, idx) => (
                <PokeItem key={poke.pokeKey} poke={poke} />
              ))}
            </div>
          </div>
          {hiddenAbilityPokes.length > 0 && (
            <div className="pt-6">
              <h3 className="text-xl font-medium">숨겨진 특성</h3>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3 pt-6">
                {hiddenAbilityPokes.map((poke) => (
                  <PokeItem key={poke.pokeKey} poke={poke} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface PokeItemProps {
  poke: Poke;
}

function PokeItem({ poke }: PokeItemProps) {
  const { pokeKey, nameKo, form } = poke;
  const href = `/pokedex/${pokeKey}`;
  return (
    <Link href={href} className="block">
      <div className="flex items-center px-4 py-3 bg-accent/50 hover:bg-accent gap-4 rounded-2xl">
        <div>
          <PokeSprite poke={poke} className="size-12" />
        </div>
        <div className="flex flex-col flex-1 gap-x-3">
          <div className="font-medium truncate ">{nameKo}</div>
          <div className="text-foreground/70 text-sm">{form}</div>
        </div>
        <ChevronRightIcon className="size-4.5" />
      </div>
    </Link>
  );
}
