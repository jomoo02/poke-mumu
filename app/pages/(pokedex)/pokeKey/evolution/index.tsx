export type {
  EvolutionCondition,
  EvolutionDetail,
  EvolutionNode,
  EvolutionTree,
} from './model';
export { parseConditionNumber } from './model';
import { getEvolutionTree } from './api';
export { EvolutionTreeView } from './ui/evolution-tree-view';

import { EvolutionTreeView } from './ui/evolution-tree-view';
import { collectRefKeys } from './lib/collect-refs';
import { getMoveNamesByKeys } from './api/move-name';

import { getPokeNamesByKeys } from './api/poke';
import { buildResolvers } from './lib/build-resolver';
import { MobileEvolutionTree } from './ui/evolution-tree.mobile';

interface Props {
  evolutionId: number | null | undefined;
  currentPokeKey: string;
}

export default async function EvolutionSection({
  evolutionId,
  currentPokeKey,
}: Props) {
  if (evolutionId == null) return null;

  const tree = await getEvolutionTree(evolutionId);
  if (!tree || tree.roots.length === 0) return null;

  const refKeys = collectRefKeys(tree.roots);
  const [moves, pokes] = await Promise.all([
    getMoveNamesByKeys(refKeys.move),
    getPokeNamesByKeys(refKeys.poke),
  ]);
  const resolvers = buildResolvers({ moves, pokes });

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">진화</h2>
      <div className="lg:hidden">
        <MobileEvolutionTree
          tree={tree}
          currentPokeKey={currentPokeKey}
          resolvers={resolvers}
        />
      </div>
      <div className="hidden lg:block">
        <EvolutionTreeView
          tree={tree}
          currentPokeKey={currentPokeKey}
          resolvers={resolvers}
        />
      </div>
    </section>
  );
}
