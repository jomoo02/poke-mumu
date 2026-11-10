import {
  POKE_FILTER_RULES,
  useFilterOptions,
  useFilterParam,
  type PokeFilterGroup,
  type PokeFilterOption,
} from '../../model/filter';

export interface CheckboxFilterState {
  // 선택지 (타입은 아이콘에 쓸 type 포함). 배열 순서가 화면 순서
  options: readonly PokeFilterOption[];
  // 고른 게 있으면 트리거 강조
  active: boolean;
  // 트리거 글자: '타입' / '타입: 불꽃 / 비행' / '모습: 알로라의 모습' (+ triggerRest)
  triggerText: string;
  // 글자에 못 보인 나머지 수 ('+2'). 0이면 안 보인다
  triggerRest: number;
  // 접근 이름: '모습: 모든 모습' / '모습: 알로라의 모습 외 2개' / '타입: 불꽃, 비행 모두'
  triggerLabel: string;
  isChecked: (value: string) => boolean;
  // 최대 선택 수에 닿으면 고르지 않은 나머지는 막는다 (고른 값은 눌러서 해제)
  isDisabled: (value: string) => boolean;
  toggle: (value: string) => void;
}

interface CheckboxFilterConfig {
  group: PokeFilterGroup;
  title: string;
  // 트리거에 이름을 몇 개까지 보일지. 넘으면 '+N'
  summaryLimit: number;
}

/**
 * 체크박스 필터 하나(타입 · 모습 · 세대)의 시트·메뉴가 같이 쓰는 값.
 * 각 필터의 index에서 한 번 불러 두 화면에 넘긴다 (트리거 글자·비활성 규칙이 모바일·데스크톱에서 어긋나지 않게).
 * 선택값은 목록 계산과 같은 기준(유효한 값만, 고른 순서)이다
 */
export function useCheckboxFilter({
  group,
  title,
  summaryLimit,
}: CheckboxFilterConfig): CheckboxFilterState {
  const options = useFilterOptions()[group];
  const { filter, toggleFilter } = useFilterParam();

  const selected = filter[group];
  const { max, match } = POKE_FILTER_RULES[group];
  const isFull = max !== undefined && selected.length >= max;

  const names = selected.map(
    (value) => options.find((option) => option.value === value)?.label ?? value,
  );
  const shownNames = names.slice(0, summaryLimit);
  const shown = shownNames.join(' / ');
  const rest = Math.max(0, names.length - summaryLimit);

  // 접근 이름은 '/'를 읽지 않게 쉼표로. 모두 가져야 하는 그룹(타입)은 '모두'를 붙여 조합임을 알린다
  const spoken =
    match === 'all' && shownNames.length > 1
      ? `${shownNames.join(', ')} 모두`
      : shownNames.join(', ');

  const isChecked = (value: string) => selected.includes(value);

  return {
    options,
    active: names.length > 0,
    triggerText: names.length > 0 ? `${title}: ${shown}` : title,
    triggerRest: rest,
    triggerLabel:
      names.length === 0
        ? `${title}: 모든 ${title}`
        : rest > 0
          ? `${title}: ${spoken} 외 ${rest}개`
          : `${title}: ${spoken}`,
    isChecked,
    isDisabled: (value) => isFull && !isChecked(value),
    toggle: (value) => toggleFilter(group, value),
  };
}
