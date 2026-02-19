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
    <div>
      <h3 id="evolution" className="text-2xl font-semibold mb-6">
        진화
      </h3>
      <div className="flex flex-col gap-4 py-2 w-full h-full">
        {evolutionTree.roots.map((node, idx) => (
          <Fragment key={`${node.id}-${idx}`}>
            {idx > 0 && <div className="w-full h-px bg-border my-2" />}
            <div className={cn(' w-full gap-4 flex flex-col mx-auto')}>
              <RootNode node={node} maxDepth={maxDepth} />
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
