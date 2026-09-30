import type { ReactNode } from 'react';

import { TypeIcon, type Type } from '@/_entities/type';
import { DamageClassIcon, type DamageClass } from '@/_entities/damage-class';

import { SEARCH_PARAMS_KEY } from '../../config/search-params';

interface MoveFilterItem {
  identifier: string;
  label: string;
  icon: ReactNode;
}

// 타입·분류 필터는 같은 컴포넌트를 쓰고 이 설정으로만 구분한다
interface MoveFilterConfig {
  paramKey: string;
  title: string;
  // sheet 헤더 설명
  description: string;
  // popover의 최대 열 수. sheet는 최대 2열 (filter-layout.ts)
  columns: 1 | 2 | 3;
  items: MoveFilterItem[];
}

const buildTypeFilterConfig = (types: Type[]): MoveFilterConfig => ({
  paramKey: SEARCH_PARAMS_KEY.type,
  title: '타입',
  description: '기술 타입 필터',
  columns: 3,
  items: types.map((type) => ({
    identifier: type.identifier,
    label: type.nameKo,
    icon: <TypeIcon type={type} className="size-7 p-0.5 rounded-md shrink-0" />,
  })),
});

const buildDamageClassFilterConfig = (
  damageClasses: DamageClass[],
): MoveFilterConfig => ({
  paramKey: SEARCH_PARAMS_KEY.damageClass,
  title: '분류',
  description: '기술 분류 필터',
  columns: 1,
  items: damageClasses.map((damageClass) => ({
    identifier: damageClass.identifier,
    label: damageClass.nameKo,
    icon: <DamageClassIcon damageClass={damageClass} className="shrink-0" />,
  })),
});

// 선택 없음 → '타입: 모든 타입', 선택 있음 → '타입: 불꽃, 물'.
// 선택한 순서대로 줄이지 않고 전부 나열한다 (툴바가 가로 스크롤)
const getFilterTriggerText = (
  config: MoveFilterConfig,
  selected: readonly string[],
): string => {
  const labels = selected
    .map(
      (identifier) =>
        config.items.find((item) => item.identifier === identifier)?.label,
    )
    .filter((label): label is string => label !== undefined);

  return labels.length === 0
    ? `${config.title}: 모든 ${config.title}`
    : `${config.title}: ${labels.join(', ')}`;
};

export type { MoveFilterConfig, MoveFilterItem };

export {
  buildTypeFilterConfig,
  buildDamageClassFilterConfig,
  getFilterTriggerText,
};
