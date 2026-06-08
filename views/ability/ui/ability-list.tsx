import Link from 'next/link';
import { DotIcon } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import type { Ability } from '@/entities/ability/model';

interface AbilityListProps {
  abilities: Ability[];
}

export default function AbilityList({ abilities }: AbilityListProps) {
  if (abilities.length === 0) {
    return (
      <div className="py-3 lg:py-3.5 font-medium text-muted-foreground">
        일치하는 특성이 없습니다
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {abilities.map((ability) => (
        <li key={ability.identifier}>
          <AbilityItem ability={ability} />
        </li>
      ))}
    </ul>
  );
}

interface AbilityProps {
  ability: Ability;
}

function AbilityItem({ ability }: AbilityProps) {
  return (
    <Link
      href={`/ability/${ability.identifier}`}
      className={cn(
        'group block rounded-2xl',
        'outline-none border border-transparent focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
        'transition-colors duration-100 bg-muted/50 hover:bg-muted',
        'flex gap-3.5 px-3.5 py-3 lg:px-4 lg:py-3.5',
      )}
    >
      <div className="flex flex-col flex-1 gap-1 w-full">
        <div id="ability-names" className="flex flex-col lg:flex-row gap-x-3.5">
          <span className="font-semibold text-lg">{ability.nameKo}</span>
          <div className="flex items-center flex-wrap">
            <span className="truncate">{ability.nameEn}</span>
            <DotIcon className="size-4.5" />
            <span className="truncate">{ability.nameJa}</span>
          </div>
        </div>
        <p
          id="ability-flavorText"
          className={cn(
            'line-clamp-2 break-keep text-md lg:text-base text-balance text-foreground/70',
          )}
        >
          {ability.flavorText}
        </p>
      </div>

      <div className="shrink-0 truncate text-xs font-medium w-fit h-fit border px-2 rounded-2xl py-0.5 bg-secondary text-secondary-foreground">
        {`${ability.gen}세대`}
      </div>
    </Link>
  );
}
