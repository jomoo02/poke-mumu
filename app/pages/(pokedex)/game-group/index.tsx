import { getRegionalPokedex } from './api';
import { GameDexWrapper } from './ui/game-dex-wrapper';
import { ViewModeToggle } from './ui/view-mode-toggle';
import DexRegionList from './ui/dex-region-list';
import Regionaldex from './ui/regional-dex';

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

  const title = `${gameGroupKo} 도감`;

  return (
    <div className="flex flex-col min-h-dvh py-16 w-full mx-auto px-4 sm:px-6 xl:px-0">
      <GameDexWrapper title={gameGroupKo}>
        <h1
          data-dex-h1
          className="text-4xl font-bold tracking-wide  max-w-7xl w-full mx-auto break-keep"
        >
          {title}
        </h1>

        <div className="text-muted-foreground pt-3 whitespace-pre-line break-keep text-pretty max-w-7xl w-full mx-auto">
          {description}
        </div>

        <div className="flex justify-end pt-6  max-w-7xl w-full mx-auto">
          <ViewModeToggle />
        </div>
        <div className="pt-6">
          <DexRegionList dexRegions={dexRegion} />
        </div>
      </GameDexWrapper>
    </div>
  );
}
