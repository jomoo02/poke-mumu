import {
  PageLayoutContainer,
  PageLayoutHeader,
  PageLayoutHeaderDescription,
  PageLayoutHeaderTitle,
} from '@/shared/ui/page-layout';
import { getAbility } from '@/entities/ability/api';

import { getAbilityPokes } from './api';
import PokeWithAbility from './ui/poke-with-ability';
import AbilityInfo from './ui/ability-info';

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
        <PageLayoutHeaderDescription className="text-foreground">
          {ability.flavorText}
        </PageLayoutHeaderDescription>
      </PageLayoutHeader>
      <AbilityInfo ability={ability} />
      <PokeWithAbility pokes={pokes} ability={ability.nameKo} />
    </PageLayoutContainer>
  );
}
