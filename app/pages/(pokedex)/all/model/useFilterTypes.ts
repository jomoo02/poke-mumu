import { useState } from 'react';

import { type Type } from '@/app/entities/type/model';

export default function useFilterTypes() {
  const [filterTypes, setFilterTypes] = useState<Type[]>([]);

  const removeFilterType = (type: Type) => {
    const nextFilterTypes = filterTypes.filter(
      (t) => t.identifier !== type.identifier,
    );
    setFilterTypes(nextFilterTypes);
  };

  const addFilterType = (type: Type) => {
    if (!filterTypes.find((t) => t.identifier === type.identifier)) {
      const nextFilterTypes = [...filterTypes, type];
      setFilterTypes(nextFilterTypes);
    }
  };

  const toggleFilterType = (type: Type) => {
    if (filterTypes.find((t) => t.identifier === type.identifier)) {
      removeFilterType(type);
    } else {
      const nextFilterTypes = [...filterTypes, type];
      setFilterTypes(nextFilterTypes);
    }
  };

  const resetFilterTypes = () => {
    setFilterTypes([]);
  };

  return {
    filterTypes,
    addFilterType,
    toggleFilterType,
    removeFilterType,
    resetFilterTypes,
  };
}
