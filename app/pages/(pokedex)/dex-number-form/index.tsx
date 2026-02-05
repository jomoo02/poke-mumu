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
  } = data;

  return (
    <div className="flex flex-col w-full mx-auto max-w-7xl 2xl:max-w-[90rem] p-6 px-4 sm:px-6">
      {/* <div className="grid lg:grid-cols-3 gap-6"> */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col gap-6 lg:max-w-74 xl:max-w-90 2xl:max-w-102 w-full">
          {forms && (
            <section>
              <Forms
                pokes={forms}
                initialPoke={pokeKey}
                dexNumber={dexNumber}
              />
            </section>
          )}

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
          <section>
            <Moves moves={moves} />
          </section>
        </div>
      </div>
    </div>
  );
}
