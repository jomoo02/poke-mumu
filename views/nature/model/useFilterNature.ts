import { useMemo, useState } from 'react';

import type { Nature } from './nature';

export default function useFilterNature(natures: Nature[]) {
  const [inputValue, setInputValue] = useState('');

  const filterdNatures = useMemo(() => {
    const keyword = inputValue.trim().toLowerCase();

    return natures.filter(({ ko, en, ja }) => {
      if ([ko, ja, en.toLowerCase()].some((v) => v.includes(keyword))) {
        return true;
      }
      return false;
    });
  }, [inputValue, natures]);

  return {
    inputValue,
    setInputValue,
    filterdNatures,
  };
}
