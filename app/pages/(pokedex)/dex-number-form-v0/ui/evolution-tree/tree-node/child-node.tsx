import { cn } from '@/app/shared/lib/cn';

import { type EvolutionNode } from '../../../model';
import ChainPoke from './chain-poke';
import LeafNode from './leaf-node';
import Details from '../details';

interface ChildNodeProps {
  className?: string;
  node: EvolutionNode;
  maxDepth: number;
}

export default function ChildNode({
  className,
  maxDepth,
  node,
}: ChildNodeProps) {
  const { details, next, ...poke } = node;

  const gridCols = maxDepth === 2 ? 'lg:grid-cols-2' : 'grid-cols-1';

  return (
    <div className={cn('grid w-full', gridCols, className)}>
      <div className={cn('flex flex-col lg:flex-row items-center w-full')}>
        <Details
          details={details}
          className={cn(
            'flex flex-col items-center h-full justify-center w-full',
          )}
        />
        <ChainPoke poke={poke} />
      </div>
      {next.length > 0 && (
        <div className="w-full flex flex-row lg:flex-col gap-4">
          {next.map((chainNode) => (
            <LeafNode key={chainNode.id} node={chainNode} />
          ))}
        </div>
      )}
    </div>
  );
}
