import type { AbilityDetail } from '@/_entities/ability';

import AbilityCard from './ability-card';

interface AbilityCardsProps {
  abilities: AbilityDetail[];
}

export default function AbilityCards({ abilities }: AbilityCardsProps) {
  return (
    <ul>
      {abilities.map((ability) => (
        <AbilityCard key={ability.identifier} ability={ability} />
      ))}
    </ul>
  );
}
