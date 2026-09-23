import { PageLayoutContainer } from '@/shared/ui/page-layout';
import CardLink from './ui/card-link';

import GameLink from './ui/game-link';
import NationalLink from './ui/national-link';

export default function PokedexView() {
  return (
    <>
      {/* <CapturePage /> */}
      {/* <National /> */}
      <PageLayoutContainer>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <CardLink href={'/pokedex/national-base-stats'}>
            전국도감(스탯 포함)
          </CardLink>

          <NationalLink />
          <GameLink />
        </div>
      </PageLayoutContainer>
    </>
  );
}
