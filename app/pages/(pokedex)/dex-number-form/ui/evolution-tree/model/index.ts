import {
  type EvolutionTreeView,
  type EvolutionNode,
} from './evolution-tree.model';

export type ChainNodeView = {
  id: number;
  dexNumber: number;
  form: string | null;
  sprite: string;
  name: string;
  pokeKey: string;
};

export {
  EvolutionTreeModel,
  type EvolutionNode,
  type EvolutionTreeView,
} from './evolution-tree.model';

export const getMaxDepth = (tree: EvolutionTreeView): number => {
  function dfs(node: EvolutionNode, depth: number): number {
    if (node.next.length === 0) return depth;

    return Math.max(...node.next.map((child) => dfs(child, depth + 1)));
  }

  if (tree.roots.length === 0) return 0;

  return Math.max(...tree.roots.map((root) => dfs(root, 0)));
};
