import type { AbilityDetail } from '@/_entities/ability';

import AbilityItem from './ability-item';

interface AbilityListProps {
  abilities: AbilityDetail[];
}

export default function AbilityList({ abilities }: AbilityListProps) {
  return (
    <ul>
      {abilities.map((ability) => (
        <AbilityItem key={ability.identifier} ability={ability} />
      ))}
    </ul>
  );
}
