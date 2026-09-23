'use client';

import Link from 'next/link';
import { ChevronRightIcon } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import type { Ability } from '@/entities/ability/model';

import useAbilityList from './useAbilityList';

interface AbilityListProps {
  abilities: Ability[];
}

export default function AbilityListV9({ abilities }: AbilityListProps) {
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
        <div className="flex flex-col">
          {filteredAbilities.map(({ ability, order }) => (
            <AbilityItem
              key={ability.identifier}
              ability={ability}
              order={order}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface AbilityProps {
  ability: Ability;
  order: number;
}

function AbilityItem({ ability, order }: AbilityProps) {
  return (
    <div
      className={cn(
        'group relative rounded-xl grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-3 py-5',
        'md:grid-cols-[2.5rem_minmax(0,3fr)_minmax(0,7fr)_auto] md:gap-x-5 md:py-8',
        '[@media(hover:hover)]:hover:bg-muted/70 -mx-3 px-3 md:mx-0 md:px-5',
        'before:absolute before:inset-x-3 before:top-0 before:h-px before:bg-border first:before:hidden',
        '[@media(hover:hover)]:hover:before:opacity-0 [@media(hover:hover)]:[div:hover+&]:before:opacity-0',
        'has-[a:focus-visible]:before:opacity-0 [div:has(a:focus-visible)+&]:before:opacity-0',
      )}
    >
      <div className="flex flex-col gap-1 md:col-start-2 md:row-start-1">
        <Link
          href={`/ability/${ability.identifier}`}
          className={cn(
            'font-semibold break-keep text-lg',
            'outline-none after:absolute after:inset-0 after:rounded-xl',
            'focus-visible:after:ring-[3px] focus-visible:after:ring-ring/50',
          )}
        >
          {ability.nameKo}
        </Link>
        <p className="text-sm break-keep text-foreground/70">
          {[ability.nameEn, ability.nameJa].filter(Boolean).join(' / ')}
        </p>
      </div>
      <div
        aria-hidden
        className="pt-1 text-sm tabular-nums text-muted-foreground md:col-start-1 md:row-start-1 md:flex md:items-center md:pt-0"
      >
        {order}
      </div>
      <p className="col-span-2 leading-relaxed break-keep text-foreground/70 md:col-span-1 md:col-start-3 md:row-start-1 md:flex md:items-center">
        {ability.flavorText}
      </p>
      <div className="hidden md:col-start-4 md:row-start-1 md:flex items-center justify-end">
        <div className="text-muted-foreground size-9 flex items-center justify-center">
          <ChevronRightIcon className="size-5.5" />
        </div>
      </div>
    </div>
  );
}
