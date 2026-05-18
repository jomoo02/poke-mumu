import { PokeSprite } from '@/app/entities/poke/ui';
import { type AbilityPokeView } from '../model';
import { getObjectParticle } from '@/app/shared/lib/utils';
import { TypeBadge } from '@/app/entities/type/ui';
import Link from 'next/link';

interface PokeListProps {
  pokes: AbilityPokeView[];
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

        <p className="text-muted-foreground text-md pt-3">{description}</p>
        <div className="grid gap-6">
          <div className="pt-6">
            <h3 className="text-xl font-medium">일반 특성</h3>
            <div className="flex flex-wrap gap-6 pt-6">
              {normalAbilityPokes.map((poke) => (
                <PokeItem key={poke.pokeKey} poke={poke} />
              ))}
            </div>
          </div>
          {hiddenAbilityPokes.length > 0 && (
            <div className="pt-6">
              <h3 className="text-xl font-medium">숨겨진 특성</h3>
              <div className="flex flex-wrap gap-6 pt-6">
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
  poke: AbilityPokeView;
}

function PokeItem({ poke }: PokeItemProps) {
  const { pokeKey, type1, type2, nameKo } = poke;
  return (
    <div className="w-30">
      {' '}
      <div className="flex flex-col gap-1 justify-center items-center">
        <Link
          href={`/pokedex/${pokeKey}`}
          className="active:bg-accent hover:bg-accent rounded-4xl p-2"
        >
          <PokeSprite poke={poke} className="size-20" />
        </Link>

        <Link
          className="font-medium hover:underline underline-offset-3 rounded-4xl px-1"
          href={`/pokedex/${pokeKey}`}
        >
          {nameKo}
        </Link>
      </div>
    </div>
  );
}
