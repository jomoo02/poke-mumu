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
          <div className="">
            <h3 id="rest" className="text-2xl font-semibold mb-6">
              기타
            </h3>
            <RestInfo names={names} training={training} breeding={breeding} />
          </div>
          <div>
            <h3 className="text-3xl font-semibold mb-6">스탯</h3>
            <BaseStats stats={stats} rankRatio={rankRatio} />
          </div>
          <section>
            <Abilities abilities={abilities} />
          </section>
          <div className="grid gap-6 "></div>

          <section className="col-span-2">
            {/* <SectionTitle id="type-defense">방어 상성</SectionTitle> */}
            <TypeDefenses typeDefenses={typeDefense} types={types} />
          </section>
          <section className="col-span-2">
            {/* <SectionTitle id="evolution">진화</SectionTitle> */}
            <div>
              <EvolutionTree id={evolutionId} />
            </div>
          </section>
          <section className="col-span-2">
            {/* <SectionTitle id="move">기술</SectionTitle> */}
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
