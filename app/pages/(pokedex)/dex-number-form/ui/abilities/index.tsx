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
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="px-4 py-2 bg-muted/70 font-medium rounded-t-md">
            일반 특성
          </div>
          <div className="flex flex-col">
            {normal.map((ability) => (
              <Ability key={ability.name} ability={ability} />
            ))}
          </div>
        </div>
        <div>
          <div className="px-4 py-2 bg-muted/70 font-medium rounded-t-md">
            숨겨진 특성
          </div>
          {hidden.length > 0 ? (
            <>
              {hidden.map((ability) => (
                <Ability key={ability.name} ability={ability} />
              ))}
            </>
          ) : (
            <div className="p-4 text-muted-foreground border-t">-</div>
          )}
        </div>
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
