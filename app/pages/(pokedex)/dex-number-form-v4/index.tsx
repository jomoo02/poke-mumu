import { getPokeData } from './api';
import { getDexNumberForms } from './api/form';
import Abilities from './ui/abilities';
import BaseStats from './ui/base-stats';
import DexInfo from './ui/dex-info';
import EvolutionTree from './ui/evolution-tree';
import Forms from './ui/forms';
import MainImg from './ui/main-img';
import MinMaxStats from './ui/min-max-stats';
import Moves from './ui/moves';
import Breeding from './ui/resf-info/breeding';
import Training from './ui/resf-info/training';
import TypeDefenses from './ui/type-defense';

interface PokedexDexNumberFormPageUIProps {
  dexNumber: string;
  pokeKey: string;
}

export default async function PokedexDexNumberFormPageV4UI({
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
    poke,
  } = data;

  return (
    <div className="flex flex-col w-full gap-6">
      {/* <div className="grid lg:grid-cols-3 gap-6"> */}
      <section className="mx-auto w-full max-w-360 p-6 px-4 sm:px-6 lg:px-24 flex flex-col">
        {forms && (
          <section className="py-4">
            <Forms pokes={forms} dexNumber={dexNumber} initialPoke={pokeKey} />
          </section>
        )}

        <section className="grid lg:grid-cols-2 gap-6">
          <MainImg poke={poke} />
          <div className="flex flex-col gap-6">
            <DexInfo dexInfo={dexInfo} />
          </div>
        </section>
      </section>

      <div className="mx-auto w-full max-w-360 p-6 px-4 sm:px-6 xl:px-24 flex flex-col gap-12">
        <section className="grid md:grid-cols-2 gap-6">
          <Breeding breeding={breeding} />
          <Training training={training} />
        </section>

        <section>
          <Abilities abilities={abilities} />
        </section>
        <section>{stats && <BaseStats stats={stats} />}</section>
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
      <div className="flex w-full py-6">
        <div
          className="grid md:grid-cols-2 gap-6  mx-auto w-full max-w-7xl"
          style={{ padding: '0 clamp(30px, 5vw, 60px)' }}
        ></div>
      </div>
      <div className="flex flex-col w-full gap-12 py-6">
        {/* <div className="w-68 hidden lg:flex">
          <div className=" p-4 sticky  top-24 rounded-xl w-full h-dvh">
            <div className="flex flex-col gap-1 p-4 rounded-xl bg-muted">
              <div>기타정보</div>
              <div>특성</div>
              <div>스탯</div>
              <div>방어상성</div>
              <div>진화</div>
              <div>기술</div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
