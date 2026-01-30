import Image from 'next/image';

import { cn } from '@/app/shared/lib/cn';

import { type Type } from '../model';

interface TypeIconProps {
  type: Type;
  size?: number;
  isVisibleContent?: boolean;
  className?: string;
}

export function TypeIcon({ type, className, size = 32 }: TypeIconProps) {
  if (type.identifier === 'unknown') {
    return (
      <div
        className={cn(
          'size-8 bg-emerald-800 text-white font-semibold rounded-sm flex items-center justify-center',
          className,
        )}
      >
        ?
      </div>
    );
  }
  return (
    <div className={cn('flex flex-col items-center relative  ', className)}>
      <div className="overflow-hidden rounded-sm">
        <Image
          src={`/type-icon/${type.identifier}.png`}
          width={size}
          height={size}
          alt={type.identifier}
        />
      </div>
    </div>
  );
}

interface TypeBadgeProps {
  type: Type;
  size?: number;
  isVisibleContent?: boolean;
  className?: string;
}

export function TypeBadge({ type, className }: TypeBadgeProps) {
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
    normal: 'shadow-normal/30',
    fire: 'shadow-fire/30',
    water: 'shadow-water/30',
    grass: 'shadow-grass/30',
    electric: 'shadow-electric/30',
    ice: 'shadow-ice/30',
    fighting: 'shadow-fighting/30',
    poison: 'shadow-poison/30',
    ground: 'shadow-ground/30',
    flying: 'shadow-flying/30',
    psychic: 'shadow-psychic/30',
    bug: 'shadow-bug/30',
    rock: 'shadow-rock/30',
    ghost: 'shadow-ghost/30',
    dragon: 'shadow-dragon/30',
    dark: 'shadow-dark/30',
    steel: 'shadow-steel/30',
    fairy: 'shadow-fairy/30',
    unknown: 'shadow-unknown/30',
  };

  const borderColorVariatns: Record<string, string> = {
    normal: 'border-normal',
    fire: 'border-fire',
    water: 'border-water',
    grass: 'border-grass',
    electric: 'border-electric',
    ice: 'border-ice',
    fighting: 'border-fighting',
    poison: 'border-poison',
    ground: 'border-ground',
    flying: 'border-flying',
    psychic: 'border-psychic',
    bug: 'border-bug',
    rock: 'border-rock',
    ghost: 'border-ghost',
    dragon: 'border-dragon',
    dark: 'border-dark',
    steel: 'border-steel',
    fairy: 'border-fairy',
    unknown: 'border-unknown',
  };

  const bg = bgVariants[type.identifier] || bgVariants.unknown;
  const borderColor =
    borderColorVariatns[type.identifier] || borderColorVariatns.unknown;
  const content = type.name;
  const shadowColor = shadowVariants[type.identifier] || shadowVariants.unknown;

  return (
    <div
      className={cn(
        'h-7.5 w-15 px-px font-bold text-sm flex items-center justify-center rounded-md border text-white shrink-0 text-shadow-lg',
        bg,
        borderColor,
        shadowColor,
        className,
      )}
    >
      {content}
    </div>
  );
}
