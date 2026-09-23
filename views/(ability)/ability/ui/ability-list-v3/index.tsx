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
import { Fragment } from 'react/jsx-runtime';

interface AbilityListProps {
  abilities: Ability[];
}

export default function AbilityListV3({ abilities }: AbilityListProps) {
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
        // <div className="grid sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
        <div className="flex flex-col ">
          {filteredAbilities.map((ability, idx) => (
            <Fragment key={ability.identifier}>
              {idx > 0 && <div className="w-full h-px bg-border" />}
              <div className="">
                <AbilityItem ability={ability} idx={idx + 1} />
              </div>
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

interface AbilityProps {
  ability: Ability;
  idx: number;
}

function AbilityItem({ ability, idx }: AbilityProps) {
  return (
    <Card
      variant={'link'}
      render={<Link href={`/ability/${ability.identifier}`} />}
      // className="h-39.75"
      className="grid grid-cols-12 border-0 shadow-none rounded-lg"
    >
      <div className="flex items-center justify-center">
        <div className="bg-muted rounded-full size-9 flex items-center justify-center text-muted-foreground text-sm font-medium">
          {idx}
        </div>
      </div>

      <CardHeader className="col-span-4">
        <CardTitle>{ability.nameKo}</CardTitle>
        <CardDescription>
          <p className="truncate">{`${ability.nameEn} / ${ability.nameJa}`}</p>
        </CardDescription>
      </CardHeader>
      <CardContent
        className={cn(
          'col-start col-span-6 flex-row items-center px-0',
          'line-clamp-  text-foreground/70',
        )}
      >
        {ability.flavorText}
      </CardContent>
    </Card>
  );
}
