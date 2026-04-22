import { getRegionalPokedex } from './api';
import DexRegionList from './ui/dex-region-list';
import Regionaldex from './ui/regionaldex';

interface PokedexGameGroupPageProps {
  group: string;
}

export default async function PokedexGameGroupPageUI({
  group,
}: PokedexGameGroupPageProps) {
  const {
    dexRegion,
    description,
    gameGroup: gameGroupKo,
  } = await getRegionalPokedex(group);

  return (
    <div className=" max-w-384 mx-auto w-full py-8 px-4 sm:px-6 xl:px-10">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-wide mt-4 mb-6 text-foreground">
        {gameGroupKo} 도감
      </h1>
      <div className="text-muted-foreground mb-6 whitespace-pre-line break-keep text-pretty">
        {description}
      </div>
      {dexRegion.length > 1 ? (
        <DexRegionList dexRegions={dexRegion} />
      ) : (
        <>
          {dexRegion.map((dex, idx) => (
            <div key={dex.id}>
              {idx > 0 && <div className="bg-border h-px my-6" />}
              <h2 className="w-full mt-3 text-2xl font-semibold ">
                {dex.regionKo}
              </h2>
              <Regionaldex pokes={dex.entries} />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
