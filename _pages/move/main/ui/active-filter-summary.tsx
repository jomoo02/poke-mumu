'use client';

import { useFilterParam } from '../model/filter';

/**
 * 페이지 제목 옆의 지금 필터: '기술  불꽃, 물, 물리' (그룹 순서 → 고른 순서).
 * 고른 값이 없으면 그리지 않는다. 한 줄, 넘치면 말줄임.
 * 제목(h1) 밖의 형제라 제목 텍스트는 '기술' 그대로다.
 * URL을 읽으므로 Suspense 안에 둔다 (제목은 App Shell에 미리 담기고 이것만 나중에 채운다)
 */
export default function ActiveFilterSummary() {
  const { selectedItems } = useFilterParam();

  if (selectedItems.length === 0) {
    return null;
  }

  return (
    <p className="min-w-0 truncate text-base text-foreground/70">
      <span className="sr-only">필터: </span>
      {selectedItems.map((item) => item.label).join(', ')}
    </p>
  );
}
