import { getPokeData } from './api';
import { getDexNumberForms } from './api/form';
import Abilities from './ui/abilities';
import BaseStats from './ui/base-stats';
import DexInfo from './ui/dex-info';
import EvolutionTree from './ui/evolution-tree';
import Moves from './ui/moves';
import Moves2 from './ui/moves-2';

import TypeDefenses from './ui/type-defense';

import SectionTitle from './ui/section-title';

import RestInfo from './ui/resf-info';
import MinMaxStats from './ui/min-max-stats';
import LevelStats from './ui/level-stats';
import Stats from './ui/stats';
import DexInfo2 from './ui/dex-info-2';
import RestInfo2 from './ui/rest-info-2';

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

  const nameKo = dexInfo.name;

  return (
    <div className="flex flex-col w-full">
      <div className="max-w-384 mx-auto w-full px-4 sm:px-6">
        <DexInfo2 dexInfo={dexInfo} />
      </div>

      <div className="flex flex-col w-full mx-auto px-4 sm:px-6 relative max-w-7xl gap-6">
        <div className="grid lg:grid-cols-3 gap-6"></div>
        <section className="lg:col-span-2">
          {/* <DexInfo dexInfo={dexInfo} /> */}
        </section>
        <section>
          {/* <RestInfo names={names} training={training} breeding={breeding} /> */}
          <RestInfo2 names={names} training={training} breeding={breeding} />
        </section>
        {/* <section>
          <RestInfo names={names} training={training} breeding={breeding} />
        </section> */}
        <div>
          <section>
            <Abilities abilities={abilities} name={nameKo} />
          </section>
        </div>
        <section>
          <Stats stats={stats} name={nameKo} />
        </section>

        <section>
          <TypeDefenses
            typeDefenses={typeDefense}
            types={types}
            name={nameKo}
          />
        </section>
        <div className="grid lg:grid-cols-2 gap-6"></div>

        <section>
          <EvolutionTree id={evolutionId} />
        </section>
        <section>
          {/* <Moves moves={moves} name={nameKo} /> */}
          <Moves2 moves={moves} name={nameKo} />
        </section>
      </div>

      <div className=" relative  w-full  ">
        <div className="flex flex-col max-w-7xl mx-auto gap-6 bg-card py-6 px-4 sm:px-6"></div>
      </div>

      {/* <div className="hidden xl:block sticky top-32 max-h-[calc(100svh-8rem)] z-10 w-60">
        <Toc />
      </div> */}
    </div>
  );
}
