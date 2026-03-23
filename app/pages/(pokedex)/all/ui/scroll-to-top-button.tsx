import { ArrowUpIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '@/app/shared/lib/cn';
import { Button } from '@/app/shared/ui/button';

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
        ' fixed flex-col bottom-4.5 right-4.5 transition-all duration-300 items-center justify-center',
        visible
          ? 'opacity-100 translate-x-0 pointer-events-auto'
          : 'opacity-0 translate-x-4 pointer-events-none',
        'hover:bg-foreground/70 z-20 size-10 rounded-full bg-foreground',
      )}
    >
      <ArrowUpIcon className="size-5.5 text-white" />
    </Button>
  );
}
