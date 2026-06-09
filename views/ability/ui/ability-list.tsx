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
      <div className="py-4 font-medium text-muted-foreground">
        일치하는 특성이 없습니다
      </div>
    );
  }

  return (
    <ul className="flex flex-col divide-y">
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
        'group block ',
        'outline-none border border-transparent focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
        // 'transition-colors duration-100  hover:bg-muted/70 rounded-2xl',
        'flex gap-3.5 py-3.5',
        '',
      )}
    >
      <div className="flex flex-col flex-1 gap-1.5 w-full">
        <div id="ability-names" className="flex flex-col gap-0.5">
          <span className="font-semibold text-lg lg:text-xl group-hover:text-primary transition-colors duration-200">
            {ability.nameKo}
          </span>
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

      <div className="shrink-0 truncate text-xs font-medium w-fit h-fit border px-2 rounded-xl py-0.5 bg-secondary text-secondary-foreground">
        {`${ability.gen}세대`}
      </div>
    </Link>
  );
}
