import {
  usePokeSort,
  SORT_OPTIONS,
  DEFAULT_SORT_KEY,
  DEFAULT_SORT_DIR,
} from '../../model/poke-sort';
import { getSortLabel } from './lib';

export default function usePokeSortView() {
  const { key, dir, changeSortKey, changeSortDir, resetSort } = usePokeSort();

  const isActive = key !== DEFAULT_SORT_KEY || dir !== DEFAULT_SORT_DIR;

  return {
    key,
    dir,
    options: SORT_OPTIONS,
    currentLabel: getSortLabel(key, dir),
    ascLabel: getSortLabel(key, 'asc'),
    descLabel: getSortLabel(key, 'desc'),
    isActive,
    changeSortKey,
    changeSortDir,
    resetSort,
  };
}
