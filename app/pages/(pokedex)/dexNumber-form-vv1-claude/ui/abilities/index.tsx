import { AbilitiyView } from '../../../dex-number-form-vv1/model';
import Ability from './ability';

interface AbilitiesProps {
  abilities: AbilitiyView[];
}

export default function Abilities({ abilities }: AbilitiesProps) {
  const normal = abilities.filter((a) => !a.isHidden);
  const hidden = abilities.filter((a) => a.isHidden);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">
          일반 특성
        </h3>
        <div className="flex flex-col gap-2">
          {normal.map((ability) => (
            <Ability key={ability.name} ability={ability} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">
          숨겨진 특성
        </h3>
        {hidden.length > 0 ? (
          <div className="flex flex-col gap-2">
            {hidden.map((ability) => (
              <Ability key={ability.name} ability={ability} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">없음</p>
        )}
      </div>
    </div>
  );
}
