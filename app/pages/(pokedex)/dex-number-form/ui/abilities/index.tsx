import { Fragment } from 'react/jsx-runtime';
import { AbilitiyView } from '../../model';
import Ability from './ability';

interface AbilitiesProps {
  abilities: AbilitiyView[];
}
export default function Abilities({ abilities }: AbilitiesProps) {
  const normal = abilities.filter((a) => !a.isHidden);
  const hidden = abilities.filter((a) => a.isHidden);
  return (
    // <div className="grid gap-6 xl:max-w-xl w-full">
    //   <div className="grid gap-4">
    //     <div>
    //       <div className="text-xl font-semibold mb-2">일반특성</div>
    //       <div className=" grid  gap-1">
    //         {normal.map((a) => (
    //           <Ability key={a.name} ability={a} />
    //         ))}
    //       </div>
    //     </div>
    //     <div>
    //       <div className="text-xl font-semibold mb-2">숨겨진 특성</div>
    //       <div className="grid gap-1">
    //         {hidden.map((a) => (
    //           <Ability key={a.name} ability={a} />
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="grid md:grid-cols-3 gap-4">
      {abilities.map((ability, index) => (
        <Fragment key={ability.name}>
          {/* {index > 0 && <div className="w-full h-px bg-border my-4" />} */}
          <Ability key={ability.name} ability={ability} />
        </Fragment>
      ))}
    </div>
  );
}
