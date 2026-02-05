import { Fragment } from 'react/jsx-runtime';
import { AbilitiyView } from '../../model';
import Ability from './ability';

interface AbilitiesProps {
  abilities: AbilitiyView[];
}
export default function Abilities({ abilities }: AbilitiesProps) {
  return (
    <div className="">
      <h3 className="text-3xl font-semibold mb-6 w-full">특성</h3>
      <div className="grid sm:grid-cols-3 gap-6">
        {abilities.map((ability, index) => (
          <Fragment key={ability.name}>
            <Ability key={ability.name} ability={ability} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
