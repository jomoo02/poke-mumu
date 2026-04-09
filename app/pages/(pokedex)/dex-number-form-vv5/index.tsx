import { getPokeData } from './api';
import { getDexNumberForms } from './api/form';
import { getRanks } from './api/get-ranks';

import Abilities from './ui/abilities';
import BaseStats from './ui/base-stats';
import DexInfo from './ui/dex-info';
import EvolutionTree from './ui/evolution-tree';
import Forms from './ui/forms';
import MinMaxStats from './ui/min-max-stats';
import Moves from './ui/moves';

import TypeDefenses from './ui/type-defense';
import FormPoke from './ui/form-poke';
import Toc from './ui/toc';
import SectionTitle from './ui/section-title';

import RestInfo from './ui/resf-info';
import DexInfoV2 from './ui/dex-info-v2';
import { Suspense } from 'react';
import { cn } from '@/app/shared/lib/cn';
import Title from './ui/title';
import Ranks from './ui/rank';
import LevelStats from './ui/level-stats';
import { TypeBadge } from '@/app/entities/type/ui';

interface PokedexDexNumberFormPageUIProps {
  dexNumber: string;
  pokeKey: string;
}

export default async function PokedexDexNumberFormPageUIVV5({
  pokeKey,
  dexNumber,
}: PokedexDexNumberFormPageUIProps) {
  const [data, forms, ranks] = await Promise.all([
    getPokeData(pokeKey),
    getDexNumberForms(dexNumber),
    getRanks(pokeKey),
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
      <div
        className={cn(
          ' w-full py-10 relative px-4 sm:px-6 xl:px-10  mx-auto max-w-7xl flex flex-col gap-6',
        )}
      >
        <div className="">
          <div className="text-center text-lg text-muted-foreground font-semibold">
            No.00{dexInfo.dexNumber}
          </div>
          <h1 className="text-4xl font-bold text-center">{dexInfo.name}</h1>
          {/* <div className="font-semibold text-muted-foreground">
            {dexInfo.form}
          </div> */}
        </div>

        <div className="w-full grid lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            <DexInfoV2 dexInfo={dexInfo} />
            <section className="border p-6 rounded-2xl bg-card">
              <SectionTitle id="abilities">타입</SectionTitle>
              <div className="pt-4">
                <div className="flex gap-1">
                  {types.map((type) => (
                    <TypeBadge
                      key={type.identifier}
                      type={type}
                      className="w-20"
                    />
                  ))}
                </div>
              </div>
            </section>
            <section>
              <TypeDefenses typeDefenses={typeDefense} types={types} />
            </section>
          </div>
          <div className="flex flex-col gap-6">
            <section className="border py-6 px-4 sm:px-6 rounded-3xl bg-card">
              <SectionTitle id="abilities">특성</SectionTitle>
              <Abilities abilities={abilities} />
            </section>
            <section className="border p-6 rounded-2xl bg-card">
              <SectionTitle id="stats">종족값</SectionTitle>
              <div>
                <BaseStats
                  stats={stats}
                  rankRatio={rankRatio}
                  name={dexInfo.name}
                />
              </div>
            </section>
            <section className="border p-6 rounded-2xl bg-card">
              <SectionTitle id="rest-info">기타 정보</SectionTitle>
              <RestInfo names={names} training={training} breeding={breeding} />
            </section>
          </div>
        </div>

        <section>{stats && <LevelStats stats={stats} />}</section>
        <section className="border p-6 rounded-3xl bg-card">
          <SectionTitle id="evolution">진화</SectionTitle>
          <EvolutionTree id={evolutionId} />
        </section>
        <div className=" max-w-384 mx-auto w-full ">
          <div className="grid grid-cols-2"></div>

          {/* 
          <section>
            <SectionTitle id="stats">스탯</SectionTitle>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BaseStats
                stats={stats}
                rankRatio={rankRatio}
                name={dexInfo.name}
              />
              {ranks && <Ranks ranks={ranks} types={types} />}
            </div>
          </section> */}

          <section className="border p-4 sm:p-6 rounded-2xl bg-card">
            <SectionTitle id="move">기술</SectionTitle>
            <Moves moves={moves} />
          </section>
        </div>
      </div>
    </Suspense>
  );
}
