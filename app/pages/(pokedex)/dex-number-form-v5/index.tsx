import { getPokeData } from './api';
import { getDexNumberForms } from './api/form';
import Abilities from './ui/abilities';
import BaseStats from './ui/base-stats';
import DexInfo from './ui/dex-info';
import EvolutionTree from './ui/evolution-tree';
import Forms from './ui/forms';
import Moves from './ui/moves';
import OtherNames from './ui/ohter-name';
import Breeding from './ui/resf-info/breeding';
import Training from './ui/resf-info/training';
import TypeDefenses from './ui/type-defense';

interface PokedexDexNumberFormPageUIProps {
  dexNumber: string;
  pokeKey: string;
}

export default async function PokedexDexNumberFormPageV5UI({
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
  } = data;

  return (
    <div className="flex flex-col w-full gap-6">
      <section>
        {forms && (
          <section className="py-4">
            <Forms pokes={forms} dexNumber={dexNumber} initialPoke={pokeKey} />
          </section>
        )}
        <section>
          <DexInfo dexInfo={dexInfo} />
        </section>
      </section>
      <div className="flex w-full gap-6">
        <div className="mx-auto w-full max-w-6xl p-6 px-4 sm:px-6 flex flex-col gap-12 flex-1">
          <div className="flex gap-12">
            <div className="flex flex-col w-full gap-12 ">
              <section className="">
                <Abilities abilities={abilities} />
              </section>
              <section className="">
                {stats && <BaseStats stats={stats} rankRatio={rankRatio} />}
              </section>

              {/* <div className="w-full h-px bg-border my-4" /> */}

              <div>
                기타 정보
                <div className="grid lg:grid-cols-3 gap-6">
                  <section className="">
                    <Breeding breeding={breeding} />
                  </section>

                  <section className="">
                    <Training training={training} />
                  </section>

                  <section className="">
                    <OtherNames names={dexInfo} />
                  </section>
                </div>
              </div>

              <div className="flex flex-col gap-6 flex-1">
                <div className="w-full h-px bg-border my-4" />
                <section className="px-4">
                  <TypeDefenses typeDefenses={typeDefense} types={types} />
                </section>
              </div>
            </div>
          </div>

          {evolutionId && (
            <section>
              <div className="w-full h-px bg-border my-4" />
              <EvolutionTree id={evolutionId} />
            </section>
          )}

          <section>
            <div className="w-full h-px bg-border my-4" />
            <Moves moves={moves} />
          </section>
        </div>
        <div className="w-72 h-full bg-accent">1</div>
      </div>
    </div>
  );
}
