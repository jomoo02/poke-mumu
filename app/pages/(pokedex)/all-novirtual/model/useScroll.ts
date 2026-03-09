import { useEffect, useRef, useState } from 'react';

export default function useScroll() {
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [isScrolledX, setIsScrolledX] = useState(false);

  const handleScroll = () => {
    if (!headerRef.current || !bodyRef.current) {
      return;
    }

    headerRef.current.scrollLeft = bodyRef.current.scrollLeft;
  };

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;

    const handleScroll = () => {
      setIsScrolledX(el.scrollLeft > 0);
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [bodyRef]);

  return {
    bodyRef,
    headerRef,
    handleScroll,
    isScrolledX,
  };
}
