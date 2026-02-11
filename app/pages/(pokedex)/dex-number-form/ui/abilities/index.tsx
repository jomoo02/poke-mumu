import { AbilitiyView } from '../../model';
import Ability from './ability';

interface AbilitiesProps {
  abilities: AbilitiyView[];
}
export default function Abilities({ abilities }: AbilitiesProps) {
  return (
    <div className="flex flex-col gap-6">
      {abilities.map((ability) => (
        <Ability key={ability.name} ability={ability} />
      ))}
    </div>
  );
}
