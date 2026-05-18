import { Fragment } from 'react/jsx-runtime';
import { DotIcon } from 'lucide-react';

import { cn } from '@/app/shared/lib/cn';
import { TypeBadge } from '@/app/entities/type/ui';
import { formatNumber } from '@/app/shared/lib/format';

import {
  type SpeciesView,
  type HeroView,
  GROWTH_RATE_LABEL,
} from '../../model';
import PokeHeroImg from './poke-img';

interface DexInfo2Props {
  hero: HeroView;
  species: SpeciesView;
}

export default function HeroV2({ hero, species }: DexInfo2Props) {
  const {
    nameKo,
    nameEn,
    nameJa,
    dexNumber,
    form,
    type1,
    type2,
    sprite,
    weight,
    height,
  } = hero;
  const primaryType = type1;

  const {
    eggGroup1,
    eggGroup2,
    hatchCounter,
    genderRate,
    captureRate,
    baseHappiness,
    growthRate,
    generaKo,
  } = species;

  const eggGroup = `${eggGroup1}` + (eggGroup2 ? `, ${eggGroup2}` : '');
  return (
    <section className="grid md:grid-cols-2 gap-6 border rounded-4xl p-6 h-full bg-card">
      <div className="h-full flex items-center justify-center flex-1 w-full">
        <div className="relative size-72 lg:size-104">
          <PokeHeroImg
            sprite={sprite}
            name={nameKo}
            type={primaryType}
            className="h-full w-full"
            priority
          />
        </div>
      </div>

      <div className="grid ">
        <div className="flex flex-col justify-between">
          <div>
            <Item label="타입">
              <div className="flex flex-wrap gap-2 pt-1">
                {[type1, type2]
                  .filter((type) => !!type)
                  .map((t) => (
                    <TypeBadge key={t.identifier} type={t} />
                  ))}
              </div>
            </Item>
            {form && <Item label="모습">{form}</Item>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Item label="분류" className="col-span-2">
              {generaKo}
            </Item>
            <Item label="키">{height}</Item>
            <Item label="몸무게">{weight}</Item>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ItemProps {
  label: string;
  className?: string;
  children: React.ReactNode;
}

function Item({ label, className, children }: ItemProps) {
  return (
    <div
      className={cn('flex flex-col px-4 py-3 bg-muted rounded-2xl', className)}
    >
      <div className="text-muted-foreground text-md">{label}</div>
      <div>{children}</div>
    </div>
  );
}

function InfoCard({
  genera,
  height,
  weight,
}: {
  genera: string;
  height: string;
  weight: string;
}) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl bg-background/80 backdrop-blur-sm border px-4 py-3">
      <span className="text-base font-semibold">{genera}</span>
      <span className="text-sm text-muted-foreground tabular-nums">
        {height} · {weight}
      </span>
    </div>
  );
}
