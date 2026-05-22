import { EvolutionDetail, EvolutionNode } from '.';

type Placement =
  | {
      kind: 'node';
      row: number;
      col: number;
      rowspan: number;
      node: EvolutionNode;
    }
  | {
      kind: 'arrow';
      row: number;
      col: number;
      rowspan: number;
      details: EvolutionDetail[];
    };

export function layoutTree(roots: EvolutionNode[]): {
  items: Placement[];
  rows: number;
} {
  const items: Placement[] = [];
  let cursor = 0;

  function place(node: EvolutionNode, col: number): number {
    const startRow = cursor;

    if (node.next.length === 0) {
      cursor += 1;
      items.push({ kind: 'node', node, row: startRow, col, rowspan: 1 });
      return 1;
    }

    let span = 0;
    for (const child of node.next) {
      const childStart = cursor;
      const childSpan = place(child, col + 2); // 자식 먼저 배치 → cursor가 자식만큼 전진
      items.push({
        kind: 'arrow',
        details: child.details,
        row: childStart,
        col: col + 1,
        rowspan: childSpan,
      });
      span += childSpan;
    }

    items.push({ kind: 'node', node, row: startRow, col, rowspan: span });
    return span;
  }

  for (const root of roots) place(root, 0);
  return { items, rows: cursor };
}
