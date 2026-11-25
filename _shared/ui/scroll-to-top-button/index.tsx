'use client';

import { ArrowUpIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';

interface ScrollToTopButtonProps {
  // 기본은 sm 이상만 보인다. 모바일에도 띄우려면 'flex' (목록 아래에 버튼만큼 여백을 둘 것)
  className?: string;
}

export default function ScrollToTopButton({
  className,
}: ScrollToTopButtonProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setVisible(window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 숨김(투명)일 땐 inert: Tab 순서·스크린리더에서 뺀다. 누른 뒤 숨으면 포커스가 문서 처음으로 돌아가 다음 Tab이 맨 위부터 시작한다
  return (
    <Button
      variant={'ghost'}
      size={'icon-lg'}
      aria-label="맨 위로"
      inert={!visible}
      onClick={handleClick}
      className={cn(
        'hidden sm:flex fixed cursor-pointer flex-col bottom-4.75 right-4.75 transition-all duration-300 items-center justify-center ',
        visible
          ? 'opacity-100 translate-x-0 pointer-events-auto'
          : 'opacity-0 translate-x-4 pointer-events-none',
        'z-20 size-11 rounded-full',
        'bg-[#71717a] dark:bg-[#52525b] hover:bg-[#3f3f46] dark:hover:bg-[#71717a]',
        className,
      )}
    >
      <ArrowUpIcon aria-hidden className="size-5 text-white" />
    </Button>
  );
}
