import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/app/shared/lib/cn';

import { type EvolutionNode } from '../model';
import { PokeSprite } from '@/app/entities/poke/ui';

interface EvolutionNodeCardProps {
  node: EvolutionNode;
  active: boolean;
}

export function EvolutionNodeCard({ node, active }: EvolutionNodeCardProps) {
  return (
    <Link
      href={`/pokedex/${node.pokeKey}`}
      prefetch={false}
      aria-label={`${node.nameKo}${node.formKo ? ` (${node.formKo})` : ''} 상세로 이동`}
      className="w-full"
    >
      <div
        className={cn(
          'flex flex-col  w-full justify-center items-center gap-1 rounded-lg border bg-card p-3 transition-colors',
        )}
      >
        <PokeSprite poke={node} />

        <div className="text-center">
          <div className="text-sm font-medium leading-tight">{node.nameKo}</div>
          {node.formKo && (
            <div className="text-sm text-muted-foreground leading-tight">
              {node.formKo}
            </div>
          )}
          <div className="text-sm text-muted-foreground">
            #{String(node.dexNumber).padStart(4, '0')}
          </div>
        </div>
      </div>
    </Link>
  );
}
