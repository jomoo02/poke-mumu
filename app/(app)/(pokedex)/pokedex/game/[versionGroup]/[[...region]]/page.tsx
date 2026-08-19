import PokedexGameVersionGroupRegionView from '@/views/(pokedex)/game-version-group-region';
import {
  getAllRegionParams,
  getRegionalDex,
} from '@/views/(pokedex)/game-version-group-region/api';
import Skeleton from '@/views/(pokedex)/game-version-group-region/ui/skeleton';
import { notFound } from 'next/navigation'; // 추가
import type { Metadata } from 'next';
import { Suspense } from 'react';

export async function generateStaticParams() {
  return getAllRegionParams();
}

export async function generateMetadata(
  props: PageProps<'/pokedex/game/[versionGroup]/[[...region]]'>,
): Promise<Metadata> {
  const { versionGroup, region } = await props.params;
  const regionSlug = region?.[0];
  const dex = await getRegionalDex(versionGroup, regionSlug);

  if (!dex || dex.entries.length === 0) {
    return {};
  }

  const { versionGroupKo, regionKo, entries } = dex;
  const first = entries[0];
  const last = entries[entries.length - 1];

  const title = `${versionGroupKo} 버전 ${regionKo} 도감`;
  const description = `${versionGroupKo} 버전 ${regionKo} 도감 · No.${first.dexNumber} ${first.nameKo} ~ No.${last.dexNumber} ${last.nameKo}, 총 ${entries.length}종`;
  const url = regionSlug
    ? `/pokedex/game/${versionGroup}/${regionSlug}`
    : `/pokedex/game/${versionGroup}`;

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

export default async function PokedexGameVersionGroupRegionPage(
  props: PageProps<'/pokedex/game/[versionGroup]/[[...region]]'>,
) {
  return (
    <Suspense fallback={<Skeleton />}>
      <PokedexGameVersionGroupRegionView
        params={props.params}
        // versionGroup={versionGroup}
        // region={region?.[0]}
      />
    </Suspense>
  );
}
