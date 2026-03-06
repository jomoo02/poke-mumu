import { useEffect, useState } from 'react';

export default function useXScroll(ref: React.RefObject<HTMLElement | null>) {
  const [isXScrolled, setIsXScrolled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      setIsXScrolled(el.scrollLeft > 0);
    };

    el.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      el.removeEventListener('scroll', handleScroll);
    };
  }, [ref]);

  return isXScrolled;
}
