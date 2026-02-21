import { AbilitiyView } from '../../model';

interface AbilityProps {
  ability: AbilitiyView;
}

export default function Ability({ ability }: AbilityProps) {
  return (
    <div className="px-4 py-3 border-t">
      <div className="font-medium text-foreground text-xl">{ability.name}</div>

      <p className="break-keep text-pretty text-muted-foreground pt-1">
        {ability.flavorText}
      </p>
    </div>
  );
}
