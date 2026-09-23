import * as React from 'react';

// Tailwind의 md(768px) 기준. 이 값 미만을 모바일로 본다.
const MOBILE_BREAKPOINT = 768;

export function useIsMobile(breakPoint = MOBILE_BREAKPOINT) {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakPoint - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < breakPoint);
    };
    mql.addEventListener('change', onChange);
    setIsMobile(window.innerWidth < breakPoint);
    return () => mql.removeEventListener('change', onChange);
  }, [breakPoint]);

  return !!isMobile;
}
