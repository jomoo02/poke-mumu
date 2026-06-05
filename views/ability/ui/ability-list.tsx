import Link from 'next/link';
import { DotIcon } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import type { Ability } from '@/entities/ability/model';

interface AbilityListProps {
  abilities: Ability[];
}

export default function AbilityList({ abilities }: AbilityListProps) {
  return (
    <>
      {abilities.length > 0 ? (
        <ul className="flex flex-col">
          {abilities.map((ability, idx) => (
            <li key={ability.identifier}>
              <div
                className={cn(
                  'w-full h-px bg-border',
                  idx > 0 ? 'my-1' : 'mb-1',
                )}
              />
              <div className="-mx-3.5 lg:mx-0">
                <AbilityItem ability={ability} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <div className="w-full h-px bg-border mb-1" />
          <div className=" px-3.5 py-3 lg:px-4 lg:py-3.5 font-medium text-muted-foreground -mx-3.5 lg:mx-0">
            일치하는 특성이 없습니다
          </div>
        </div>
      )}
    </>
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
        'group block hover:bg-accent/70 rounded-2xl',
        'outline-none border border-transparent focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
        'transition-colors duration-100',
      )}
    >
      <div
        className={cn(
          'flex gap-x-3.5 px-3.5 py-3 lg:px-4 lg:py-3.5 justify-between',
        )}
      >
        <div className="flex flex-col gap-y-1">
          <div
            id="ability-names"
            className="flex flex-col lg:flex-row gap-x-3.5"
          >
            <h3 className="font-semibold text-lg">{ability.nameKo}</h3>
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

        <div className="shrink-0 truncate text-xs text-muted-foreground font-medium w-fit h-fit border px-2 rounded-2xl py-0.5 bg-muted">
          {`${ability.gen}세대`}
        </div>
      </div>
    </Link>
  );
}
