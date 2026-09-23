'use client';

import { useSyncExternalStore } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/shared/ui/button';

const subscribe = () => () => {};

function useIsMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useIsMounted();

  const active = mounted ? theme : undefined;

  const handleClick = () => {
    if (active === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <Button
      variant={'ghost'}
      className="size-10 rounded-xl"
      onClick={handleClick}
    >
      <MoonIcon className="hidden dark:block size-5" />
      <SunIcon className="dark:hidden size-5" />
    </Button>
  );
}
