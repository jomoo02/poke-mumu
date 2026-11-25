// root 안에서 화면에 보이는 첫 필터 트리거(data-filter-trigger)로 포커스.
// 숨겨진(display:none) 트리거는 건너뛴다. root를 안 주면 문서 전체 (빈 결과의 초기화 뒤)
export function focusVisibleFilterTrigger(root: ParentNode = document) {
  const triggers = root.querySelectorAll<HTMLElement>('[data-filter-trigger]');

  const visible = Array.from(triggers).find(
    (trigger) => trigger.getClientRects().length > 0,
  );

  visible?.focus();
}
