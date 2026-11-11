import type { ListAbility } from '../../model/ability';
import { LIST_GRID_CLASS } from './list-layout';
import Row from './row';

interface AbilityListProps {
  abilities: ListAbility[];
}

// lg 미만: 한 줄 카드 목록 (정렬은 결과 줄의 정렬 버튼)
export default function AbilityList({ abilities }: AbilityListProps) {
  return (
    <ul className={LIST_GRID_CLASS}>
      {abilities.map((ability) => (
        <li key={ability.identifier}>
          <Row ability={ability} />
        </li>
      ))}
    </ul>
  );
}
