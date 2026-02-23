import { Fragment } from 'react/jsx-runtime';
import { AbilitiyView } from '../../model';
import Ability from './ability';
import SectionTitle from '../section-title';
import { Card, CardHeader } from '../card';

interface AbilitiesProps {
  abilities: AbilitiyView[];
}
export default function Abilities({ abilities }: AbilitiesProps) {
  const normal = abilities.filter((a) => !a.isHidden);
  const hidden = abilities.filter((a) => a.isHidden);
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="">일반 특성</CardHeader>
        <div className="flex flex-col">
          {normal.map((ability) => (
            <Ability key={ability.name} ability={ability} />
          ))}
        </div>
      </Card>
      <Card>
        <CardHeader>숨겨진 특성</CardHeader>
        {hidden.length > 0 ? (
          <>
            {hidden.map((ability) => (
              <Ability key={ability.name} ability={ability} />
            ))}
          </>
        ) : (
          <div className="p-4 text-muted-foreground">-</div>
        )}
      </Card>
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
