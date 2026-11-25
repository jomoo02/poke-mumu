// 모바일 드로어 공통 모양: 바텀시트처럼 좌우·바닥에 붙이고 위 모서리만 둥글게, 640px에서 멈추고 sm 이상은 가운데
export const DRAWER_CONTENT_CLASS_NAME =
  'max-w-160 rounded-t-3xl rounded-b-none [--drawer-inset:0px] sm:mx-auto';
export const DRAWER_HEADER_CLASS_NAME =
  'px-6 pt-2 pb-4 group-data-[swipe-axis=y]/drawer-popup:text-left';

// 화면 구간: md 미만은 드로어, md 이상은 다이얼로그·팝오버. 트리거는 CSS로 하나만 보인다
export const MOBILE_QUERY = '(max-width: 767px)';
export const DESKTOP_QUERY = '(min-width: 768px)';

// 가로 스크롤 줄의 넘친 쪽 끝 흐림: data-fade-start/end(useScrollEdges)에 따라 왼쪽·오른쪽 흐림 길이 0 ↔ 24px
export const SCROLL_FADE_CLASS_NAME =
  '[--fade-end:0px] [--fade-start:0px] data-fade-end:[--fade-end:24px] data-fade-start:[--fade-start:24px] mask-[linear-gradient(to_right,transparent,#000_var(--fade-start),#000_calc(100%-var(--fade-end)),transparent)]';
