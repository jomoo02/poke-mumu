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

export default function Hero({ hero, species }: DexInfo2Props) {
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
    <section className="grid gap-x-8 lg:grid-cols-12">
      {/* <section className="relative flex flex-col lg:flex-row justify-between w-full gap-6 "> */}
      {/* 데스크탑: 겹침 레이아웃 */}

      {/* <div className="flex flex-col gap-6 justify-between">
        <div>
          <span className="text-lg  tracking-widest text-muted-foreground font-semibold">
            No.{formatNumber(dexNumber)}
          </span>
          <h1 className="text-5xl font-bold tracking-tight leading-[0.95]">
            {nameKo}
          </h1>
          <div className="flex flex-wrap items-center gap-1.5">
            {[nameEn, nameJa].map((n, index) => (
              <Fragment key={n}>
                {index > 0 && <DotIcon className="size-4.5" />}
                <div className="text-lg">{n}</div>
              </Fragment>
            ))}
          </div>
          {form && <p className="text-base text-muted-foreground">{form}</p>}
          <div className="flex flex-wrap gap-2 pt-1">
            {[type1, type2]
              .filter((type) => !!type)
              .map((t) => (
                <TypeBadge key={t.identifier} type={t} />
              ))}
          </div>
        </div>

        <div>
          {' '}
          <Item label="분류">{generaKo}</Item>
          {weight} - {height}
        </div>
      </div> */}
      <div className="h-full flex items-center justify-center flex-1 w-full col-[1/7]">
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

      <div className="grid  grid-cols-2 gap-x-8 col-[8/-1]">
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
          <div className="flex flex-col gap-3">
            <Item label="분류">{generaKo}</Item>
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
  children: React.ReactNode;
}

function Item({ label, children }: ItemProps) {
  return (
    <div className="flex flex-col py-1.5">
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
