import Link from 'next/link';
import { DotIcon } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import type { Ability } from '@/entities/ability/model';
import { Card, CardContent, CardFooter } from '@/shared/ui/card';

interface AbilityListProps {
  abilities: Ability[];
}

export default function AbilityList({ abilities }: AbilityListProps) {
  if (abilities.length === 0) {
    return (
      <div className="font-medium text-muted-foreground">
        일치하는 특성이 없습니다
      </div>
    );
  }

  return (
    <ul className=" grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
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
        'group block h-full',
        'outline-none border border-transparent focus-visible:ring-[3px] focus-visible:ring-ring/50',
        'rounded-4xl bg-card hover:bg-accent ',
      )}
    >
      <Card className="h-full bg-transparent group-focus-visible:border-ring">
        <CardContent className="flex-1 gap-3">
          <div className="flex flex-col gap-0.5">
            <div className="text-lg font-semibold">{ability.nameKo}</div>
            <div className="flex items-center flex-wrap text-md font-normal">
              <span className="truncate">{ability.nameEn}</span>
              <DotIcon className="size-4.5" />
              <span className="truncate">{ability.nameJa}</span>
            </div>
          </div>
          <p
            id="ability-flavorText"
            className={cn(
              'line-clamp-2 sm:line-clamp-3 break-keep flex-1 h-full text-md text-foreground/70',
            )}
          >
            {ability.flavorText}
          </p>
        </CardContent>
        <CardFooter>
          <div className="flex flex-wrap gap-1.5">
            <div className="shrink-0 truncate text-xs font-medium w-fit h-fit border px-2 rounded-xl py-0.5 bg-secondary text-secondary-foreground border-transparent">
              {`${ability.gen}세대`}
            </div>
            {ability.isChampions && (
              <div className="shrink-0 truncate text-xs font-medium w-fit h-fit border px-2 rounded-xl py-0.5 bg-secondary text-secondary-foreground border-transparent">
                챔피언스
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
