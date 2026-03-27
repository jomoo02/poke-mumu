import { AbilitiyView } from '../../model';

interface AbilityProps {
  ability: AbilitiyView;
}

export default function Ability({ ability }: AbilityProps) {
  const { isHidden, flavorText, name } = ability;
  return (
    <div className="py-2 first:pt-0 last:pb-0">
      <div className="text-lg font-semibold">
        {name}
        {isHidden && (
          <span className="text-sm bg-muted text-muted-foreground font-medium ml-1.5 px-2 py-0.5 rounded-sm">
            숨겨진 특성
          </span>
        )}
      </div>
      <div className="break-keep text-pretty text-muted-foreground">
        {flavorText}
      </div>
    </div>
    // <li className="mt-2 first:mt-0">
    //   <strong>{ability.name}</strong>
    //   <span className="break-keep text-pretty">{`: ${ability.flavorText}`}</span>
    // </li>
  );
}
