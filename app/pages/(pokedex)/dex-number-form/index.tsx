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
    <div className="flex">
      <div className="flex flex-col w-full mx-auto px-4 sm:px-6 xl:px-0 relative max-w-7xl">
        <div>
          <DexInfo dexInfo={dexInfo} />
        </div>
        <div className="w-full h-px bg-border my-6" />
        <section className="grid lg:grid-cols-2 gap-6">
          <div className="border rounded-2xl p-6">
            <Breeding breeding={breeding} />
          </div>

          <div className="border  rounded-2xl p-6">
            <Training training={training} />
          </div>
          {/* <div className="w-full h-px bg-border" /> */}
        </section>
        <section className="">
          <SectionTitle id="abilities">특성</SectionTitle>

          <Abilities abilities={abilities} />
        </section>
        <section className="">
          <SectionTitle id="base-stats">스탯</SectionTitle>
          <div className="">
            <BaseStats stats={stats} rankRatio={rankRatio} />
          </div>
        </section>

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
      </div>
      <div className="hidden xl:block sticky top-32 max-h-[calc(100svh-8rem)] z-10 w-64">
        <Toc />
      </div>
    </div>
  );
}
