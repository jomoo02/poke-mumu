import { cn } from '@/app/shared/lib/cn';

import { type EvolutionNode } from '../../../model';
import ChildNode from './child-node';
import ChainPoke from './chain-poke';

interface RootNodeProps {
  node: EvolutionNode;
  maxDepth: number;
}

export default function RootNode({ node, maxDepth }: RootNodeProps) {
  const { next, ...poke } = node;

  return (
    <div className="flex flex-col lg:flex-row ">
      <div className={cn('flex flex-col  items-center')}>
        <ChainPoke poke={poke} />
      </div>
      <div
        className={cn(
          'w-full grid  gap-4 ',
          next.length > 1 ? 'grid-cols-2 lg:grid-cols-1' : '',
        )}
      >
        {next.map((chainNode) => (
          <ChildNode
            key={chainNode.id}
            node={chainNode}
            maxDepth={maxDepth}
            className={cn(
              next.length == 3 ? 'last:col-span-2 lg:last:col-span-1 ' : '',
            )}
          />
        ))}
      </div>
    </div>
  );
}
