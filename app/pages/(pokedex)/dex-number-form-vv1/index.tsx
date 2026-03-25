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

interface PokedexDexNumberFormPageUIProps {
  dexNumber: string;
  pokeKey: string;
}

export default async function PokedexDexNumberFormPageUI({
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
      <div className=" mx-auto w-full flex justify-between py-10 gap-10 relative">
        {/* <div className="grid grid-cols-[1fr_minmax(0,768px)_1fr]"> */}
        {/* <div /> */}
        <div className="lg:px-2 flex-1 w-full max-w-3xl mx-auto py-2">
          <DexInfoV2 dexInfo={dexInfo} />
          <section>
            <SectionTitle id="rest-info">기타</SectionTitle>
            <RestInfo names={names} training={training} breeding={breeding} />
          </section>
          <section>
            <SectionTitle id="base-stats">스탯</SectionTitle>
            <BaseStats stats={stats} rankRatio={rankRatio} />
          </section>
          <section>
            <SectionTitle id="ability">특성</SectionTitle>
            <Abilities abilities={abilities} />
          </section>
          <section>
            <SectionTitle id="type-defense">방어 상성</SectionTitle>
            <TypeDefenses typeDefenses={typeDefense} types={types} />
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
        <div className="sticky top-24 z-20 h-50 hidden xl:block w-52">
          <div className="pl-2 pr-4 py-2">
            <Toc />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
