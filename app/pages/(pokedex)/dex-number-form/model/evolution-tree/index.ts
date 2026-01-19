export type ChainNodeView = {
  id: number;
  dexNumber: number;
  form: string | null;
  sprite: string;
  name: string;
  pokeKey: string;
};

export type ConditionView = {
  key: string;
  value: string | number | boolean;
};

export type EvolutionNode = ChainNodeView & {
  details: {
    trigger: string;
    display: string;
    conditions: ConditionView[];
  }[];
  next: EvolutionNode[];
};

export type EvolutionTreeView = {
  id: number;
  roots: EvolutionNode[];
};

export const getMaxDepth = (tree: EvolutionTreeView): number => {
  function dfs(node: EvolutionNode, depth: number): number {
    if (node.next.length === 0) return depth;

    return Math.max(...node.next.map((child) => dfs(child, depth + 1)));
  }

  if (tree.roots.length === 0) return 0;

  return Math.max(...tree.roots.map((root) => dfs(root, 0)));
};
