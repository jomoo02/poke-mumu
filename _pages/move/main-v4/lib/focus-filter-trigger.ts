// 필터 트리거(data-filter-trigger, 통합 필터 [⚙])로 포커스를 돌려준다.
// 쓰는 곳: 칩을 모두 지운 뒤(FilterChipGroup) · 빈 결과에서 초기화한 뒤(ResultEmpty). 포커스를 받던 버튼이 사라지는 경우들.
// 트리거는 md 미만·이상용 두 개가 있고 하나는 숨겨져 있으므로(display:none) 화면에 보이는 쪽을 고른다.
// root를 안 주면 문서 전체에서 찾는다
export function focusVisibleFilterTrigger(root: ParentNode = document) {
  const triggers = root.querySelectorAll<HTMLElement>('[data-filter-trigger]');

  const visible = Array.from(triggers).find(
    (trigger) => trigger.getClientRects().length > 0,
  );

  visible?.focus();
}
