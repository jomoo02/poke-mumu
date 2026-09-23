'use client';

import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/shared/lib/cn';
import type { Ability } from '@/entities/ability/model';
import { Button } from '@/shared/ui/button';
import { Pagination } from '@/shared/ui/pagination';

import useAbilityList from './useAbilityList';

interface AbilityListProps {
  abilities: Ability[];
}

export default function AbilityListV8({ abilities }: AbilityListProps) {
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
            <AbilityItem
              key={ability.identifier}
              ability={ability}
              idx={idx + 1}
            />
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
    <>
      <div
        className={cn(
          'group relative rounded-xl flex flex-col gap-5 py-5',
          'md:grid md:grid-cols-12 md:py-7',
          '[@media(hover:hover)]:hover:bg-muted/70 -mx-2 px-2 md:-mx-3 md:px-3',
          'before:absolute before:inset-x-2 md:before:inset-x-3 before:top-0 before:h-px before:bg-border first:before:hidden',
          '[@media(hover:hover)]:hover:before:opacity-0 [@media(hover:hover)]:[div:hover+&]:before:opacity-0',
          'has-[a:focus-visible]:before:opacity-0 [div:has(a:focus-visible)+&]:before:opacity-0',
        )}
      >
        <div className="flex flex-col gap-1 md:col-span-3">
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
          <p className="text-sm break-keep text-foreground/70 ">
            <span>{ability.nameEn}</span>
            {' / '}
            <span>{ability.nameJa}</span>
          </p>
        </div>
        <div className="md:col-span-8">
          <p className="flex-1 md:flex md:h-full md:items-center leading-relaxed break-keep text-foreground/70 ">
            {ability.flavorText}
          </p>
        </div>
        <div className="h-full hidden md:flex items-center justify-end ">
          <div className="text-muted-foreground size-9 flex items-center justify-center ">
            <ChevronRightIcon className="size-5.5" />
          </div>
        </div>
      </div>
    </>
  );
}
