import Link from 'next/link';

import { cn } from '@/shared/lib/cn';
import { PokeSprite } from '@/entities/poke/ui';
import { getObjectParticle } from '@/shared/lib/utils';
import { TypeIcon } from '@/entities/type/ui';

import type { Poke } from '../model';

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
        <h2 className="text-2xl font-bold tracking-wide mt-10">포켓몬</h2>
        <p className="text-muted-foreground pt-3">{description}</p>
        <div className="flex flex-col gap-6">
          <div className="mt-8">
            <h3 className="text-xl font-medium">일반 특성</h3>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-4 sm:gap-6 pt-6">
              {normalAbilityPokes.map((poke) => (
                <PokeItem key={poke.pokeKey} poke={poke} />
              ))}
            </div>
          </div>
          {hiddenAbilityPokes.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-medium">숨겨진 특성</h3>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-4 sm:gap-6 pt-6">
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
  const { pokeKey, nameKo, form, type1, type2 } = poke;
  const href = `/pokedex/${pokeKey}`;

  return (
    <Link
      href={href}
      className={cn(
        'block border border-transparent  rounded-2xl',
        'outline-none focus-visible:ring-[3px] focus-visible:border-ring focus-visible:ring-ring/50 rounded-2xl px-3.5 py-3',
        'bg-muted/50 hover:bg-muted active:bg-muted',
      )}
    >
      <div className="flex items-center gap-x-4">
        <div className="">
          <PokeSprite poke={poke} className="size-12" />
        </div>
        <div className="flex flex-col flex-1 gap-x-4 overflow-hidden">
          <div className="font-medium truncate">{nameKo}</div>
          <div className="text-foreground/70 text-sm truncate">{form}</div>
        </div>
        <div className="grid grid-cols-2 gap-1.5 items-center">
          <TypeIcon type={type1} className="size-7 rounded-md" />
          {type2 && <TypeIcon type={type2} className="size-7 rounded-md" />}
        </div>
      </div>
    </Link>
  );
}
