import { Fragment } from 'react';

import { cn } from '@/app/shared/lib/cn';

import { getEvolutionTree } from '../../api/evolution-tree';
import { getMaxDepth } from '../../model';
import RootNode from './tree-node/root-node';

interface EvolutionTreeProps {
  id: number | null;
}

export default async function EvolutionTree({ id }: EvolutionTreeProps) {
  const evolutionTree = await getEvolutionTree(id);

  if (!evolutionTree) {
    return null;
  }

  const maxDepth = getMaxDepth(evolutionTree);

  return (
    <div className="border rounded-2xl py-6 lg:px-6">
      <div className="flex flex-col gap-3 w-full h-full">
        {evolutionTree.roots.map((node, idx) => (
          <Fragment key={`${node.id}-${idx}`}>
            {idx > 0 && <div className="w-full h-px bg-border my-3" />}
            <div className={cn(' w-full gap-3 flex flex-col overflow-hidden')}>
              <RootNode node={node} maxDepth={maxDepth} />
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
