import { cn } from '@/app/shared/lib/cn';

import { type EvolutionNode } from '../model';
import ChainPoke from './chain-poke';
import Details from './details';

interface LeafNodeProps {
  className?: string;
  node: EvolutionNode;
}

export default function LeafNode({ node, className }: LeafNodeProps) {
  const { details, ...poke } = node;

  return (
    <div
      className={cn('flex flex-col lg:flex-row items-center w-full', className)}
    >
      <Details
        details={details}
        className={cn(
          'flex flex-col items-center h-full justify-center w-full',
        )}
      />
      <ChainPoke poke={poke} />
    </div>
  );
}
