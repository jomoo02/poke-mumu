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
    <div className="flex flex-col gap-6 w-full mx-auto max-w-7xl px-6 md:px-8">
      <section className="w-full">
        <DexInfo dexInfo={dexInfo} />
      </section>
      <div className="w-full h-px border my-4" />
      <div className="flex gap-6 w-full relative">
        <div className="flex flex-col gap-6 flex-1">
          <section>
            <SectionTitle id="abilities" isFirst>
              특성
            </SectionTitle>
            <Abilities abilities={abilities} />
          </section>
          <section className="">
            <SectionTitle id="base-stats">스탯</SectionTitle>
            <BaseStats stats={stats} rankRatio={rankRatio} />
          </section>
          <section>
            <SectionTitle id="type-defense">방어 상성</SectionTitle>
            <TypeDefenses typeDefenses={typeDefense} types={types} />
          </section>
          <section>
            <SectionTitle id="evolution">진화</SectionTitle>
            <EvolutionTree id={evolutionId} />
          </section>
          <section>
            <SectionTitle id="move">기술</SectionTitle>
            <Moves moves={moves} />
          </section>
        </div>
        <div className="hidden xl:block w-64 max-h-92 sticky top-20">
          <div className="flex flex-col gap-4">
            {forms && (
              <section>
                <FormPoke poke={poke} />
              </section>
            )}
            <section className="px-4">
              <Toc />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
