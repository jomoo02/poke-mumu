import { type AbilitiyView } from '../../model';
import Ability from './ability';

interface AbilitiesProps {
  abilities: AbilitiyView[];
}

export default function Abilities({ abilities }: AbilitiesProps) {
  return (
    <div className="grid pt-2 divide-y">
      {abilities.map((ability, index) => (
        <Ability key={ability.name} ability={ability} index={index + 1} />
      ))}
    </div>
  );
}
