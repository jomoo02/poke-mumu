'use client';

import { useMemo, useState, useTransition } from 'react';

import { type MoveView } from './index';

// ─── 정렬 ───────────────────────────────────────

export const SORT_OPTIONS = [
  { value: 'default', label: '기본순' },
  { value: 'name-asc', label: '이름순' },
  { value: 'name-desc', label: '이름 역순' },
  { value: 'power-desc', label: '위력 높은순' },
  { value: 'power-asc', label: '위력 낮은순' },
  { value: 'type', label: '타입순' },
] as const;
export type SortValue = (typeof SORT_OPTIONS)[number]['value'];

// ─── 훅 ─────────────────────────────────────────

export default function useMoveFilter(moves: MoveView[]) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortValue>('default');
  const [activeTypes, setActiveTypes] = useState<Set<string>>(new Set());
  const [activeDamageClasses, setActiveDamageClasses] = useState<Set<string>>(
    new Set(),
  );

  const [deferredSearch, setDeferredSearch] = useState('');
  const [isPending, startTransition] = useTransition();

  // ── 필터 + 정렬 ──

  const handleSearch = (value: string) => {
    setSearch(value); // input 즉시 반영
    startTransition(() => {
      setDeferredSearch(value); // 필터링은 low-priority
    });
  };
  const filtered = useMemo(() => {
    const keyword = deferredSearch.trim().toLowerCase();

    let result = moves.filter((m) => {
      if (keyword && !m.nameKo.includes(keyword)) return false;
      if (activeTypes.size > 0 && !activeTypes.has(m.typeIdentifier))
        return false;
      if (
        activeDamageClasses.size > 0 &&
        !activeDamageClasses.has(m.damageClassIdentifier)
      )
        return false;
      return true;
    });

    result = [...result];

    switch (sortKey) {
      case 'default':
        result.sort((a, b) => a.id - b.id);
        break;
      case 'name-asc':
        result.sort((a, b) => a.nameKo.localeCompare(b.nameKo));
        break;
      case 'name-desc':
        result.sort((a, b) => b.nameKo.localeCompare(a.nameKo));
        break;
      case 'power-desc':
        result.sort((a, b) => {
          if (a.power == null && b.power == null) return 0;
          if (a.power == null) return 1;
          if (b.power == null) return -1;
          return b.power - a.power;
        });
        break;
      case 'power-asc':
        result.sort((a, b) => {
          if (a.power == null && b.power == null) return 0;
          if (a.power == null) return 1;
          if (b.power == null) return -1;
          return a.power - b.power;
        });
        break;
      case 'type':
        result.sort((a, b) => a.typeNameKo.localeCompare(b.typeNameKo));
        break;
    }

    return result;
  }, [moves, deferredSearch, sortKey, activeTypes, activeDamageClasses]);

  // ── facets (데이터에 존재하는 타입/분류만 추출) ──

  const facets = useMemo(() => {
    const types = new Map<
      string,
      { identifier: string; nameKo: string; count: number }
    >();
    const damageClasses = new Map<
      string,
      { identifier: string; nameKo: string; count: number }
    >();

    for (const m of moves) {
      const t = types.get(m.typeIdentifier);
      if (t) t.count += 1;
      else
        types.set(m.typeIdentifier, {
          identifier: m.typeIdentifier,
          nameKo: m.typeNameKo,
          count: 1,
        });

      const dc = damageClasses.get(m.damageClassIdentifier);
      if (dc) dc.count += 1;
      else
        damageClasses.set(m.damageClassIdentifier, {
          identifier: m.damageClassIdentifier,
          nameKo: m.damageClassNameKo,
          count: 1,
        });
    }

    return {
      types: Array.from(types.values()).sort((a, b) =>
        a.nameKo.localeCompare(b.nameKo),
      ),
      damageClasses: Array.from(damageClasses.values()).sort((a, b) =>
        a.nameKo.localeCompare(b.nameKo),
      ),
    };
  }, [moves]);

  // ── 토글 핸들러 ──

  const toggleType = (identifier: string) => {
    setActiveTypes((prev) => {
      const next = new Set(prev);
      if (next.has(identifier)) next.delete(identifier);
      else next.add(identifier);
      return next;
    });
  };

  const toggleDamageClass = (identifier: string) => {
    setActiveDamageClasses((prev) => {
      const next = new Set(prev);
      if (next.has(identifier)) next.delete(identifier);
      else next.add(identifier);
      return next;
    });
  };

  const resetFilters = () => {
    setSearch('');
    setActiveTypes(new Set());
    setActiveDamageClasses(new Set());
    setSortKey('name-asc');
  };

  const isFiltering =
    search.trim() !== '' ||
    activeTypes.size > 0 ||
    activeDamageClasses.size > 0;

  return {
    // 결과
    filtered,
    facets,
    // 검색
    search,
    setSearch: handleSearch,
    isPending,
    // 정렬
    sortKey,
    setSortKey,
    // 토글
    activeTypes,
    toggleType,
    activeDamageClasses,
    toggleDamageClass,
    // 유틸
    resetFilters,
    isFiltering,
    totalCount: moves.length,
  };
}
