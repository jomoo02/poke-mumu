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
  if (type.identifier === 'unknwon') {
    return (
      <div
        className={cn(
          'size-8 bg-emerald-800 text-white font-semibold rounded-lg flex items-center justify-center',
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
        'h-7 w-15 px-px font-bold text-sm flex items-center justify-center rounded-md border text-white shrink-0 shadow-sm',
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
