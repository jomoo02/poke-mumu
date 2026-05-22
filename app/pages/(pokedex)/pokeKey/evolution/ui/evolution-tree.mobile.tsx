// ui/MobileEvolutionTree.tsx
import type { EvolutionNode, EvolutionTree } from '../model';
import type { RefResolvers } from '../lib/ref-resolver';
import { EvolutionArrow } from './evolution-arrow';
import { EvolutionNodeCard } from './card';

interface Props {
  tree: EvolutionTree;
  currentPokeKey: string;
  resolvers: RefResolvers;
}

export function MobileEvolutionTree({
  tree,
  currentPokeKey,
  resolvers,
}: Props) {
  return (
    <div className="flex flex-col gap-10">
      {tree.roots.map((root, i) => (
        <MobileBranch
          key={`${root.pokeKey}-${i}`}
          node={root}
          currentPokeKey={currentPokeKey}
          resolvers={resolvers}
        />
      ))}
    </div>
  );
}

interface BranchProps {
  node: EvolutionNode;
  currentPokeKey: string;
  resolvers: RefResolvers;
}

function MobileBranch({ node, currentPokeKey, resolvers }: BranchProps) {
  const childCount = node.next.length;

  // 핵심: 자식이 1개면 부모 폭 그대로(w-full), 2개 이상일 때만 컬럼 분할
  const columnWidthClass =
    childCount <= 1
      ? 'w-full'
      : 'w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.5rem)]';

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <EvolutionNodeCard node={node} active={node.pokeKey === currentPokeKey} />

      {childCount > 0 && (
        <div className="flex w-full flex-wrap justify-center gap-x-3 gap-y-6">
          {node.next.map((child, i) => (
            <div
              key={`${child.pokeKey}-${child.formKo ?? 'base'}-${i}`}
              className={`flex flex-col items-center gap-4 ${columnWidthClass}`}
            >
              <EvolutionArrow details={child.details} resolvers={resolvers} />
              <MobileBranch
                node={child}
                currentPokeKey={currentPokeKey}
                resolvers={resolvers}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
