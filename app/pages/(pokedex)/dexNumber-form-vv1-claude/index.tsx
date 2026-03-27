import { getPokeData } from '../dex-number-form-vv1/api';
import { getDexNumberForms } from '../dex-number-form-vv1/api/form';
import Abilities from './ui/abilities';
import BaseStats from './ui/base-stats';
import DexInfoV2 from './ui/dex-info-v2';
import EvolutionTree from '../dex-number-form-vv1/ui/evolution-tree';
import Moves from '../dex-number-form-vv1/ui/moves';
import TypeDefenses from './ui/type-defense';
import RestInfo from './ui/resf-info';
import Toc from './ui/toc';
import SectionTitle from './ui/section-title';
import { Suspense } from 'react';
import { cn } from '@/app/shared/lib/cn';

interface PokedexDexNumberFormPageUIProps {
  dexNumber: string;
  pokeKey: string;
}

export default async function PokedexDexNumberFormPageUIVV1Claude({
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
    names,
  } = data;

  return (
    <Suspense>
      <div className={cn('mx-auto w-full py-8 relative max-w-384')}>
        <div className="hidden xl:block absolute right-0 top-0 z-20 h-full">
          <div className="sticky top-18 z-20 w-44 h-[calc(100vh-56px)]">
            <div className="pl-2 pr-4 py-4">
              <Toc />
            </div>
          </div>
        </div>

        <div className="lg:px-2 flex-1 w-full max-w-4xl mx-auto">
          <section>
            <DexInfoV2 dexInfo={dexInfo} />
          </section>

          <section>
            <SectionTitle id="rest-info">기타</SectionTitle>
            <RestInfo names={names} training={training} breeding={breeding} />
          </section>

          <section>
            <SectionTitle id="base-stats">스탯</SectionTitle>
            <BaseStats stats={stats} rankRatio={rankRatio} />
          </section>

          <section>
            <SectionTitle id="ability">특성</SectionTitle>
            <Abilities abilities={abilities} />
          </section>

          <section>
            <SectionTitle id="type-defense">방어 상성</SectionTitle>
            <TypeDefenses typeDefenses={typeDefense} />
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
      </div>
    </Suspense>
  );
}
