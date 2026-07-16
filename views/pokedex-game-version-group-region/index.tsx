import { notFound } from 'next/navigation';

import { getRegionalDex } from './api';
import PokeList from './ui/poke-list';

interface PokedexGameVersionGroupRegionPageViewIProps {
  versionGroup: string;
  region: string;
}

export default async function PokedexGameVersionGroupRegionPageView({
  versionGroup,
  region,
}: PokedexGameVersionGroupRegionPageViewIProps) {
  const regionalDex = await getRegionalDex(versionGroup, region);

  if (!regionalDex || regionalDex.entries.length === 0) {
    notFound();
  }

  const { regionKo, entries } = regionalDex;
  const first = entries[0];
  const last = entries[entries.length - 1];

  const h2Text = `${regionKo} 도감`;
  const description = `No.${first.dexNumber} ${first.nameKo} ~ No.${last.dexNumber} ${last.nameKo}`;

  return (
    <>
      <div>
        <h2 className="tracking-tight font-bold text-2xl text-balance break-keep tabular-nums mt-8">
          {h2Text}
        </h2>
        <p className="text-foreground/70 pt-3">{description}</p>
      </div>

      <PokeList pokes={entries} />
    </>
  );
}
