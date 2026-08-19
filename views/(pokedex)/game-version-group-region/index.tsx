import { notFound } from 'next/navigation';

import {
  PageLayoutSection,
  PageLayoutSectionDescription,
  PageLayoutSectionTitle,
} from '@/shared/ui/page-layout';

import { getRegionalDex } from './api';
import PokeList from './ui/poke-list';
import ModeTab from './ui/mode-tab';

export default async function PokedexGameVersionGroupRegionView({
  params,
}: {
  params: Promise<{ versionGroup: string; region?: string[] }>;
}) {
  const { versionGroup, region } = await params;

  const regionalDex = await getRegionalDex(versionGroup, region?.[0]);

  if (!regionalDex || regionalDex.entries.length === 0) {
    notFound();
  }

  const { regionKo, entries } = regionalDex;
  const first = entries[0];
  const last = entries[entries.length - 1];

  const sectionTitle = `${regionKo} 도감`;
  const description = `No.${first.dexNumber} ${first.nameKo} ~ No.${last.dexNumber} ${last.nameKo}`;

  return (
    <PageLayoutSection className="mt-0">
      <div className="flex flex-col gap-1.5">
        <PageLayoutSectionTitle>{sectionTitle}</PageLayoutSectionTitle>
        <PageLayoutSectionDescription>
          {description}
        </PageLayoutSectionDescription>
      </div>
      <ModeTab />
      <PokeList pokes={entries} />
    </PageLayoutSection>
  );
}
