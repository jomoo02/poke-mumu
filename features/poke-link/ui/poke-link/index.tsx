import { cn } from '@/shared/lib/cn';
import type { PokeLinkPoke } from '../../model';

import { PokeLinkDesktop } from './desktop';
import { PokeLinkMobile } from './mobile';

interface PokeItemProps {
  poke: PokeLinkPoke;
  formatLength?: number;
  className?: string;
  showForm?: boolean;
}

export function PokeLink({ className, ...props }: PokeItemProps) {
  return (
    <>
      <PokeLinkMobile className={cn('sm:hidden', className)} {...props} />
      <PokeLinkDesktop className={cn('hidden sm:flex', className)} {...props} />
    </>
  );
}
