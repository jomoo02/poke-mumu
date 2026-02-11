import { AbilitiyView } from '../../model';

interface AbilityProps {
  ability: AbilitiyView;
}

export default function Ability({ ability }: AbilityProps) {
  const hidden = '숨겨진 특성';

  return (
    <div className="p-6 border rounded-2xl bg-card aspect-5/2 flex flex-col gap-1">
      <div className="font-medium text-lg">
        {ability.name}
        {ability.slot === 3 && (
          <span className="text-xs py-1 px-2 rounded-md mx-1 text-muted-foreground font-medium bg-muted border">
            {hidden}
          </span>
        )}
      </div>

      <p className="break-keep text-muted-foreground ">{ability.flavorText}</p>
    </div>
  );
}
