import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';

import {
  ABILITY_SCOPES,
  ABILITY_SORTS,
  SCOPE_LABELS,
  SORT_LABELS,
  isAbilityScope,
  isAbilitySort,
  type AbilityScope,
  type AbilitySort,
} from './options';

interface AbilityListToolbarProps {
  scope: AbilityScope;
  onScopeChange: (scope: AbilityScope) => void;
  sort: AbilitySort;
  onSortChange: (sort: AbilitySort) => void;
}

/**
 * 범위(전체/챔피언스) · 정렬(가나다순/ABC순) 세그먼트 컨트롤.
 *
 * shared/ui/tabs를 패널 없이 세그먼트로 쓴다. activateOnFocus가 기본 false라
 * 화살표 키로 포커스만 옮길 때는 URL이 바뀌지 않고, Enter/Space·클릭으로 선택한다.
 * 모바일은 2열로 나눠 두 그룹이 같은 폭을 차지한다.
 */
export default function AbilityListToolbar({
  scope,
  onScopeChange,
  sort,
  onSortChange,
}: AbilityListToolbarProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center">
      <Tabs
        value={scope}
        onValueChange={(value: unknown) => {
          if (isAbilityScope(value)) onScopeChange(value);
        }}
        className="min-w-0"
      >
        <TabsList aria-label="범위" className="w-full sm:w-fit">
          {ABILITY_SCOPES.map((value) => (
            <TabsTrigger key={value} value={value} className="px-4">
              {SCOPE_LABELS[value]}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <Tabs
        value={sort}
        onValueChange={(value: unknown) => {
          if (isAbilitySort(value)) onSortChange(value);
        }}
        className="min-w-0"
      >
        <TabsList aria-label="정렬" className="w-full sm:w-fit">
          {ABILITY_SORTS.map((value) => (
            <TabsTrigger key={value} value={value} className="px-4">
              {SORT_LABELS[value]}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
