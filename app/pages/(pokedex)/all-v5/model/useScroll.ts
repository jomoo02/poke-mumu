import { useEffect, useRef, useState } from 'react';

export default function useScroll() {
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [isScrolledX, setIsScrolledX] = useState(false);
  const rafId = useRef<number | null>(null);
  const isSyncing = useRef(false);
  const touchingHeader = useRef(false);
  const touchingBody = useRef(false);
  // ✅ handleScroll 수정 (rAF + 동기화 가드)
  const handleScroll = () => {
    const header = headerRef.current;
    const body = bodyRef.current;
    if (!header || !body) return;

    if (touchingHeader.current) return;
    if (isSyncing.current) return;

    if (rafId.current) cancelAnimationFrame(rafId.current);

    const left = body.scrollLeft;

    rafId.current = requestAnimationFrame(() => {
      isSyncing.current = true;
      header.scrollLeft = left;
      isSyncing.current = false;
    });
  };
  // ✅ useEffect 전체 교체
  useEffect(() => {
    const header = headerRef.current;
    const body = bodyRef.current;
    if (!header || !body) return;

    const onBodyScroll = () => {
      setIsScrolledX(body.scrollLeft > 0);
      handleScroll();
    };

    const onHeaderScroll = () => {
      if (touchingBody.current) return;
      if (isSyncing.current) return;

      if (rafId.current) cancelAnimationFrame(rafId.current);

      const left = header.scrollLeft;

      rafId.current = requestAnimationFrame(() => {
        isSyncing.current = true;
        body.scrollLeft = left;
        isSyncing.current = false;
      });
    };

    const startHeaderTouch = () => (touchingHeader.current = true);
    const endHeaderTouch = () => (touchingHeader.current = false);
    const startBodyTouch = () => (touchingBody.current = true);
    const endBodyTouch = () => (touchingBody.current = false);

    header.addEventListener('scroll', onHeaderScroll, { passive: true });
    body.addEventListener('scroll', onBodyScroll, { passive: true });

    header.addEventListener('touchstart', startHeaderTouch, { passive: true });
    header.addEventListener('touchend', endHeaderTouch, { passive: true });
    body.addEventListener('touchstart', startBodyTouch, { passive: true });
    body.addEventListener('touchend', endBodyTouch, { passive: true });

    return () => {
      header.removeEventListener('scroll', onHeaderScroll);
      body.removeEventListener('scroll', onBodyScroll);

      header.removeEventListener('touchstart', startHeaderTouch);
      header.removeEventListener('touchend', endHeaderTouch);
      body.removeEventListener('touchstart', startBodyTouch);
      body.removeEventListener('touchend', endBodyTouch);

      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return {
    bodyRef,
    headerRef,
    handleScroll,
    isScrolledX,
  };
}
