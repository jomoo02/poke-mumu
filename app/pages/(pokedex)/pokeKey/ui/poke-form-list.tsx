import Link from 'next/link';

import { PokeSprite } from '@/app/entities/poke/ui';
import { cn } from '@/app/shared/lib/cn';

import { type PokeFormView } from '../model';

interface PokeFormListProps {
  pokes: PokeFormView[];
  pokeKey: string;
}

export default function PokeFormList({ pokes, pokeKey }: PokeFormListProps) {
  return (
    <div className=" gap-x-1 border-b">
      <div className="flex overflow-x-auto ">
        {pokes.map((poke) => (
          <PokeForm
            key={poke.pokeKey}
            poke={poke}
            className={
              pokeKey === poke.pokeKey
                ? 'font-medium border-b-foreground'
                : 'hover:text-foreground active:text-foreground text-foreground/70'
            }
          />
        ))}
      </div>
    </div>
  );
}

interface PokeFormProps {
  poke: PokeFormView;
  className?: string;
}

function PokeForm({ poke, className }: PokeFormProps) {
  const { pokeKey } = poke;

  const href = `/pokedex/${pokeKey}`;
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center px-2.5 py-2 gap-x-2 border-b-2 border-transparent relative',
        className,
      )}
    >
      <PokeSprite poke={poke} className="size-7" />
      <div className="text-md">{poke.nameKo}</div>
    </Link>
  );
}
