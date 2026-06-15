// views/pokedex-all/model/pokedex/use-filters.ts
import { useCallback, useMemo, useState } from 'react';

import { type Type } from '@/entities/type/model';

import { type PokeFilter } from '../';
import {
  makeTypePredicate,
  makeFormPredicate,
  type FormIdentifier,
} from './utils';

export default function useFilters() {
  const [filterTypes, setFilterTypes] = useState<Type[]>([]);
  const [filterForms, setFilterForms] = useState<FormIdentifier[]>([]);

  // ── 타입 필터 핸들러 ──────────────────────────────
  const toggleFilterType = useCallback((type: Type) => {
    setFilterTypes((prev) =>
      prev.some((t) => t.identifier === type.identifier)
        ? prev.filter((t) => t.identifier !== type.identifier)
        : [...prev, type],
    );
  }, []);

  const removeFilterType = useCallback((type: Type) => {
    setFilterTypes((prev) =>
      prev.filter((t) => t.identifier !== type.identifier),
    );
  }, []);

  const resetFilterType = useCallback(() => {
    setFilterTypes([]);
  }, []);

  // ── form 필터 핸들러 ──────────────────────────────
  const toggleFilterForm = useCallback((form: FormIdentifier) => {
    setFilterForms((prev) =>
      prev.includes(form) ? prev.filter((f) => f !== form) : [...prev, form],
    );
  }, []);

  const removeFilterForm = useCallback((form: FormIdentifier) => {
    setFilterForms((prev) => prev.filter((f) => f !== form));
  }, []);

  const resetFilterForm = useCallback(() => {
    setFilterForms([]);
  }, []);

  // ── 전체 초기화 ───────────────────────────────────
  const resetFilters = useCallback(() => {
    setFilterTypes([]);
    setFilterForms([]);
  }, []);

  // ── 상태 → 술어 배열 ──────────────────────────────
  const filters = useMemo<PokeFilter[]>(
    () => [makeTypePredicate(filterTypes), makeFormPredicate(filterForms)],
    [filterTypes, filterForms],
  );

  return {
    filterTypes,
    toggleFilterType,
    removeFilterType,
    resetFilterType,

    filterForms,
    toggleFilterForm,
    removeFilterForm,
    resetFilterForm,
    resetFilters,
    filters,
  };
}
