import { preload } from 'react-dom';

import { TYPE_IDENTIFIERS, getTypeIconSrc } from '../model/type';

// 이미지가 있는 타입 아이콘 전부 (unknown 제외, 18개)
const TYPE_ICON_SRCS = TYPE_IDENTIFIERS.map(getTypeIconSrc).filter(
  (src): src is string => src !== null,
);

/**
 * 타입 아이콘을 전부 미리 받는다 (<head>에 <link rel="preload">).
 * 아이콘이 처음 나타나는 순간 요청하면 응답 전까지 색 박스만 보여 깜빡인다.
 * 같은 주소는 React가 한 번만 넣으므로 여러 번 불러도 된다.
 * 이벤트 핸들러용: 검색 팝오버처럼 어디서나 열리는 기능은 열려는 순간(호버·포커스·누름) 부른다
 */
export const preloadTypeIcons = () => {
  for (const src of TYPE_ICON_SRCS) {
    preload(src, { as: 'image' });
  }
};

/**
 * 렌더용: 처음엔 일부 타입만 그리고, 필터·정렬·페이지 이동으로
 * 다른 타입이 나중에 나타나는 페이지에서 쓴다.
 * 화면에 나올 아이콘이 처음부터 다 그려지는 페이지는 쓰지 않는다 (쓰지 않는 preload는 브라우저 경고)
 */
export function TypeIconPreload() {
  preloadTypeIcons();

  return null;
}
