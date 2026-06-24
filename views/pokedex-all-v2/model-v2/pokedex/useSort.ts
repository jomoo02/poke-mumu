// views/pokedex-all/model/pokedex/use-sort.ts
import { useState } from 'react';

import { type SortOption, DEFAULT_SORT } from './comparators';

export default function useSort() {
  const [sort, setSort] = useState<SortOption>(DEFAULT_SORT);

  const resetSort = () => setSort(DEFAULT_SORT);

  return { sort, changeSort: setSort, resetSort };
}
