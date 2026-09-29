import { notFound } from 'next/navigation';

import {
  PageLayoutContainer,
  PageLayoutHeader,
  PageLayoutHeaderDescription,
  PageLayoutHeaderTitle,
  PageLayoutSection,
  PageLayoutSectionTitle,
} from '@/_shared/ui/page-layout';
import { getAbilityDetail } from '@/_entities/ability/index.server';
import { getAbilityAppeared, getAbilitySubName } from '@/_entities/ability';
import {
  getPokeAbilityKindLabel,
  groupByPokeAbilityKind,
} from '@/_entities/poke';

import { getAbilityPokes } from './api';
import { getVisibleKinds } from './model/ability-poke';
import PokeList from './ui/poke-list';

export default async function AbilityDetailPage({
  identifier,
}: {
  identifier: string;
}) {
  // 둘 다 identifier만 필요하므로 병렬 조회
  const [ability, pokes] = await Promise.all([
    getAbilityDetail(identifier),
    getAbilityPokes(identifier),
  ]);

  if (!ability) {
    notFound();
  }

  const abilitySubName = getAbilitySubName(ability);
  const appeared = getAbilityAppeared(ability);

  const groups = groupByPokeAbilityKind(pokes);
  const kinds = getVisibleKinds(groups);

  return (
    <PageLayoutContainer>
      <PageLayoutHeader>
        <PageLayoutHeaderTitle>{ability.nameKo}</PageLayoutHeaderTitle>
        <PageLayoutHeaderDescription className="text-foreground text-lg">
          {abilitySubName}
        </PageLayoutHeaderDescription>
        <PageLayoutHeaderDescription className="pt-3 text-foreground">
          {ability.flavorText}
        </PageLayoutHeaderDescription>
      </PageLayoutHeader>
      <PageLayoutSection className="gap-y-4">
        <PageLayoutSectionTitle id="appeared">첫 등장</PageLayoutSectionTitle>
        <div>{appeared}</div>
      </PageLayoutSection>
      <PageLayoutSection>
        <div className="flex flex-col gap-4">
          <PageLayoutSectionTitle id="poke">
            특성 보유 포켓몬
          </PageLayoutSectionTitle>
        </div>
        {kinds.map((kind) => (
          <PokeList
            key={kind}
            id={kind}
            title={getPokeAbilityKindLabel(kind)}
            pokes={groups[kind]}
            name={ability.nameKo}
          />
        ))}
      </PageLayoutSection>
    </PageLayoutContainer>
  );
}

export { default as AbilityDetailPageSkeleton } from './ui/skeleton';
