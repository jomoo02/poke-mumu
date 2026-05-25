import { cn } from '@/shared/lib/cn';
import { type AbilityView } from '../model';

import Link from 'next/link';
import { DotIcon } from 'lucide-react';

const getAppeared = (ability: AbilityView) =>
  ability.gen ? `${ability.gen}세대` : '-';

interface AbilityListProps {
  abilities: AbilityView[];
  className?: string;
}

export default function AbilityListV2({
  abilities,
  className,
}: AbilityListProps) {
  return (
    <div className={cn(className, 'divide-y divide-border')}>
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
          <div className="py-2.5 px-4 group-hover:bg-muted  grid grid-cols-8 gap-4">
            <div className="col-span-2">
              <div className="flex flex-col">
                <div className="font-medium">{ability.nameKo}</div>
                <div className=" text-muted-foreground flex items-center">
                  <span>{ability.nameEn}</span>
                  <DotIcon className="size-4.5" />
                  <span>{ability.nameJa}</span>
                </div>
              </div>
            </div>
            <p className="line-clamp-3 whitespace-normal wrap-break-word col-span-5">
              {ability.flavorText}
            </p>
            <div className="text-right">{getAppeared(ability)}</div>
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
          <div className="py-2.5 flex gap-x-6 justify-between">
            <div className="flex flex-col">
              <div className="font-medium">{ability.nameKo}</div>
              <div className=" text-muted-foreground flex items-center text-md">
                <span>{ability.nameEn}</span>
                <DotIcon className="size-4.5" />
                <span>{ability.nameJa}</span>
              </div>
              <p className="line-clamp-2 whitespace-normal break-keep text-md pt-1.5">
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
