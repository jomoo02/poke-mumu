import { useEffect, useEffectEvent } from 'react';

/**
 * 트리거가 보이는 화면 구간(query)을 벗어나면 닫는다.
 * 트리거만 CSS로 숨고 패널(포털)과 스크롤 잠금이 남지 않게.
 * close는 매 렌더 새 함수여도 된다 (useEffectEvent로 최신 함수를 부르고, 구독은 query·open이 바뀔 때만 다시 한다)
 */
export function useCloseOutsideMedia(
  query: string,
  open: boolean,
  close: () => void,
) {
  const onLeave = useEffectEvent(close);

  useEffect(() => {
    if (!open) return;

    const mql = window.matchMedia(query);
    const onChange = () => {
      if (!mql.matches) onLeave();
    };

    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query, open]);
}
