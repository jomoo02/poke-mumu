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
import Training from './ui/resf-info/training';
import TypeDefenses from './ui/type-defense';
import FormPoke from './ui/form-poke';
import Toc from './ui/toc';
import SectionTitle from './ui/section-title';
import DexInfoV2 from './ui/dex-info-v2';
import DexInfoV3 from './ui/dex-info-v3';

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
  } = data;

  return (
    <div className="flex flex-col gap-6 w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative">
      {/* <section>
        <div className=" flex overflow-hidden">
          <Toc />
        </div>
      </section> */}
      <div className="flex lg:justify-center">
        <DexInfoV3 dexInfo={dexInfo} />
      </div>
      <section className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {' '}
          <DexInfo dexInfo={dexInfo} />
        </div>

        <div className="flex flex-col gap-4">
          <DexInfoV2 dexInfo={dexInfo} />
          {/* <div className="w-full h-px bg-border" /> */}
          <Breeding breeding={breeding} />
          {/* <div className="w-full h-px bg-border" /> */}
          <Training training={training} />
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-10">
        <section className="">
          <SectionTitle id="abilities">특성</SectionTitle>
          {/* <div className="border p-6 rounded-2xl bg-card"> */}
          <Abilities abilities={abilities} />
          {/* </div> */}
        </section>
        <section className="">
          <SectionTitle id="base-stats">스탯</SectionTitle>
          <div className="">
            <BaseStats stats={stats} rankRatio={rankRatio} />
          </div>
        </section>
      </div>

      <section className="l">
        <SectionTitle id="type-defense">방어 상성</SectionTitle>
        <TypeDefenses typeDefenses={typeDefense} types={types} />
      </section>
      <section className="">
        <SectionTitle id="evolution">진화</SectionTitle>
        {/* <div className="p-6 bg-card border rounded-2xl shadow-sm"> */}
        <div>
          <EvolutionTree id={evolutionId} />
        </div>
      </section>
      <section className="">
        <SectionTitle id="move">기술</SectionTitle>
        <Moves moves={moves} />
      </section>

      {/* <div className="hidden xl:block w-64 max-h-92 sticky top-20">
          <div className="flex flex-col gap-4">
            {forms && (
              <section>
                <FormPoke poke={poke} />
              </section>
            )}
            <section className="px-4 ">
              <Toc />
            </section>
          </div>
        </div> */}
    </div>
  );
}
