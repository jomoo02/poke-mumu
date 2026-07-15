import { getRegionalDex } from './api';
import PokeList from './ui/poke-list';
import PokedexGameVersionGroupRegionClient from './ui/pokedex-game-version-group-region-client';

interface PokedexGameVersionGroupRegionPageViewIProps {
  versionGroup: string;
  region: string;
}

export default async function PokedexGameVersionGroupRegionPageView({
  versionGroup,
  region,
}: PokedexGameVersionGroupRegionPageViewIProps) {
  const regionalDex = await getRegionalDex(versionGroup, region);

  if (!regionalDex) {
    return null;
  }

  const { versionGroupKo, regionKo, entries } = regionalDex;
  const h2Text = `${regionKo} 도감 `;

  const description = `No.${entries[0].dexNumber}  ${entries[0].nameKo} ~ No.${entries.at(-1)?.dexNumber} ${entries.at(-1)?.nameKo}`;
  return (
    <>
      <div>
        <h2 className="tracking-tight font-bold text-2xl text-balance break-keep tabular-nums mt-8">
          {h2Text}
        </h2>
        <p className="text-foreground/70 pt-3">{description}</p>
      </div>

      <PokeList pokes={entries} />
      {/* <PokedexGameVersionGroupRegionClient pokes={entries} /> */}
    </>
  );
}
