'use client';

import { useCallback, type MouseEvent } from 'react';

interface ScrollIntoViewOnClickOptions {
  /** 스크롤할 대상을 고르는 CSS 셀렉터. 클릭 지점에서 closest로 탐색. 기본 'button'. */
  selector?: string;
  /** false면 동작하지 않음(예: 데스크톱에서 끄기). 기본 true. */
  enabled?: boolean;
  /** 가로축(x) 정렬. 'center' | 'nearest' | 'start' | 'end'. 기본 'nearest'. */
  inline?: ScrollLogicalPosition;
  /** 세로축(y) 정렬. 'center' | 'nearest' | 'start' | 'end'. 기본 'nearest'. */
  block?: ScrollLogicalPosition;
  /** 스크롤 애니메이션. 기본 'auto'(즉시). */
  behavior?: ScrollBehavior;
}

/**
 * 스크롤 컨테이너에서 클릭된 항목을 컨테이너 안에서 완전히 보이도록 스크롤한다.
 * 이벤트 위임 기반이라 컨테이너의 onClick에 그대로 붙이면 되고,
 * 자식 컴포넌트 구조/리팩터 상태와 무관하게 동작한다.
 *
 * 축 제어: inline=가로(x), block=세로(y). 'center'는 가운데로, 'nearest'는
 * 잘린 경우에만 최소 이동. 양끝 아이템은 스크롤 경계에서 clamp되어 flush로 맞춰진다.
 *
 * @example 가로 툴바 — 탭한 pill을 가운데로
 * const onClick = useScrollIntoViewOnClick({ enabled: isMobile, inline: 'center' });
 * <div className="overflow-x-auto" onClick={onClick}>...</div>
 *
 * @example 세로 리스트 — 클릭한 항목이 보이게
 * const onClick = useScrollIntoViewOnClick({ selector: '[data-item]', block: 'nearest' });
 * <ul className="overflow-y-auto" onClick={onClick}>...</ul>
 */
export function useScrollIntoViewOnClick({
  selector = 'button',
  enabled = true,
  inline = 'nearest',
  block = 'nearest',
  behavior = 'auto',
}: ScrollIntoViewOnClickOptions = {}) {
  return useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (!enabled) return;
      const target = (event.target as HTMLElement).closest(selector);
      target?.scrollIntoView({ inline, block, behavior });
    },
    [selector, enabled, inline, block, behavior],
  );
}
