import Link from 'next/link';
import { DotIcon } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';

import { cn } from '@/shared/lib/cn';
import type { Ability } from '@/entities/ability/model';

interface AbilityListProps {
  abilities: Ability[];
}

export default function AbilityList({ abilities }: AbilityListProps) {
  return (
    <div>
      <div
        id="ability-list-header"
        className="py-2  grid-cols-8 gap-x-4 text-sm font-medium px-4  hidden lg:grid"
      >
        <div className="col-span-2">특성</div>
        <div className="col-span-5 ">설명</div>
        <div className=" justify-end px-2 flex ">세대</div>
      </div>
      {abilities.length > 0 ? (
        <div>
          {abilities.map((ability, index) => (
            <Fragment key={ability.identifier}>
              <div className="-mx-4 sm:mx-0 lg:mx-0">
                <div className="w-full h-px bg-border my-1" />
              </div>
              <AbilityItem key={ability.identifier} ability={ability} />
            </Fragment>
          ))}
        </div>
      ) : (
        <div className="py-3 lg:px-4">일치하는 특성이 없습니다</div>
      )}
    </div>
  );
}

interface AbilityProps {
  ability: Ability;
}

function AbilityItem({ ability }: AbilityProps) {
  const genLabel = ability.gen ? `${ability.gen}세대` : '-';

  return (
    <Link
      href={`/ability/${ability.identifier}`}
      className={cn(
        'group block -mx-2.5 lg:mx-0',
        'active:bg-muted/70 hover:bg-muted/70 rounded-2xl',
      )}
    >
      <div
        className={cn(
          'grid-cols-[1fr_auto] gap-y-1.5 grid gap-x-6  px-2.5 py-2.5 lg:px-4 lg:py-3 ',
          'lg:grid-cols-8 lg:gap-x-4 lg:items-start',
        )}
      >
        <div className="flex flex-col lg:col-span-2">
          <div className="font-semibold">{ability.nameKo}</div>
          <div className="text-foreground/70 flex items-center text-md lg:text-base flex-wrap lg:pt-1">
            <span className=" truncate">{ability.nameEn}</span>
            <DotIcon className="size-4.5" />
            <span className=" truncate">{ability.nameJa}</span>
          </div>
        </div>

        <div className="lg:col-start-8 flex h-fit justify-end">
          <div className="shrink-0 text-xs  text-foreground/80 w-fit h-fit border px-2 rounded-2xl py-0.5 bg-muted">
            {genLabel}
          </div>
        </div>
        <p
          className={cn(
            'col-span-2 line-clamp-2 break-keep text-md lg:text-base text-balance',
            'lg:col-span-5 lg:col-start-3 lg:row-start-1 lg:line-clamp-3',
          )}
        >
          {ability.flavorText}
        </p>
      </div>
    </Link>
  );
}
