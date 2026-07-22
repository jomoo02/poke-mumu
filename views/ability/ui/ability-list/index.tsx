'use client';

import Link from 'next/link';
import { DotIcon } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import type { Ability } from '@/entities/ability/model';
import { Card, CardContent, CardFooter } from '@/shared/ui/card';

import useAbilityList from './useAbilityList';

interface AbilityListProps {
  abilities: Ability[];
}

export default function AbilityList({ abilities }: AbilityListProps) {
  const { filteredAbilities } = useAbilityList(abilities);

  return (
    <div className="flex flex-col gap-6">
      <div aria-live="polite" className="text-sm text-foreground/70">
        {filteredAbilities.length}개의 특성
      </div>
      {filteredAbilities.length === 0 ? (
        <div className="font-medium text-muted-foreground">
          일치하는 특성이 없습니다
        </div>
      ) : (
        <ul className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {filteredAbilities.map((ability) => (
            <li key={ability.identifier}>
              <AbilityItem ability={ability} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

interface AbilityProps {
  ability: Ability;
}

function AbilityItem({ ability }: AbilityProps) {
  return (
    <Card
      variant={'link'}
      render={<Link href={`/ability/${ability.identifier}`} />}
    >
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
  );
}
