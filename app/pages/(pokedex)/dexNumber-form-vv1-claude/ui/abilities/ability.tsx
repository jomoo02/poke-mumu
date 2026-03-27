import { AbilitiyView } from '../../../dex-number-form-vv1/model';

interface AbilityProps {
  ability: AbilitiyView;
}

export default function Ability({ ability }: AbilityProps) {
  return (
    <div className="rounded-lg border bg-card px-4 py-3 flex flex-col gap-1">
      <span className="text-sm font-semibold">{ability.name}</span>
      <span className="text-sm text-muted-foreground break-keep text-pretty leading-relaxed">
        {ability.flavorText}
      </span>
    </div>
  );
}
