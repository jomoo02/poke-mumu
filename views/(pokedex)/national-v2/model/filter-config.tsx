import type { Type } from '@/entities/type/model';
import { TypeIcon } from '@/entities/type/ui';
import type { FilterConfig } from '@/features/filter-control';

import { SEARCH_PARAM_KEYS } from './search-params';

const FORM_FILTERS = [
  { value: 'mega', label: '메가진화' },
  { value: 'alola', label: '알로라의 모습' },
  { value: 'galar', label: '가라르의 모습' },
  { value: 'hisui', label: '히스이의 모습' },
  { value: 'paldea', label: '팔데아의 모습' },
] as const;

const GEN_FILTERS = Array.from({ length: 9 }, (_, index) => {
  const generation = index + 1;
  return { value: String(generation), label: `${generation}세대` };
});

export const buildTypeFilterConfig = (types: Type[]): FilterConfig => ({
  key: SEARCH_PARAM_KEYS.type,
  title: '타입',
  description: '포켓몬 타입, 최대 2개',
  max: 2,
  columns: 3,
  defaultTriggerLabel: '모든 타입',
  options: types.map((type) => ({
    value: type.identifier,
    label: type.nameKo,
    icon: <TypeIcon type={type} className="size-7 p-0.5 rounded-md shrink-0" />,
  })),
});

export const FORM_FILTER_CONFIG: FilterConfig = {
  key: SEARCH_PARAM_KEYS.form,
  title: '모습',
  description: '포켓몬 모습',
  columns: 1,
  defaultTriggerLabel: '모든 모습',
  options: [...FORM_FILTERS],
};

export const GEN_FILTER_CONFIG: FilterConfig = {
  key: SEARCH_PARAM_KEYS.gen,
  title: '세대',
  description: '등장 세대',
  columns: 2,
  defaultTriggerLabel: '모든 세대',
  options: GEN_FILTERS,
};
