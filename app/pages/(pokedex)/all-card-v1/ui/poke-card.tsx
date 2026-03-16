import { PokeSprite } from '@/app/entities/poke/ui';
import { type NationalPokeView } from '../model';
import { type Type } from '@/app/entities/type/model';
import { TypeBadge } from '@/app/entities/type/ui';
import { BarStats } from '@/app/entities/stats/ui';
import { formatNumber } from '@/app/shared/lib/format';
import Link from 'next/link';

interface PokeCardProps {
  poke: NationalPokeView;
}

export default function PokeCard({ poke }: PokeCardProps) {
  const {
    dexNumber,
    name,
    form,
    type1,
    type2,
    hp,
    attack,
    defense,
    specialAttack,
    specialDefense,
    speed,
    total,
    pokeKey,
  } = poke;

  const stats = {
    hp,
    attack,
    defense,
    specialAttack,
    specialDefense,
    speed,
    total,
  };

  const types = [type1, type2].filter((t): t is Type => t !== null);

  const formattedDexNumber = `No.${formatNumber(dexNumber)}`;
  const href = `/pokedex/${dexNumber}/${pokeKey}`;

  return (
    <Link
      href={href}
      className="border rounded-2xl bg-card overflow-hidden hover:bg-accent/30 shadow-sm"
    >
      <div className="flex items-center p-6 pb-0 gap-4 relative">
        <div className="size-20 flex items-center justify-center">
          <PokeSprite poke={poke} className="size-18" />
        </div>

        <div className="flex-1 overflow-hidden min-w-0">
          <div className="shrink-0 text-muted-foreground  font-medium tabular-nums">
            {formattedDexNumber}
          </div>
          <div className="text-lg font-semibold min-w-0 truncate">{name}</div>
          <div className="text-sm h-5 text-muted-foreground font-medium min-w-0 truncate">
            {form}
          </div>
        </div>
      </div>
      {types.length > 0 && (
        <div className="grid grid-cols-2 gap-2.5 px-6 pt-4">
          {types.map((type) => (
            <TypeBadge
              key={type.identifier}
              type={type}
              className="w-full h-7.5 "
            />
          ))}
        </div>
      )}

      <div className="p-6 pt-4 flex flex-col">
        <BarStats stats={stats} />
      </div>
    </Link>
  );
}
