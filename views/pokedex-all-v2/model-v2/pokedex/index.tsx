// views/pokedex-all/model/pokedex/index.ts

// ── Provider ──────────────────────────────────────
export { default as PokedexProvider } from './pokedex-provider';

// ── 소비 훅 (UI는 이것만으로 상태·결과 접근) ──────────
export {
  useSearchContext,
  useControlContext,
  useResultContext,
} from './context';

// ── 정렬 컨트롤 UI에 필요한 옵션·라벨·타입 ───────────
export {
  getSortOptions,
  getSortLabel,
  isDefaultSort,
  isSortKey,
  DEFAULT_SORT,
  type SortKey,
  type Direction,
  type SortOption,
  type SortOptionItem,
} from './comparators';

export { FORM_FILTERS, type FormIdentifier } from './utils';
