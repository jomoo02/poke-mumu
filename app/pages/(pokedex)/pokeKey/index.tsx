import { getPokeDetail } from './api/detail';
import { getPokeForms } from './api/form';
import { getPokeNav } from './api/nav';
import { getTypeDefenses } from './api/type';
import PokeFormList from './ui/poke-form-list';
import Hero from './ui/hero';
import Nav from './ui/nav';
import { getAbilitiesByPokeKey } from './api/ability';
import AbilityList from './ui/ability-list';
import Stats from './ui/stats';
import Type from './ui/type';
import { getStats } from '@/app/entities/stat/api';
import { getDefaultVgForPoke, getPokeMovesByVg } from './api/move';
import BaseStats from './ui/stats/base-stats';
import BasicInfo from './ui/basic-info';
import { Suspense } from 'react';
import MoveSkeleton from './ui/move/skeleton';
import MovesSection from './ui/move';
import HeroV2 from './ui/hero-v2';
import BasicInfoV2 from './ui/basic-info-v2';
import StatsV2 from './ui/stats-v2';
import AbilityListV2 from './ui/ability-list-v2';
import TypeV2 from './ui/type-v2';
import EvolutionSection from './evolution';
import {
  Section,
  SectionBorder,
  SectionContent,
  SectionTitle,
} from './ui/section';

interface PokedexPokeKeyPageUIProps {
  pokeKey: string;
}

export default async function PokedexPokeKeyPageUI({
  pokeKey,
}: PokedexPokeKeyPageUIProps) {
  const [data, abilities, statRows, vg] = await Promise.all([
    getPokeDetail(pokeKey),
    getAbilitiesByPokeKey(pokeKey),
    getStats(),
    getDefaultVgForPoke(pokeKey),
  ]);

  if (!data) {
    return null;
  }

  const {
    dexNumber,
    speciesId,
    hero,
    species,
    nameKo,
    baseStats,
    typeIds,
    effortValues,
    evolutionId,
  } = data;

  const [nav, pokeForms, typeDefenseGroups, moves] = await Promise.all([
    getPokeNav(dexNumber),
    getPokeForms(speciesId),
    getTypeDefenses(typeIds),
    getPokeMovesByVg(pokeKey, vg),
    // getEvolutionTree(evolutionId),
  ]);

  const { prev, next } = nav;

  return (
    // <div className="w-full max-w-384 px-4 sm:px-6 xl:px-10 mx-auto min-h-dvh py-8">
    <div className="">
      <div className="w-full max-w-7xl mx-auto min-h-dvh py-8 px-4 sm:px-6 2xl:max-w-350">
        <div className="flex flex-col gap-6">
          <section className="mt-4 mb-6">
            <Nav prev={prev} next={next} />
          </section>

          {pokeForms && pokeForms.length > 1 && (
            <section>
              <PokeFormList pokes={pokeForms} pokeKey={pokeKey} />
            </section>
          )}
          <div className="flex flex-col gap-6 @container">
            {/* <section>
              <Hero hero={hero} species={species} />
            </section> */}
            <div className="grid lg:grid-cols-3 gap-6">
              {' '}
              <section className="lg:col-span-2">
                <HeroV2 hero={hero} species={species} />
              </section>
              <section>
                <BasicInfoV2 species={species} />
              </section>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <section>
                <AbilityListV2 abilities={abilities} name={nameKo} />
              </section>
              <section>
                {baseStats && (
                  <StatsV2
                    baseStats={baseStats}
                    statRows={statRows}
                    effortValues={effortValues}
                    name={nameKo}
                  />
                )}
              </section>
              <section>
                <TypeV2 typeDefenseGroups={typeDefenseGroups} />
              </section>
            </div>
            <section>
              <EvolutionSection
                evolutionId={evolutionId}
                currentPokeKey={pokeKey}
              />
              {/* {tree && (
                <Section>
                  <SectionBorder />
                  <SectionTitle>진화</SectionTitle>
                  <SectionContent>
                    <EvolutionTreeView tree={tree} currentPokeKey={pokeKey} />
                  </SectionContent>
                </Section>
              )} */}
            </section>

            <section>
              <Suspense fallback={<MoveSkeleton />}>
                <MovesSection pokeKey={pokeKey} />
              </Suspense>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
