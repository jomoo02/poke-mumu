import { Fragment } from 'react/jsx-runtime';
import { AbilitiyView } from '../../model';
import Ability from './ability';
import SectionTitle from '../section-title';

interface AbilitiesProps {
  abilities: AbilitiyView[];
}
export default function Abilities({ abilities }: AbilitiesProps) {
  const normal = abilities.filter((a) => !a.isHidden);
  const hidden = abilities.filter((a) => a.isHidden);
  return (
    <div className="">
      <h3 id="abilities" className="text-3xl font-semibold mb-6">
        특성
      </h3>
      <div className="grid gap-4 md:grid-cols-2 overflow-hidden">
        {abilities.map((ability, index) => (
          <Ability key={ability.name} ability={ability} />
        ))}
      </div>
    </div>
    // <div className="grid  gap-4">
    //   {abilities.map((ability, index) => (
    //     <Fragment key={ability.name}>

    //       <Ability key={ability.name} ability={ability} />
    //     </Fragment>
    //   ))}
    // </div>
  );
}
