import { PokeSprite } from '@/app/entities/poke/ui';
import { PokemonWithMove } from '../model';
import Link from 'next/link';

interface LearnPokeListProps {
  pokes: PokemonWithMove[];
  learnMethods: {
    id: number;
    identifier: string;
    nameKo: string;
  }[];
}

export default function LearnPokeList({
  pokes,
  learnMethods,
}: LearnPokeListProps) {
  if (pokes.length <= 0) {
    return null;
  }

  const learnData = learnMethods
    .map(({ identifier, nameKo }) => {
      const methodPokes = pokes.filter(
        (p) => p.learnMethodIdentifier === identifier,
      );
      return {
        identifier,
        label: nameKo,
        pokes: methodPokes,
      };
    })
    .filter(({ pokes }) => pokes.length > 0);

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-wide mt-10">배우는 포켓몬</h2>
      <p className="text-muted-foreground text-md pt-3">
        스칼렛·바이올렛 버전 기준
      </p>
      <div className="flex flex-col gap-6">
        {learnData.map(({ identifier, label, pokes }) => (
          <div className="pt-6 flex flex-col gap-6" key={identifier}>
            <h3 className="text-xl font-medium">{label}</h3>
            <div className="flex flex-wrap gap-3 gap-x-6">
              {pokes.map((poke) => (
                <div
                  key={`${poke.pokeKey}-${poke.level}`}
                  className="flex flex-col items-center justify-center w-30 gap-1"
                >
                  <Link
                    href={`/pokedex/${poke.pokeKey}`}
                    className="active:bg-accent hover:bg-accent rounded-4xl p-2"
                  >
                    <PokeSprite poke={poke} className="size-20" />
                  </Link>

                  <Link
                    className="font-medium hover:underline underline-offset-3 rounded-4xl px-1"
                    href={`/pokedex/${poke.pokeKey}`}
                  >
                    {poke.nameKo}
                  </Link>
                  {identifier === 'level-up' && (
                    <div className="text-sm text-muted-foreground ">
                      Lv.{poke.level}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
