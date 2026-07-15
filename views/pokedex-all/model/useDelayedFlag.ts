'use client';

import { useEffect, useState } from 'react';

// flag가 delay(ms) 이상 지속될 때만 true를 반환한다.
// 100ms 안에 끝나는 빠른 전환에서 dim이 번쩍이는 flash를 방지하는 용도.
export default function useDelayedFlag(flag: boolean, delay = 150): boolean {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!flag) {
      setShown(false);
      return;
    }

    const timer = setTimeout(() => setShown(true), delay);

    return () => clearTimeout(timer);
  }, [flag, delay]);

  return shown;
}
