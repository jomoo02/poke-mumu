import { getObjectParticle } from '@/shared/lib/utils';

import PokeList from './poke-list';
import { getAbilityPokes } from '../api';

interface AbilityPokeSectionProps {
  abilityId: number;
}

export default async function AbilityPokeSection({
  abilityId,
}: AbilityPokeSectionProps) {
  const pokes = await getAbilityPokes(abilityId);

  const normalPokes = pokes.filter((poke) => !poke.isHidden);
  const hiddenPokes = pokes.filter((poke) => poke.isHidden);
  return (
    <>
      <PokeList title="일반 특성" pokes={normalPokes} />
      <PokeList title="숨겨진 특성" pokes={hiddenPokes} />
    </>
  );
}
