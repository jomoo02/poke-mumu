import type { ListAbility } from '../../model/ability';
import AbilityCard from './ability-card';

interface AbilityListProps {
  abilities: ListAbility[];
}

// lg 미만: 카드 목록, sm부터 2열 (정렬은 결과 줄의 정렬 버튼)
export default function AbilityList({ abilities }: AbilityListProps) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
      {abilities.map((ability) => (
        <li key={ability.identifier}>
          <AbilityCard ability={ability} />
        </li>
      ))}
    </ul>
  );
}
