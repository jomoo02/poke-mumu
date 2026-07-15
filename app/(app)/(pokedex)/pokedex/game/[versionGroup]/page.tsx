import { redirect } from 'next/navigation';

import { getPrimaryRegion } from '@/widgets/pokedex-version-group-layout/api';

export default async function Page({
  params,
}: PageProps<'/pokedex/game/[versionGroup]'>) {
  const { versionGroup } = await params;

  const region = await getPrimaryRegion(versionGroup);

  if (region) {
    redirect(`/pokedex/game/${versionGroup}/${region}`);
  }

  return null;
}
