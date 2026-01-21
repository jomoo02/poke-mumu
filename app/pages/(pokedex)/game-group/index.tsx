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
    <div>
      <h1 className="scroll-m-20 text-3xl font-semibold text-foreground max-w-7xl mx-auto w-full py-6 px-4 sm:px-6">
        {gameGroupKo} 도감
      </h1>
      <div className="text-muted-foreground my-6 whitespace-pre-line break-keep text-pretty max-w-7xl mx-auto w-full px-4 sm:px-6">
        {description}
      </div>
      {dexRegion.length > 1 ? (
        <DexRegionList dexRegions={dexRegion} />
      ) : (
        <>
          {dexRegion.map((dex, idx) => (
            <div key={dex.id}>
              {idx > 0 && (
                <div className="max-w-7xl w-full mx-auto px-6 bg-border h-px my-4" />
              )}
              <h2 className="max-w-7xl mx-auto w-full px-6 pt-2 text-2xl font-semibold ">
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
