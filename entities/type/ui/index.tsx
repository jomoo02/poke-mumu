import Image from 'next/image';

import { cn } from '@/shared/lib/cn';

import type { Type } from '../model';

interface TypeBadgeProps {
  type: Type;
  size?: 'small' | 'default';
  isVisibleContent?: boolean;
  className?: string;
}

export function TypeBadge({
  type,
  className,
  size = 'default',
}: TypeBadgeProps) {
  const bgVariants: Record<string, string> = {
    normal: 'bg-normal',
    fire: 'bg-fire',
    water: 'bg-water',
    grass: 'bg-grass',
    electric: 'bg-electric',
    ice: 'bg-ice',
    fighting: 'bg-fighting',
    poison: 'bg-poison',
    ground: 'bg-ground',
    flying: 'bg-flying',
    psychic: 'bg-psychic',
    bug: 'bg-bug',
    rock: 'bg-rock',
    ghost: 'bg-ghost',
    dragon: 'bg-dragon',
    dark: 'bg-dark',
    steel: 'bg-steel',
    fairy: 'bg-fairy',
    unknown: 'bg-unknown',
  };

  const shadowVariants: Record<string, string> = {
    normal: 'shadow-normal/50',
    fire: 'shadow-fire/50',
    water: 'shadow-water/50',
    grass: 'shadow-grass/50',
    electric: 'shadow-electric/50',
    ice: 'shadow-ice/50',
    fighting: 'shadow-fighting/50',
    poison: 'shadow-poison/50',
    ground: 'shadow-ground/50',
    flying: 'shadow-flying/50',
    psychic: 'shadow-psychic/50',
    bug: 'shadow-bug/50',
    rock: 'shadow-rock/50',
    ghost: 'shadow-ghost/50',
    dragon: 'shadow-dragon/50',
    dark: 'shadow-dark/50',
    steel: 'shadow-steel/50',
    fairy: 'shadow-fairy/50',
    unknown: 'shadow-unknown/50',
  };

  const bg = bgVariants[type.identifier] || bgVariants.unknown;
  const content = type.nameKo;
  const shadowColor = shadowVariants[type.identifier] || shadowVariants.unknown;

  return (
    <div
      className={cn(
        'w-20 h-7.5 text-white rounded-lg flex items-center p-1 shadow-sm font-extrabold ',
        size === 'small' ? 'w-18.5 h-7' : '',
        bg,
        shadowColor,
        className,
      )}
    >
      <Image
        src={`/type/${type.identifier}.png`}
        width={size === 'small' ? 20 : 22}
        height={size === 'small' ? 20 : 22}
        alt={type.identifier}
      />
      <span
        className={cn(
          'text-sm text-center flex-1 tracking-wide',
          size === 'small' ? 'text-xs' : '',
        )}
      >
        {content}
      </span>
    </div>
  );
}

export function TypeIcon({ type, className }: TypeBadgeProps) {
  const bgVariants: Record<string, string> = {
    normal: 'bg-normal dark:bg-normal/80',
    fire: 'bg-fire dark:bg-fire/80',
    water: 'bg-water dark:bg-water/80',
    grass: 'bg-grass dark:bg-grass/80',
    electric: 'bg-electric dark:bg-electric/80',
    ice: 'bg-ice dark:bg-ice/80',
    fighting: 'bg-fighting dark:bg-fighting/80',
    poison: 'bg-poison dark:bg-poison/80',
    ground: 'bg-ground dark:bg-ground/80',
    flying: 'bg-flying dark:bg-flying/80',
    psychic: 'bg-psychic dark:bg-psychic/80',
    bug: 'bg-bug dark:bg-bug/80',
    rock: 'bg-rock dark:bg-rock/80',
    ghost: 'bg-ghost dark:bg-ghost/80',
    dragon: 'bg-dragon dark:bg-dragon/80',
    dark: 'bg-dark dark:bg-dark/80',
    steel: 'bg-steel dark:bg-steel/80',
    fairy: 'bg-fairy dark:bg-fairy/80',
    unknown: 'bg-unknown dark:bg-unknown/80',
  };

  const shadowVariants: Record<string, string> = {
    normal: 'shadow-normal/50',
    fire: 'shadow-fire/50',
    water: 'shadow-water/50',
    grass: 'shadow-grass/50',
    electric: 'shadow-electric/50',
    ice: 'shadow-ice/50',
    fighting: 'shadow-fighting/50',
    poison: 'shadow-poison/50',
    ground: 'shadow-ground/50',
    flying: 'shadow-flying/50',
    psychic: 'shadow-psychic/50',
    bug: 'shadow-bug/50',
    rock: 'shadow-rock/50',
    ghost: 'shadow-ghost/50',
    dragon: 'shadow-dragon/50',
    dark: 'shadow-dark/50',
    steel: 'shadow-steel/50',
    fairy: 'shadow-fairy/50',
    unknown: 'shadow-unknown/50',
  };

  const bg = bgVariants[type.identifier] || bgVariants.unknown;
  const shadowColor = shadowVariants[type.identifier] || shadowVariants.unknown;

  if (type.identifier === 'unknown') {
    return (
      <div
        className={cn(
          'size-7.5 text-sm bg-emerald-800 text-white font-extrabold rounded-lg p-1 flex items-center justify-center',
          className,
        )}
      >
        ?
      </div>
    );
  }
  return (
    <div
      className={cn(
        'size-7.5 rounded-lg flex items-center justify-center p-0.75',
        bg,
        // shadowColor,
        className,
      )}
    >
      <Image
        src={`/type/${type.identifier}.png`}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        alt={type.identifier}
      />
    </div>
  );
}

export function TypeText({ type, className }: TypeBadgeProps) {
  const bgVariants: Record<string, string> = {
    normal: 'bg-normal',
    fire: 'bg-fire',
    water: 'bg-water',
    grass: 'bg-grass',
    electric: 'bg-electric',
    ice: 'bg-ice',
    fighting: 'bg-fighting',
    poison: 'bg-poison',
    ground: 'bg-ground',
    flying: 'bg-flying',
    psychic: 'bg-psychic',
    bug: 'bg-bug',
    rock: 'bg-rock',
    ghost: 'bg-ghost',
    dragon: 'bg-dragon',
    dark: 'bg-dark',
    steel: 'bg-steel',
    fairy: 'bg-fairy',
    unknown: 'bg-unknown',
  };
  const bg = bgVariants[type.identifier] || bgVariants.unknown;
  const content = type.nameKo;
  return (
    <div
      className={cn(
        'w-20 h-7.5 rounded-lg flex items-center p-1 shadow-sm',

        bg,

        className,
      )}
    >
      <span
        className={cn(
          'text-sm text-white font-extrabold text-center flex-1 tracking-wide',
        )}
      >
        {content}
      </span>
    </div>
  );
}
