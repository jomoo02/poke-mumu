import { getRegionalDex } from './api';
import Jump from './ui/jump';
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
    <div className="max-w-365 mx-auto py-12 w-full min-h-svh flex flex-col gap-6 px-5 md:px-8 lg:px-10 3xl:px-2.5">
      <div className="grid lg:grid-cols-2 gap-6 ">
        <div className=" lg:sticky top-32 z-10 lg:h-50">
          <h2 className="flex gap-3 flex-wrap font-bold text-2xl text-balance break-keep">
            <span className="">{regionKo} 도감</span>
            <span className="">
              {`No.${entries[0].dexNumber} ~ ${entries.at(-1)?.dexNumber}`}
            </span>
          </h2>
          <Jump />
        </div>

        <PokeList pokes={entries} />
      </div>
    </div>
  );
}
