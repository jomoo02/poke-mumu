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

  if (!regionalDex) {
    return null;
  }

  const { versionGroupKo, regionKo, entries } = regionalDex;

  return (
    <div className="max-w-7xl 2xl:max-w-360 mx-auto px-4 sm:px-6 py-12 w-full min-h-svh flex flex-col gap-6">
      <div>
        <h1 className="text-4xl font-bold tracking-wide">
          {versionGroupKo} 버전 도감
        </h1>
      </div>
      <div className="">
        <div className="">
          {regionKo} 도감
          {`No.${entries[0].regionalDexNumber} ~ ${entries.at(-1)?.regionalDexNumber}`}
        </div>
        <PokeList pokes={entries} />
      </div>
    </div>
  );
}
