// views/pokedex-all/model/pokedex/context.ts
import { createContext, use, type Dispatch, type SetStateAction } from 'react';

import { type Type } from '@/entities/type/model';

import { type NationalPoke } from '..';
import { type SortOption } from './comparators';
import { FormIdentifier } from './utils';

// ── 1) 검색: 타이핑마다 바뀜 ──────────────────────
interface SearchContextValue {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
}

// ── 2) 컨트롤: 정렬/필터 액션 시 가끔 바뀜 ─────────
interface ControlContextValue {
  sort: SortOption;
  changeSort: (next: SortOption) => void;
  resetSort: () => void;

  filterTypes: Type[];
  toggleFilterType: (type: Type) => void;
  removeFilterType: (type: Type) => void;
  resetFilters: () => void;
  resetFilterType: () => void;
  filterForms: FormIdentifier[]; // ← 추가
  toggleFilterForm: (form: FormIdentifier) => void; // ← 추가
  removeFilterForm: (form: FormIdentifier) => void; // ← 추가

  resetConditions: () => void;
  resetFilterForm: () => void;
}

// ── 3) 결과: 디퍼·필터 확정 시 바뀜 ───────────────
type ResultContextValue = NationalPoke[];

const SearchContext = createContext<SearchContextValue | null>(null);
const ControlContext = createContext<ControlContextValue | null>(null);
const ResultContext = createContext<ResultContextValue | null>(null);

function useSearchContext() {
  const ctx = use(SearchContext);
  if (!ctx) throw new Error('useSearchContext: Provider 없음');
  return ctx;
}

function useControlContext() {
  const ctx = use(ControlContext);
  if (!ctx) throw new Error('useControlContext: Provider 없음');
  return ctx;
}

function useResultContext() {
  const ctx = use(ResultContext);
  if (!ctx) throw new Error('useResultContext: Provider 없음');
  return ctx;
}

export {
  SearchContext,
  ControlContext,
  ResultContext,
  useSearchContext,
  useControlContext,
  useResultContext,
  type SearchContextValue,
  type ControlContextValue,
  type ResultContextValue,
};
