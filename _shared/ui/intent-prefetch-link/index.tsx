'use client';

import Link from 'next/link';
import { useState, type ComponentProps } from 'react';

type IntentPrefetchLinkProps = Omit<ComponentProps<typeof Link>, 'prefetch'>;

/**
 * 큰 목록·격자용 링크. 사용자가 고를 뜻을 보일 때(hover · focus · touch)만 그 주소의 내용까지 미리 받는다.
 * - 처음: prefetch="auto" → 화면에 들어오면 목적지 route의 App Shell만 받는다
 *   (Partial Prefetching: 같은 route로 가는 링크 전부가 shell 하나를 같이 쓴다)
 * - 뜻을 보이면: prefetch={true} → 그 링크의 params까지 풀어 캐시된 내용을 미리 받는다 (runtime prefetch)
 * 보이는 카드마다 상세 내용을 받지 않게 한다 (Next.js 16.4 블로그 v0 Templates 예시와 같은 방식)
 */
export function IntentPrefetchLink({
  onMouseEnter,
  onFocus,
  onTouchStart,
  ...props
}: IntentPrefetchLinkProps) {
  const [intent, setIntent] = useState(false);

  return (
    <Link
      {...props}
      prefetch={intent ? true : 'auto'}
      onMouseEnter={(event) => {
        setIntent(true);
        onMouseEnter?.(event);
      }}
      onFocus={(event) => {
        setIntent(true);
        onFocus?.(event);
      }}
      onTouchStart={(event) => {
        setIntent(true);
        onTouchStart?.(event);
      }}
    />
  );
}
