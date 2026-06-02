import { PokeSprite } from '@/entities/poke/ui';
import { RegionalPoke } from '../model/poke';
import { formatNumber } from '@/shared/lib/format';
import { TypeIcon } from '@/entities/type/ui';
import Link from 'next/link';
import { cn } from '@/shared/lib/cn';
import { Fragment } from 'react/jsx-runtime';

interface PokeListProps {
  pokes: RegionalPoke[];
}

export default function PokeList({ pokes }: PokeListProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6 w-full">
      {pokes.map((poke, idx) => (
        <Fragment key={poke.pokeKey}>
          {/* {idx > 0 && (
            <div>
              <div className="w-full h-px my-1 bg-border" />
            </div>
          )} */}

          <Link
            href={`/pokedex/${poke.pokeKey}`}
            className={cn(
              'flex items-center py-3.5 px-4 gap-x-4 justify-between rounded-2xl bg-accent/50',
              'hover:bg-accent border border-transparent',
              'outline-none focus-visible:ring-[3px] focus-visible:border-ring focus-visible:ring-ring/50',
            )}
          >
            <div className="flex items-center gap-x-4">
              <div className="flex flex-col items-center justify-center font-medium ">
                {/* <span className="text-sm text-muted-foreground">No</span> */}
                <span className="tabular-nums text-foreground/70 font-semibold">
                  {formatNumber(poke.regionalDexNumber, 3)}
                </span>
              </div>
              <div className="px-1">
                <PokeSprite poke={poke} className="size-13" />
              </div>

              <div className="flex flex-col">
                <span className="font-medium">{poke.nameKo}</span>
                <span className="text-sm">{poke.form}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              <TypeIcon type={poke.type1} className="size-7 rounded-md" />
              {poke.type2 && (
                <TypeIcon type={poke.type2} className="size-7 rounded-md" />
              )}
            </div>
          </Link>
        </Fragment>
      ))}
    </div>
  );
}
