import { Fragment } from 'react/jsx-runtime';
import { AbilitiyView } from '../../model';
import Ability from './ability';

interface AbilitiesProps {
  abilities: AbilitiyView[];
}
export default function Abilities({ abilities }: AbilitiesProps) {
  return (
    <div className="">
      <h2 className="text-3xl font-semibold mb-4 w-full">특성</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {abilities.map((ability, index) => (
          <Fragment key={ability.name}>
            {/* {index > 0 && <div className="w-full h-px bg-border my-4" />} */}
            <Ability key={ability.name} ability={ability} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
