import { AbilitiyView } from '../../model';

interface AbilityProps {
  ability: AbilitiyView;
}

export default function Ability({ ability }: AbilityProps) {
  const hidden = '숨겨진 특성';

  return (
    <div className="p-6 border rounded-2xl shadow-sm">
      <span className="font-medium text-foreground text-xl">
        {ability.name}
        {ability.slot === 3 && (
          <span className="text-xs py-1 px-2 rounded-md mx-1.5 font-medium bg-muted border">
            {hidden}
          </span>
        )}
      </span>
      <p className="break-keep text-pretty text-muted-foreground pt-1">
        {ability.flavorText}
      </p>
    </div>
  );
}
