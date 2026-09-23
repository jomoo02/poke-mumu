'use client';

import { MoonIcon, SunIcon, MonitorIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/cn';
import { useSyncExternalStore } from 'react';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui/sidebar';

const subscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
const data = [
  {
    theme: 'light',
    icon: <SunIcon className="size-4.5" />,
  },
  {
    theme: 'dark',
    icon: <MoonIcon className="size-4.5" />,
  },
  {
    theme: 'system',
    icon: <MonitorIcon className="size-4.5" />,
  },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useIsMounted();
  const active = mounted ? theme : undefined;
  return (
    <SidebarMenu className="gap-1 rounded-2xl bg-muted grid grid-cols-3 p-1">
      {data.map(({ theme, icon }) => (
        <SidebarMenuItem key={theme}>
          <SidebarMenuButton
            // variant={'ghost'}
            isActive={active === theme}
            // data-active=
            className={cn(
              // 'size-10 rounded-xl text-foreground/70 data-active:text-foreground [&_svg]:size-5 ',
              'h-8.75 [&_svg]:size-4.5 flex justify-center rounded-xl text-foreground/70 data-active:text-foreground',
              // 'data-active:bg-muted dark:data-active:bg-muted/70',
              'data-active:bg-background data-active:hover:bg-background dark:data-active:bg-background',
            )}
            onClick={() => setTheme(theme)}
          >
            {icon}
            {/* <Button>{icon}</Button> */}
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
