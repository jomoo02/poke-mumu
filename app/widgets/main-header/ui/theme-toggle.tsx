'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/app/shared/ui/button';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const handleClick = () => {
    if (resolvedTheme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <Button
      variant={'ghost'}
      className="size-10 hover:bg-accent dark:hover:bg-accent"
      size={'icon-lg'}
      onClick={handleClick}
    >
      <MoonIcon className="hidden dark:block size-5" />
      <SunIcon className="dark:hidden size-5" />
    </Button>
  );
}
