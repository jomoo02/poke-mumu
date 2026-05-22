import type { EvolutionNode } from '../model';
import { parseDisplay, type RefType } from './parse-display';

export function collectRefKeys(
  roots: EvolutionNode[],
): Record<RefType, string[]> {
  const acc: Record<RefType, Set<string>> = {
    item: new Set(),
    move: new Set(),
    poke: new Set(),
    location: new Set(),
  };

  function walk(node: EvolutionNode) {
    for (const d of node.details) {
      for (const seg of parseDisplay(d.display)) {
        if (seg.kind === 'ref') acc[seg.refType].add(seg.refKey);
      }
    }
    node.next.forEach(walk);
  }
  roots.forEach(walk);

  return {
    item: [...acc.item],
    move: [...acc.move],
    poke: [...acc.poke],
    location: [...acc.location],
  };
}
