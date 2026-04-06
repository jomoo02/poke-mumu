import { getPokeData } from './api';
import { getDexNumberForms } from './api/form';
import Abilities from './ui/abilities';
import BaseStats from './ui/base-stats';
import DexInfo from './ui/dex-info';
import EvolutionTree from './ui/evolution-tree';
import Forms from './ui/forms';
import MinMaxStats from './ui/min-max-stats';
import Moves from './ui/moves';
import Breeding from './ui/resf-info/breeding';

import TypeDefenses from './ui/type-defense';
import FormPoke from './ui/form-poke';
import Toc from './ui/toc';
import SectionTitle from './ui/section-title';

import RestInfo from './ui/resf-info';
import DexInfoV2 from './ui/dex-info-v2';
import { Suspense } from 'react';
import { cn } from '@/app/shared/lib/cn';
import Title from './ui/title';

interface PokedexDexNumberFormPageUIProps {
  dexNumber: string;
  pokeKey: string;
}

export default async function PokedexDexNumberFormPageUIVV3({
  pokeKey,
  dexNumber,
}: PokedexDexNumberFormPageUIProps) {
  const [data, forms] = await Promise.all([
    getPokeData(pokeKey),
    getDexNumberForms(dexNumber),
  ]);

  const {
    dexInfo,
    training,
    breeding,
    stats,
    abilities,
    typeDefense,
    types,
    evolutionId,
    moves,
    rankRatio,
    poke,
    names,
  } = data;

  return (
    <Suspense>
      <div
        className={cn(
          'mx-auto w-full py-10 relative max-w-3xl px-4 sm:px-6 bg-card',
        )}
      >
        <DexInfoV2 dexInfo={dexInfo} />

        <section>
          <SectionTitle id="rest-info">기타 정보</SectionTitle>
          <RestInfo names={names} training={training} breeding={breeding} />
        </section>
        <section>
          <SectionTitle id="abilities">특성</SectionTitle>
          <Abilities abilities={abilities} />
        </section>
        <section>
          <SectionTitle id="stats">스탯</SectionTitle>
          <BaseStats stats={stats} rankRatio={rankRatio} name={dexInfo.name} />
        </section>
        <section>
          <SectionTitle id="type-defense">방어 상성</SectionTitle>
          <TypeDefenses typeDefenses={typeDefense} />
        </section>

        <section>
          <SectionTitle id="evolution">진화</SectionTitle>
          <EvolutionTree id={evolutionId} />
        </section>
        <section>
          <SectionTitle id="move">기술</SectionTitle>
          <Moves moves={moves} />
        </section>
      </div>
    </Suspense>
  );
}
