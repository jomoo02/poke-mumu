import type { ReactNode } from 'react';

// 선택지 공통: 값과 이름 (트리거 문구·접근 이름에 쓴다)
interface FilterChoice {
  value: string;
  label: string;
}

// 타일 선택지: 타일 안에 그릴 내용 (예: 아이콘 위·이름 아래). 이름 글자를 포함해야 타일의 접근 이름이 된다
interface FilterOption extends FilterChoice {
  tile: ReactNode;
}

// 체크박스 선택지: 이름 앞에 둘 아이콘 (예: 타입 아이콘). 없으면 이름만
interface FilterCheckboxOption extends FilterChoice {
  icon?: ReactNode;
}

// 필터 하나(타입, 분류, 세대 …)의 공통 모양. 선택 상태와 동작은 호출부(URL 상태 등)가 넘긴다
interface FilterGroupBase<Option extends FilterChoice> {
  key: string;
  title: string;
  options: readonly Option[];
  // 고른 순서 (트리거는 첫 값을 보여준다)
  selected: readonly string[];
  onToggle: (value: string) => void;
  // 이 그룹만 초기화
  onReset: () => void;
  // 최대 선택 수에 도달했을 때 등. 없으면 모두 선택 가능
  isDisabled?: (value: string) => boolean;
}

// 타일 필터. 팝오버의 열 수. 시트는 모든 그룹이 같은 격자(4열, sm 이상 6열)를 쓴다 (filter-tiles.tsx)
interface FilterGroup extends FilterGroupBase<FilterOption> {
  columns: 3 | 6;
}

// 체크박스 필터
interface FilterCheckboxGroup extends FilterGroupBase<FilterCheckboxOption> {
  // 목록의 최대 열 수 (글자 길이에 맞춘다: 모습 1열, 세대 2열, 타입 3열). 시트는 2열까지
  columns: 1 | 2 | 3;
  // 최대 선택 수. 제목 옆 '(최대 2개)' 안내에만 쓴다 (막기는 isDisabled)
  max?: number;
}

// 트리거가 읽는 값 (타일·체크박스 그룹 모두 해당)
type FilterTriggerSource = Pick<
  FilterGroupBase<FilterChoice>,
  'title' | 'options' | 'selected'
>;

// 트리거 요약: 처음 고른 값의 이름 + 나머지 수 (selected는 고른 순서).
// 선택이 없으면 first는 null
const getFilterTriggerSummary = ({
  options,
  selected,
}: FilterTriggerSource): { first: string | null; rest: number } => {
  const firstValue = selected[0];

  const first =
    firstValue === undefined
      ? null
      : (options.find(({ value }) => value === firstValue)?.label ??
        firstValue);

  return { first, rest: Math.max(0, selected.length - 1) };
};

// 트리거의 접근 이름. 보이는 글자('모든 타입' / '불꽃 +2')에는 그룹 이름이 없어 따로 준다:
// '타입: 모든 타입' / '타입: 불꽃' / '타입: 불꽃 외 2개'
const getFilterTriggerLabel = (group: FilterTriggerSource): string => {
  const { first, rest } = getFilterTriggerSummary(group);

  if (first === null) {
    return `${group.title}: 모든 ${group.title}`;
  }

  return rest > 0
    ? `${group.title}: ${first} 외 ${rest}개`
    : `${group.title}: ${first}`;
};

// root 안에서 화면에 보이는 첫 필터 트리거(data-filter-trigger)로 포커스.
// md 기준으로 시트·팝오버 트리거가 CSS로 나뉘어 둘 다 DOM에 있으므로 보이는 쪽을 고른다
const focusVisibleFilterTrigger = (root: ParentNode = document) => {
  const triggers = root.querySelectorAll<HTMLElement>('[data-filter-trigger]');

  const visible = Array.from(triggers).find(
    (trigger) => trigger.getClientRects().length > 0,
  );

  visible?.focus();
};

export type {
  FilterChoice,
  FilterOption,
  FilterCheckboxOption,
  FilterGroup,
  FilterCheckboxGroup,
  FilterTriggerSource,
};

export {
  getFilterTriggerSummary,
  getFilterTriggerLabel,
  focusVisibleFilterTrigger,
};
