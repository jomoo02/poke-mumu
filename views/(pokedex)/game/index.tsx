import {
  PageLayoutContainer,
  PageLayoutSection,
  PageLayoutSectionTitle,
} from '@/shared/ui/page-layout';

import { getGenGroupedGamePokedexes } from './api';
import PokedexLink from './ui/pokedex-link';

export default async function PokedexGameView() {
  const data = await getGenGroupedGamePokedexes();

  if (!data) {
    return null;
  }

  return (
    <PageLayoutContainer className="@container">
      {data.map((genGroup) => (
        <PageLayoutSection key={genGroup.title} className="first:mt-0">
          <PageLayoutSectionTitle>{genGroup.title}</PageLayoutSectionTitle>
          <div className="gap-6 grid @lg:grid-cols-2 @5xl:grid-cols-3 @7xl:grid-cols-4">
            {genGroup.versionGroups.map((versionGroup) => (
              <PokedexLink
                key={versionGroup.identifier}
                versionGroup={versionGroup}
              />
            ))}
          </div>
        </PageLayoutSection>
      ))}
    </PageLayoutContainer>
  );
}
