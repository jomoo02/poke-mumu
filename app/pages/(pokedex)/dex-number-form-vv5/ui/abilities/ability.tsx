import { type AbilitiyView } from '../../model';

interface AbilityProps {
  ability: AbilitiyView;
  index: number;
}

export default function Ability({ ability, index }: AbilityProps) {
  const { isHidden, flavorText, name } = ability;

  const title = isHidden ? '숨겨진 특성' : ``;
  return (
    <div className="py-4">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1">
          <h3 className="text-lg font-semibold">{name}</h3>
          {title && (
            <span className="text-xs font-medium tracking-wide px-2 py-0.75 rounded-md bg-secondary">
              {title}
            </span>
          )}
        </div>

        <div className="break-keep text-pretty text-muted-foreground">
          {flavorText}
        </div>
      </div>
    </div>
  );
}
