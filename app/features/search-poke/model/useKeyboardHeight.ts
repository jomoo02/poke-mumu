import { useState, useEffect } from 'react';

export function useKeyboardHeight(isOpen: boolean) {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setKeyboardHeight(0);
      return;
    }

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
  }, [isOpen]);

  return { keyboardHeight };
}
