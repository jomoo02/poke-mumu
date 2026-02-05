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
    <div className="flex flex-col w-full">
      {/* <div className="grid lg:grid-cols-3 gap-6"> */}
      <div className="border-b from-muted/70 to-muted/20 from-20% bg-linear-to-r via-muted/50 ">
        <div className="mx-auto max-w-7xl 2xl:max-w-360 grid lg:grid-cols-3  p-6 px-4 sm:px-6 w-full gap-6 ">
          <section className="lg:col-span-2">
            <DexInfo dexInfo={dexInfo} />
          </section>
          <section className="">
            <Breeding breeding={breeding} />
            <div className="w-full h-px bg-border my-3" />
            <Training training={training} />
          </section>
        </div>
      </div>
      <div className=" mx-auto max-w-7xl 2xl:max-w-400 p-6 px-4 sm:px-6 w-full">
        <section className="gap-8 2xl:gap-32 grid lg:grid-cols-2">
          <div className="overflow-hidden">
            {' '}
            {stats && <BaseStats stats={stats} />}
          </div>

          <section>
            <TypeDefenses typeDefenses={typeDefense} types={types} />
          </section>
        </section>
        <section>
          <Abilities abilities={abilities} />
        </section>
      </div>

      {/* <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col gap-6 lg:max-w-74 xl:max-w-90 2xl:max-w-98 w-full">
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
          <section className="grid lg:grid-cols-2 gap-8">
            {stats && <MinMaxStats stats={stats} />}
          </section>

          <section>
            <EvolutionTree id={evolutionId} />
          </section>
          <section>
            <Moves moves={moves} />
          </section>
        </div>
      </div> */}
    </div>
  );
}
