import { Fragment } from 'react/jsx-runtime';
import { AbilitiyView } from '../../model';
import Ability from './ability';

interface AbilitiesProps {
  abilities: AbilitiyView[];
}
export default function Abilities({ abilities }: AbilitiesProps) {
  return (
    <div className="border border-border py-6 rounded-2xl shadow-sm shadow-border bg-card">
      <h3 className="text-2xl font-semibold mb-4 w-full px-6">특성</h3>
      <div className="flex flex-col gap-4 px-6">
        {abilities.map((ability, index) => (
          <Fragment key={ability.name}>
            {index > 0 && <div className="h-px bg-border my-2" />}
            <Ability key={ability.name} ability={ability} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
