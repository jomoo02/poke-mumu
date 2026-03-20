import { useState } from 'react';
import { type SortOption, DEFAULT_SORT } from '.';

export default function useSort() {
  const [sort, setSort] = useState<SortOption>({
    ...DEFAULT_SORT,
  });

  const changeSort = (nextSort: SortOption) => {
    setSort(nextSort);
  };

  const resetSort = () => {
    setSort({ ...DEFAULT_SORT });
  };

  return {
    sort,
    changeSort,
    resetSort,
  };
}
