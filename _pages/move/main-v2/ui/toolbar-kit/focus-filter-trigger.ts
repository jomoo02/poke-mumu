// root 안에서 화면에 보이는 첫 필터 트리거(data-filter-trigger)로 포커스.
// md 기준으로 시트·팝오버 트리거가 CSS로 나뉘어 둘 다 DOM에 있으므로 보이는 쪽을 고른다
export function focusVisibleFilterTrigger(root: ParentNode = document) {
  const triggers = root.querySelectorAll<HTMLElement>('[data-filter-trigger]');

  const visible = Array.from(triggers).find(
    (trigger) => trigger.getClientRects().length > 0,
  );

  visible?.focus();
}
