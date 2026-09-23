import { Suspense } from 'react';

import {
  PageLayoutContainer,
  PageLayoutHeader,
  PageLayoutHeaderDescription,
  PageLayoutHeaderTitle,
  PageLayoutSection,
  PageLayoutSectionDescription,
  PageLayoutSectionTitle,
} from '@/shared/ui/page-layout';
import { getAbility } from '@/entities/ability/api';
import { getObjectParticle } from '@/shared/lib/utils';

import AbilityPokeSection from './ui/ability-poke-section';
import PokeListSkeleton from './ui/skeleton/poke-list';

interface AbilityIdentifierViewProps {
  identifier: string;
}

export default async function AbilityIdentifierView({
  identifier,
}: AbilityIdentifierViewProps) {
  const ability = await getAbility(identifier);

  if (!ability) {
    return null;
  }

  const appearedLabel = `첫 등장: ${ability.isChampions ? `챔피언스` : `${ability.gen}세대`}`;
  const abilityPokeSectionDescription = `특성 ${ability.nameKo}${getObjectParticle(ability.nameKo)} 보유한 포켓몬 목록`;

  return (
    <PageLayoutContainer>
      <PageLayoutHeader>
        <PageLayoutHeaderTitle>{ability.nameKo}</PageLayoutHeaderTitle>
        <PageLayoutHeaderDescription className="text-foreground text-lg">
          {`${ability.nameEn} / ${ability.nameJa}`}
        </PageLayoutHeaderDescription>
        <PageLayoutHeaderDescription className="pt-3 text-foreground">
          {ability.flavorText}
        </PageLayoutHeaderDescription>
      </PageLayoutHeader>
      <PageLayoutSection>
        <div className="text-sm font-medium bg-muted w-fit py-1.5 px-2.75 rounded-lg">
          {appearedLabel}
        </div>
      </PageLayoutSection>
      <PageLayoutSection>
        <div className="flex flex-col gap-2">
          <PageLayoutSectionTitle>특성 보유 포켓몬</PageLayoutSectionTitle>
          <PageLayoutSectionDescription>
            {abilityPokeSectionDescription}
          </PageLayoutSectionDescription>
        </div>
        <Suspense fallback={<PokeListSkeleton />}>
          <AbilityPokeSection abilityId={ability.id} />
        </Suspense>
      </PageLayoutSection>
    </PageLayoutContainer>
  );
}
