import { DotIcon } from 'lucide-react';

import { PageContainer } from '@/shared/ui/container';
import { getAbility } from '@/entities/ability/api';
import {
  PageLayoutContainer,
  PageLayoutHeader,
  PageLayoutHeaderDescription,
  PageLayoutSection,
  PageLayoutHeaderTitle,
} from '@/shared/ui/page-layout';

import { getAbilityPokes } from './api';
import PokeList from './ui/poke-list';

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

  const pokes = await getAbilityPokes(ability.id);

  return (
    <PageLayoutContainer>
      <PageLayoutHeader>
        <PageLayoutHeaderTitle>{ability.nameKo}</PageLayoutHeaderTitle>
        <div className="pt-3 flex items-center text-lg">
          <span>{ability.nameEn}</span>
          <DotIcon className="size-4.5" />
          <span>{ability.nameJa}</span>
        </div>
        <p className="pt-6 md:max-w-[80%] text-pretty break-keep">
          {ability.flavorText}
        </p>
      </PageLayoutHeader>
      {ability.gen && (
        <div>
          <h2 className="text-2xl font-bold tracking-wide mt-10">첫 등장</h2>
          <div className="pt-6">{ability.gen}세대</div>
        </div>
      )}
      <PokeList pokes={pokes} abilityName={ability.nameKo} />
    </PageLayoutContainer>
  );
}
