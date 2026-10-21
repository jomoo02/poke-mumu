import type { KeyboardEvent, MouseEvent } from 'react';

/**
 * 고르면 닫히는 radio 목록(시트·팝오버 안)의 닫기 처리. radio 라벨에 붙인다.
 * - 터치·클릭으로 고르면 닫는다. radio는 화살표 키로 옮길 때도 click을 내보내는데(detail 0) 그건 닫지 않는다.
 *   화살표 키로 옮기면 바로 선택되는 게 radio의 기본 동작이라, 그때 닫으면 키보드로는 바로 옆 항목밖에 못 고른다
 * - 키보드로는 Space(고르기)·Enter(다 골랐음)에서 닫는다
 * 이미 고른 항목을 눌러도 닫힌다 (값이 같아 onValueChange는 오지 않지만 click은 온다)
 */
export const getChoiceCloseHandlers = (close: () => void) => ({
  onClick: (event: MouseEvent) => {
    if (event.detail > 0) {
      close();
    }
  },
  onKeyUp: (event: KeyboardEvent) => {
    if (event.key === ' ' || event.key === 'Enter') {
      close();
    }
  },
});
