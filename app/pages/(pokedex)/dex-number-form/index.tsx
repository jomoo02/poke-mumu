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
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full mx-auto px-4 sm:px-6 lg:px-8 relative max-w-7xl py-4">
        <DexInfo dexInfo={dexInfo} />
      </div>

      <div className=" px-4 sm:px-6 lg:px-8 relative  w-full py-6">
        <div className="flex flex-col max-w-6xl mx-auto gap-6">
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
      </div>

      {/* <div className="hidden xl:block sticky top-32 max-h-[calc(100svh-8rem)] z-10 w-60">
        <Toc />
      </div> */}
    </div>
  );
}
