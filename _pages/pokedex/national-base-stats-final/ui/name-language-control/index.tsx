'use client';

import type { NameLanguagePanelProps } from './name-language-panel';
import { NameLanguagePopover } from './name-language-popover';
import { NameLanguageSheet } from './name-language-sheet';

/**
 * 검색창 안 앞쪽 [영어 ⌄] 버튼 → 이름 언어 목록. 고르면 반영하고 닫는다 (정렬과 같은 규칙).
 * md 미만은 바텀시트, 이상은 팝오버. 둘 다 그려 두고 CSS로 하나만 보인다
 * (JS matchMedia는 첫 렌더가 한쪽으로 고정돼 트리거가 바뀐다).
 * 검색창 addon 안에서 버튼이 바로 자식이어야 해서(has-[>button]) 감싸는 요소 없이 둔다
 */
export default function NameLanguageControl(props: NameLanguagePanelProps) {
  return (
    <>
      <NameLanguageSheet {...props} />
      <NameLanguagePopover {...props} />
    </>
  );
}
