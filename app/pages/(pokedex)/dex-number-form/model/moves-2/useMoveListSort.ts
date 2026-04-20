'use client';

import { useEffect, useMemo, useState } from 'react';
import { type MoveMethod, type MoveViewNew } from '.';

export type SortMode = 'default' | 'power-desc' | 'power-asc' | 'type-asc';

const METHOD_ORDER: MoveMethod[] = [
  'level_up',
  'evolution',
  'reminder',
  'egg',
  'tutor',
  'pre',
  'form',
  'machine',
];

const defaultSort = (a: MoveViewNew, b: MoveViewNew): number => {
  const methodDiff =
    METHOD_ORDER.indexOf(a.method) - METHOD_ORDER.indexOf(b.method);
  if (methodDiff !== 0) return methodDiff;

  if (a.method === 'level_up') {
    const levelDiff = (a.level ?? 0) - (b.level ?? 0);
    if (levelDiff !== 0) return levelDiff;
    return a.name.localeCompare(b.name, 'ko');
  }

  if (a.method === 'machine') {
    const typeDiff = (a.machineType ?? '').localeCompare(b.machineType ?? '');
    if (typeDiff !== 0) return typeDiff;
    return (a.machineNumber ?? 0) - (b.machineNumber ?? 0);
  }

  return 0;
};

// power null은 항상 마지막
const powerVal = (power: number | null) => (power == null ? -Infinity : power);

export function useMoveListSort(moves: MoveViewNew[], resetKey: number) {
  const [sortMode, setSortMode] = useState<SortMode>('default');
  const [query, setQuery] = useState('');

  // useEffect(() => {
  //   setSortMode('default');
  //   setQuery('');
  // }, [resetKey]);

  const filtered = useMemo(() => {
    const q = query.replaceAll(' ', '').toLowerCase();
    if (!q) return moves;
    return moves.filter((m) => m.name.toLowerCase().includes(q));
  }, [moves, query]);

  const sorted = useMemo(() => {
    const arr = [...filtered];

    switch (sortMode) {
      case 'default':
        return arr.sort(defaultSort);

      case 'power-desc':
        return arr.sort((a, b) => {
          const diff = powerVal(b.power) - powerVal(a.power);
          if (diff !== 0) return diff;
          return defaultSort(a, b);
        });

      case 'power-asc':
        return arr.sort((a, b) => {
          const diff = powerVal(a.power) - powerVal(b.power);
          if (diff !== 0) return diff;
          return defaultSort(a, b);
        });

      case 'type-asc':
        return arr.sort((a, b) => {
          const typeDiff = a.type.identifier.localeCompare(b.type.identifier);
          if (typeDiff !== 0) return typeDiff;
          return defaultSort(a, b);
        });
    }
  }, [filtered, sortMode]);

  return { sorted, sortMode, setSortMode, query, setQuery };
}
