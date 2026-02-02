import { getPokeData } from './api';
import { getDexNumberForms } from './api/form';
import Abilities from './ui/abilities';
import BaseStats from './ui/base-stats copy';
import DexInfo from './ui/dex-info';
import EvolutionTree from './ui/evolution-tree';
import Forms from './ui/forms';
import MinMaxStats from './ui/min-max-stats copy';
import Moves from './ui/moves';
import Breeding from './ui/resf-info/breeding';
import Training from './ui/resf-info/training';
import TypeDefenses from './ui/type-defense';

interface PokedexDexNumberFormPageUIProps {
  dexNumber: string;
  pokeKey: string;
}

export default async function PokedexDexNumberFormV2PageUI({
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
  } = data;

  return (
    <div className="flex flex-col w-full mx-auto max-w-7xl 2xl:max-w-360 p-6 px-4 sm:px-6">
      {/* <div className="grid lg:grid-cols-3 gap-6"> */}
      <section className="mb-6">
        <DexInfo dexInfo={dexInfo} />
      </section>
      <div className="flex flex-col lg:flex-row  gap-8">
        <div className="flex-1 flex flex-col gap-8">
          <section>
            <Abilities abilities={abilities} />
          </section>
          <div className="w-full h-px  bg-border my-8" />
          <section>
            <h2 className="text-3xl font-semibold mb-6 w-full">스탯</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {stats && <BaseStats stats={stats} />}
              {stats && <MinMaxStats stats={stats} />}
            </div>
          </section>
          <div className="w-full h-px  bg-border my-8" />
          <section>
            <TypeDefenses typeDefenses={typeDefense} types={types} />
          </section>
        </div>

        <div className="flex flex-col gap-6 lg:max-w-74 xl:max-w-90 w-full">
          <section>
            <Breeding breeding={breeding} />
          </section>
          <section>
            <Training training={training} />
          </section>
        </div>
      </div>
      <div className="w-full h-px  bg-border my-8" />
      <section>
        <EvolutionTree id={evolutionId} />
      </section>
      <div className="w-full h-px  bg-border my-8" />
      <section>
        <Moves moves={moves} />
      </section>

      {/* <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col gap-6 lg:max-w-74 xl:max-w-90 w-full">
          {forms && (
            <section>
              <Forms
                pokes={forms}
                initialPoke={pokeKey}
                dexNumber={dexNumber}
              />
            </section>
          )}

        </div>
        <div className="flex flex-col gap-6 lg:col-span-2 lg:flex-1 h-full">



        </div>
      </div> */}
    </div>
  );
}
