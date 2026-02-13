import { AbilitiyView } from '../../model';

interface AbilityProps {
  ability: AbilitiyView;
}

export default function Ability({ ability }: AbilityProps) {
  const hidden = '숨겨진 특성';

  return (
    <div className="bg-card border-t py-4 first:pt-0 first:border-t-0">
      <span className="font-medium text-foreground text-lg">
        {ability.name}
        {ability.slot === 3 && (
          <span className="text-xs py-1 px-2 rounded-md mx-1.5 font-medium bg-muted border">
            {hidden}
          </span>
        )}
      </span>
      <p className="break-keep text-muted-foreground">{ability.flavorText}</p>
    </div>
  );
}
