import { useState, useEffect } from 'react';

export function useKeyboardHeight(isOpen: boolean) {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    const onResize = () => {
      const height = Math.max(0, window.innerHeight - viewport.height);
      setKeyboardHeight(height);
    };

    viewport.addEventListener('resize', onResize);
    viewport.addEventListener('scroll', onResize);

    return () => {
      viewport.removeEventListener('resize', onResize);
      viewport.removeEventListener('scroll', onResize);
    };
  }, []);

  // 배경 스크롤 방지
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY; // fixed 적용 전에 먼저 저장

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollY}px`;

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, scrollY); // 저장해둔 값으로 복원
    };
  }, [isOpen]);

  return { keyboardHeight };
}
