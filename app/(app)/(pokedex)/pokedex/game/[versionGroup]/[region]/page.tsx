import { Suspense } from 'react';
import type { Metadata } from 'next';

import PokedexGameVersionGroupRegionPageView from '@/views/pokedex-game-version-group-region';
import {
  getRegionalDex,
  getAllRegionParams,
} from '@/views/pokedex-game-version-group-region/api';
import Loading from './loading';

export async function generateStaticParams() {
  return getAllRegionParams();
}

export async function generateMetadata({
  params,
}: PageProps<'/pokedex/game/[versionGroup]/[region]'>): Promise<Metadata> {
  const { versionGroup, region } = await params;
  const dex = await getRegionalDex(versionGroup, region);

  if (!dex || dex.entries.length === 0) {
    return {};
  }

  const { versionGroupKo, regionKo, entries } = dex;
  const first = entries[0];
  const last = entries[entries.length - 1];

  const title = `${regionKo} 도감 · ${versionGroupKo}`;
  const description = `${versionGroupKo} · ${regionKo} 도감 · No.${first.dexNumber} ${first.nameKo} ~ No.${last.dexNumber} ${last.nameKo}, 총 ${entries.length}종`;
  const url = `/pokedex/game/${versionGroup}/${region}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Poke MuMu',
      locale: 'ko_KR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function PokedexGameVersionGroupRegionPage({
  params,
}: PageProps<'/pokedex/game/[versionGroup]/[region]'>) {
  const { versionGroup, region } = await params;

  return (
    <PokedexGameVersionGroupRegionPageView
      versionGroup={versionGroup}
      region={region}
    />
  );
}
