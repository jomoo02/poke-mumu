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

export default async function PokedexDexNumberFormPageV3UI({
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
    <div className="flex w-full gap-6">
      {/* <div className="grid lg:grid-cols-3 gap-6"> */}

      <div className="mx-auto w-full max-w-7xl 2xl:max-w-360 p-6 px-4 sm:px-6 flex flex-col gap-20">
        <section>
          {forms && (
            <section className="py-4">
              <Forms
                pokes={forms}
                dexNumber={dexNumber}
                initialPoke={pokeKey}
              />
            </section>
          )}
          <DexInfo dexInfo={dexInfo} />
        </section>
        <div className="grid lg:grid-cols-2 gap-12">
          <section>
            <Breeding breeding={breeding} />
          </section>
          <section>
            <Training training={training} />
          </section>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <section>{stats && <BaseStats stats={stats} />}</section>
          <section>
            <Abilities abilities={abilities} />
          </section>
        </div>

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
  );
}
