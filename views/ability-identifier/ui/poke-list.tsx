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

export default function PokeListV2({ pokes, abilityName }: PokeListProps) {
  const normalAbilityPokes = pokes.filter((poke) => !poke.isHidden);
  const hiddenAbilityPokes = pokes.filter((poke) => poke.isHidden);

  const description = `특성 ${abilityName}${getObjectParticle(abilityName)} 보유한 포켓몬 목록`;
  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold tracking-wide mt-10 px-4 sm:px-6 ">
          포켓몬
        </h2>

        <p className="text-muted-foreground text-md pt-3 px-4 sm:px-6 ">
          {description}
        </p>
        <div className="grid gap-y-6 gap-x-20 md:grid-cols-2">
          <div className="pt-6">
            <h3 className="text-xl font-medium px-4 sm:px-6 ">일반 특성</h3>
            <div className="flex flex-col pt-6 max-w-lg w-full  px-4 sm:px-6">
              {normalAbilityPokes.map((poke, idx) => (
                <Fragment key={poke.pokeKey}>
                  {/* {idx > 0 && <div className="w-full h-px bg-border" />} */}
                  <PokeItem key={poke.pokeKey} poke={poke} />
                </Fragment>
              ))}
            </div>
          </div>
          {hiddenAbilityPokes.length > 0 && (
            <div className="pt-6">
              <h3 className="text-xl font-medium">숨겨진 특성</h3>
              <div className="flex flex-col divide-y  pt-6 max-w-lg w-full">
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
  const { pokeKey, type1, type2, nameKo } = poke;
  const href = `/pokedex/${pokeKey}`;
  return (
    <Link
      href={href}
      className={cn(
        // 'hover:bg-accent/70 active:bg-accent/70  px-4  py-3 rounded-4xl',
        'hover:bg-muted/70 rounded-4xl -mx-4  px-4  py-3',
        'outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
      )}
      aria-label={`${nameKo} 상세 페이지로 이동`}
    >
      <div className="flex gap-x-4 items-center group  ">
        <div className="p-1.5 rounded-2xl bg-muted/50">
          <PokeSprite poke={poke} className="size-13" />
        </div>

        <div className="flex-1">
          <div className="flex-1 text-sm truncate">No.{poke.dexNumber}</div>
          <div className="font-medium truncate flex-1 text-primary group-hover:underline group-active:underline ">
            {poke.nameKo}
          </div>
          <div className="text-sm text-foreground/70">{poke.form}</div>
        </div>

        <ChevronRightIcon className="size-4.5" />
      </div>
    </Link>
  );
}
