import { type AbilitiyView } from '../../model';
import Ability from './ability';

interface AbilitiesProps {
  abilities: AbilitiyView[];
}

export default function Abilities({ abilities }: AbilitiesProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {abilities.map((ability, index) => (
        <Ability key={ability.name} ability={ability} index={index + 1} />
      ))}
    </div>
  );
}
