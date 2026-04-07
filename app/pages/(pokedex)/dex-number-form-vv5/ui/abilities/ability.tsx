import { type AbilitiyView } from '../../model';

interface AbilityProps {
  ability: AbilitiyView;
  index: number;
}

export default function Ability({ ability, index }: AbilityProps) {
  const { isHidden, flavorText, name } = ability;

  const title = isHidden ? '숨겨진 특성' : `특성 ${index}`;
  return (
    <div className="border rounded-2xl overflow-hidden flex flex-col gap-3 py-6">
      {/* <div className="grid grid-cols-[1fr_auto] auto-rows-min px-6">
        <h3 className="text-xl font-semibold ">{name}</h3>
        <div className="items-start inline-flex">
          <span className=" text-xs font-medium tracking-wide px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground overflow-hidden text-nowrap">
            {title}
          </span>
        </div>
      </div> */}

      <div className="items-start inline-flex px-6">
        <span className=" text-xs font-medium tracking-wide px-2 py-0.75 rounded-md bg-secondary">
          {title}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-semibold px-6">{name}</h3>
        <div className="break-keep text-pretty text-muted-foreground px-6">
          {flavorText}
        </div>
      </div>
    </div>
  );
}
