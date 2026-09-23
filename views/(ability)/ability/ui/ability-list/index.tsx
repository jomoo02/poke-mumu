'use client';

import Link from 'next/link';

import { cn } from '@/shared/lib/cn';
import type { Ability } from '@/entities/ability/model';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';

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
        <div className="grid sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
          {filteredAbilities.map((ability) => (
            <AbilityItem key={ability.identifier} ability={ability} />
          ))}
        </div>
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
      className="h-39.75"
    >
      <CardHeader>
        <CardTitle>{ability.nameKo}</CardTitle>
        <CardDescription>
          <p className="truncate">{`${ability.nameEn} / ${ability.nameJa}`}</p>
        </CardDescription>
      </CardHeader>
      <CardContent
        className={cn(
          'line-clamp-2 break-keep flex-1 h-full text-md text-foreground/70',
        )}
      >
        {ability.flavorText}
      </CardContent>
    </Card>
  );
}
