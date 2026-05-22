import { createClient } from '@/app/shared/lib/supabase/client';

import { EvolutionNode, type EvolutionTree } from '../model';
import { normalizeDisplay } from '../lib/normalize-display';

function normalizeTree(tree: EvolutionTree): EvolutionTree {
  return { ...tree, roots: tree.roots.map(normalizeNode) };
}

function normalizeNode(node: EvolutionNode): EvolutionNode {
  return {
    ...node,
    details: node.details.map((d) => ({
      ...d,
      display: normalizeDisplay(d.display, d.conditions),
    })),
    next: node.next.map(normalizeNode),
  };
}

export async function getEvolutionTree(
  chainId: number | null,
): Promise<EvolutionTree | null> {
  'use cache';

  if (!chainId) {
    return null;
  }

  const supabase = createClient();
  const { data, error } = await supabase.rpc('get_evolution_tree', {
    p_chain_id: chainId,
  });

  if (error) {
    console.error('[getEvolutionTree] RPC error', { chainId, error });
    return null;
  }
  if (data == null) return null;

  return normalizeTree(data as unknown as EvolutionTree);
}
