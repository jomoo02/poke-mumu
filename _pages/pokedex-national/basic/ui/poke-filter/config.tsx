import { Type } from '@/entities/type/model';
import { TypeIcon } from '@/entities/type/ui';

import { FilterConfig } from '../../model/poke-filter';
import { SEARCH_PARAM_KEYS } from '../../model/search-params';

const FORM_FILTERS = [
  { identifier: 'mega', label: '메가진화' },
  { identifier: 'alola', label: '알로라의 모습' },
  { identifier: 'galar', label: '가라르의 모습' },
  { identifier: 'hisui', label: '히스이의 모습' },
  { identifier: 'paldea', label: '팔데아의 모습' },
] as const;

const GEN_FILTERS = Array.from({ length: 9 }, (_, index) => {
  const generation = index + 1;
  return { identifier: String(generation), label: `${generation}세대` };
}) as ReadonlyArray<{ identifier: string; label: string }>;

const buildTypeFilterConfig = (types: Type[]) => {
  const typeConfig: FilterConfig = {
    paramKey: SEARCH_PARAM_KEYS.type,
    description: '포켓몬 타입, 최대 2개',
    max: 2,
    columns: 3,
    items: types.map((type) => ({
      identifier: type.identifier,
      label: type.nameKo,
      icon: (
        <TypeIcon type={type} className="size-7 p-0.5 rounded-md shrink-0" />
      ),
    })),
    title: '타입',
    defaultTriggerLabel: '모든 타입',
  };

  return typeConfig;
};

const FORM_FILTER_CONFIG: FilterConfig = {
  paramKey: SEARCH_PARAM_KEYS.form,
  description: '포켓몬 모습',
  columns: 1,
  items: FORM_FILTERS.map((form) => ({
    ...form,
  })),
  title: '모습',
  defaultTriggerLabel: '모든 모습',
};

const GEN_FILTER_CONFIG: FilterConfig = {
  paramKey: SEARCH_PARAM_KEYS.gen,
  description: '등장 세대',
  columns: 2,
  items: GEN_FILTERS.map((gen) => ({
    ...gen,
  })),
  title: '세대',
  defaultTriggerLabel: '모든 세대',
};

export { buildTypeFilterConfig, FORM_FILTER_CONFIG, GEN_FILTER_CONFIG };
