import { Suspense } from 'react';

import PokedexGameVersionGroupRegionPageView from '@/views/pokedex-game-version-group-region';

export default async function PokedexGameVersionGroupRegionPage({
  params,
}: PageProps<'/pokedex/game/[versionGroup]/[region]'>) {
  return (
    <Suspense>
      {params.then(({ versionGroup, region }) => (
        <PokedexGameVersionGroupRegionPageView
          versionGroup={versionGroup}
          region={region}
        />
      ))}
    </Suspense>
  );
}
