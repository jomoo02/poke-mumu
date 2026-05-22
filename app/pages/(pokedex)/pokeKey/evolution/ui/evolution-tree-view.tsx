import type { EvolutionTree } from '../model';
import { EvolutionArrow } from './evolution-arrow';
import { EvolutionNodeCard } from './card';
import { layoutTree } from '../model/tree';
import { RefResolvers } from '../lib/ref-resolver';

interface EvolutionTreeViewProps {
  tree: EvolutionTree;
  currentPokeKey: string;
  resolvers: RefResolvers;
}

export function EvolutionTreeView({
  tree,
  currentPokeKey,
  resolvers,
}: EvolutionTreeViewProps) {
  const { items, rows } = layoutTree(tree.roots);

  return (
    <div
      className="grid grid-cols-[8rem_1fr_8rem_1fr_8rem] items-center gap-y-6 w-full"
      style={{ gridTemplateRows: `repeat(${rows}, auto)` }}
    >
      {items.map((it, i) => (
        <div
          key={i}
          className="flex items-center justify-center"
          style={{
            gridColumn: it.col + 1,
            gridRow: `${it.row + 1} / span ${it.rowspan}`,
          }}
        >
          {it.kind === 'node' ? (
            <EvolutionNodeCard
              node={it.node}
              active={it.node.pokeKey === currentPokeKey}
            />
          ) : (
            <EvolutionArrow details={it.details} resolvers={resolvers} />
          )}
        </div>
      ))}
    </div>
  );
}
