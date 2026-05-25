import { cn } from '@/shared/lib/cn';
import { type AbilityView } from '../model';

import Link from 'next/link';

const getAppeared = (ability: AbilityView) =>
  ability.gen ? `${ability.gen}세대` : '-';

interface AbilityListProps {
  abilities: AbilityView[];
  className?: string;
}

export default function AbilityList({
  abilities,
  className,
}: AbilityListProps) {
  return (
    <div className={cn(className)}>
      {/* <div className="grid-cols-9 gap-x-6 py-2 border-b hidden lg:grid">
        <div className="col-span-2 px-4 text-md font-medium">특성</div>
        <div className="col-span-6 px-4 text-md font-medium">설명</div>
        <div className="col-span-1 px-4 text-md font-medium">등장</div>
      </div> */}
      {abilities.map((ability) => (
        <Ability key={ability.identifier} ability={ability} />
      ))}
    </div>
  );
}

interface AbilityProps {
  ability: AbilityView;
}

function Ability({ ability }: AbilityProps) {
  return (
    <div>
      {/* lg */}
      <div className="hidden lg:block">
        <Link href={`/ability/${ability.identifier}`} className="group">
          <div className="py-2.5 px-4 group-hover:bg-muted border-b ">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-3">
                <div className="font-medium text-lg">{ability.nameKo}</div>
                <div className="text-foreground/70">{ability.nameEn}</div>
                <div className="text-foreground/70">{ability.nameJa}</div>
              </div>

              <div className="">{getAppeared(ability)}</div>
            </div>

            <p className="line-clamp-3 whitespace-normal wrap-break-word pt-1">
              {ability.flavorText}
            </p>
          </div>
          {/* <div className="grid grid-cols-8 gap-x-6 py-2.5 group-hover:bg-muted border-b">
            <div className="col-span-1 px-4 font-medium">{ability.nameKo}</div>
            <div className="col-span-1 px-4">{ability.nameEn}</div>
            <div className="col-span-1 px-4">{ability.nameJa}</div>
            <div className="col-span-4 px-4">
              <p className="line-clamp-3 whitespace-normal wrap-break-word">
                {ability.flavorText}
              </p>
            </div>
            <div className="col-span-1 px-4">{getAppeared(ability)}</div>
          </div> */}
        </Link>
      </div>
      {/* mobile */}
      <div className="lg:hidden">
        <Link href={`/ability/${ability.identifier}`} className="group">
          <div className="py-3.5 border-b flex gap-x-6 justify-between">
            <div className="flex flex-col gap-y-1">
              <div className="font-medium">{ability.nameKo}</div>

              <p className="line-clamp-2 whitespace-normal break-keep text-foreground/70 text-md">
                {ability.flavorText}
              </p>
            </div>
            <div className=" flex justify-end shrink-0 text-sm text-foreground/70 h-fit border px-2 rounded-2xl py-0.5 bg-muted">
              {getAppeared(ability)}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
