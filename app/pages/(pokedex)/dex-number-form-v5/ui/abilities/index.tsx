import { Fragment } from 'react/jsx-runtime';
import { AbilitiyView } from '../../model';
import Ability from './ability';

interface AbilitiesProps {
  abilities: AbilitiyView[];
}
export default function Abilities({ abilities }: AbilitiesProps) {
  return (
    <div className="">
      <h3 className="text-3xl font-semibold pb-4 w-full">특성</h3>
      <div className="grid gap-4">
        {abilities.map((ability, index) => (
          <Fragment key={ability.name}>
            {/* {index > 0 && <div className="h-px bg-border my-2" />} */}
            <Ability key={ability.name} ability={ability} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
