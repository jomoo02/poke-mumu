import { getPokeData } from './api';
import Abilities from './ui/abilities';
import BaseStats from './ui/base-stats';
import DexInfo from './ui/dex-info';
import EvolutionTree from './ui/evolution-tree';
import MinMaxStats from './ui/min-max-stats';
import Breeding from './ui/resf-info/breeding';
import Training from './ui/resf-info/training';
import TypeDefenses from './ui/type-defense';

interface PokedexDexNumberFormPageUIProps {
  pokeKey: string;
}

export default async function PokedexDexNumberFormPageUI({
  pokeKey,
}: PokedexDexNumberFormPageUIProps) {
  const {
    dexInfo,
    training,
    breeding,
    stats,
    abilities,
    typeDefense,
    types,
    evolutionId,
  } = await getPokeData(pokeKey);

  return (
    <div className="flex flex-col w-full mx-auto max-w-7xl p-6 px-4 sm:px-6">
      {/* <div className="grid lg:grid-cols-3 gap-6"> */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col gap-6 lg:max-w-74 xl:max-w-90 w-full">
          <section>
            <DexInfo dexInfo={dexInfo} />
          </section>
          <section>
            <Breeding breeding={breeding} />
          </section>
          <section>
            <Training training={training} />
          </section>
        </div>
        <div className="flex flex-col gap-6 lg:col-span-2 lg:flex-1 h-full">
          <section className="grid lg:grid-cols-2 gap-6">
            {stats && <BaseStats stats={stats} />}
            {stats && <MinMaxStats stats={stats} />}
          </section>
          <section>
            <Abilities abilities={abilities} />
          </section>
          <section>
            <TypeDefenses typeDefenses={typeDefense} types={types} />
          </section>
          <section>
            <EvolutionTree id={evolutionId} />
          </section>
        </div>
      </div>
    </div>
  );
}
