import Link from 'next/link';

import { PokeSprite } from '@/entities/poke/ui';
import { formatNumber } from '@/shared/lib/format';
import { TypeIcon } from '@/entities/type/ui';
import { cn } from '@/shared/lib/cn';

import type { PokeLinkPoke } from '../../model';
import { bgVariants } from '../util';

import { PokeLinkDesktop } from './desktop';

interface PokeItemProps {
  poke: PokeLinkPoke;
  formatLength?: number;
  className?: string;
  showForm?: boolean;
}

export function PokeLink({ ...props }: PokeItemProps) {
  return (
    <>
      <PokeLinkDesktop {...props} />
    </>
  );
}
