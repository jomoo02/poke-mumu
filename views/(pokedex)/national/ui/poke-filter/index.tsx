import { useMemo } from 'react';

import { Type } from '@/entities/type/model';

import Filter from './filter';
import {
  buildTypeFilterConfig,
  FORM_FILTER_CONFIG,
  GEN_FILTER_CONFIG,
} from './config';

interface PokeFilterProps {
  types: Type[];
  isMobile: boolean;
}

export default function PokeFilter({ types, isMobile }: PokeFilterProps) {
  // buildTypeFilterConfig는 매 렌더 TypeIcon JSX를 새로 만드므로 types 기준으로 메모.
  const filterConfigs = useMemo(
    () => [
      buildTypeFilterConfig(types),
      FORM_FILTER_CONFIG,
      GEN_FILTER_CONFIG,
    ],
    [types],
  );

  return (
    <>
      {filterConfigs.map((config) => (
        <Filter key={config.paramKey} config={config} isMobile={isMobile} />
      ))}
    </>
  );
}
