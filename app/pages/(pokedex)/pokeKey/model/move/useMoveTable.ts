// app/pages/(pokedex)/pokeKey/ui/move/use-move-table.ts (수정)
'use client';

import { useMemo } from 'react';
import type { PokeMoveCommon } from './index';

export type SortKey = 'default' | 'name' | 'power-desc' | 'power-asc' | 'type';

export interface MoveTableFilters {
  search: string;
  learnMethods: Set<string>;
  typeIdentifiers: Set<string>;
  sortKey: SortKey;
}

const LEARN_METHOD_ORDER: Record<string, number> = {
  'level-up': 1,
  machine: 2,
  evolution: 3,
  egg: 4,
  reminder: 5,
  tutor: 6,
  'pre-evolution': 7,
  'form-change': 8,
  special: 9,
};

function compareDefault<
  T extends PokeMoveCommon & {
    level?: number | null;
    machine_number?: number | null;
  },
>(a: T, b: T): number {
  const am = LEARN_METHOD_ORDER[a.learn_method_identifier] ?? 99;
  const bm = LEARN_METHOD_ORDER[b.learn_method_identifier] ?? 99;
  if (am !== bm) return am - bm;

  if (a.level != null && b.level != null && a.level !== b.level)
    return a.level - b.level;
  if (a.level != null && b.level == null) return -1;
  if (a.level == null && b.level != null) return 1;

  if (
    a.machine_number != null &&
    b.machine_number != null &&
    a.machine_number !== b.machine_number
  ) {
    return a.machine_number - b.machine_number;
  }

  return (a.name_ko ?? a.identifier).localeCompare(b.name_ko ?? b.identifier);
}

function compareName<T extends PokeMoveCommon>(a: T, b: T): number {
  return (a.name_ko ?? a.identifier).localeCompare(b.name_ko ?? b.identifier);
}

function comparePower<T extends PokeMoveCommon>(
  a: T,
  b: T,
  dir: 1 | -1,
): number {
  if (a.power == null && b.power == null) return 0;
  if (a.power == null) return 1;
  if (b.power == null) return -1;
  return (a.power - b.power) * dir;
}

function compareType<T extends PokeMoveCommon>(a: T, b: T): number {
  const t = a.type_name_ko.localeCompare(b.type_name_ko);
  if (t !== 0) return t;
  return compareName(a, b);
}

export function useMoveTable<
  T extends PokeMoveCommon & {
    level?: number | null;
    machine_number?: number | null;
  },
>(moves: readonly T[], filters: MoveTableFilters): T[] {
  return useMemo(() => {
    const search = filters.search.trim().toLowerCase();

    let result = moves.filter((m) => {
      if (search) {
        const name = (m.name_ko ?? m.identifier).toLowerCase();
        if (!name.includes(search)) return false;
      }
      if (
        filters.learnMethods.size > 0 &&
        !filters.learnMethods.has(m.learn_method_identifier)
      ) {
        return false;
      }
      if (
        filters.typeIdentifiers.size > 0 &&
        !filters.typeIdentifiers.has(m.type_identifier)
      ) {
        return false;
      }
      return true;
    });

    result = [...result];
    switch (filters.sortKey) {
      case 'default':
        result.sort(compareDefault);
        break;
      case 'name':
        result.sort(compareName);
        break;
      case 'power-desc':
        result.sort((a, b) => comparePower(a, b, -1));
        break;
      case 'power-asc':
        result.sort((a, b) => comparePower(a, b, 1));
        break;
      case 'type':
        result.sort(compareType);
        break;
    }

    return result;
  }, [moves, filters]);
}

export function useMoveFacets<T extends PokeMoveCommon>(moves: readonly T[]) {
  return useMemo(() => {
    const learnMethods = new Map<
      string,
      { identifier: string; nameKo: string; count: number }
    >();
    const types = new Map<
      string,
      { identifier: string; nameKo: string; count: number }
    >();

    for (const m of moves) {
      const lm = learnMethods.get(m.learn_method_identifier);
      if (lm) lm.count += 1;
      else
        learnMethods.set(m.learn_method_identifier, {
          identifier: m.learn_method_identifier,
          nameKo: m.learn_method_name_ko,
          count: 1,
        });
      const t = types.get(m.type_identifier);
      if (t) t.count += 1;
      else
        types.set(m.type_identifier, {
          identifier: m.type_identifier,
          nameKo: m.type_name_ko,
          count: 1,
        });
    }

    return {
      learnMethods: Array.from(learnMethods.values()).sort(
        (a, b) =>
          (LEARN_METHOD_ORDER[a.identifier] ?? 99) -
          (LEARN_METHOD_ORDER[b.identifier] ?? 99),
      ),
      types: Array.from(types.values()).sort((a, b) =>
        a.nameKo.localeCompare(b.nameKo),
      ),
    };
  }, [moves]);
}

export const DAMAGE_CLASS_KO: Record<string, string> = {
  physical: '물리',
  special: '특수',
  status: '변화',
};

export { LEARN_METHOD_ORDER };
