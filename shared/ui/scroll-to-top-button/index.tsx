'use client';

import { ArrowUpIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';

export default function ScrollToTopButton() {
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

  return (
    <Button
      variant={'ghost'}
      size={'icon-lg'}
      onClick={handleClick}
      className={cn(
        'fixed flex-col bottom-4.75 right-4.75 transition-all duration-300 items-center justify-center',
        visible
          ? 'opacity-100 translate-x-0 pointer-events-auto'
          : 'opacity-0 translate-x-4 pointer-events-none',
        'z-20 size-11.5 rounded-full',
        'bg-[#71717a] dark:bg-[#52525b] hover:bg-[#3f3f46] dark:hover:bg-[#71717a]',
      )}
    >
      <ArrowUpIcon className="size-5 text-white" />
    </Button>
  );
}
