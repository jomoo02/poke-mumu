'use client';

import { BookIcon, DiscIcon, PillIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/src/shared/ui/sidebar';
import { cn } from '@/src/shared/lib/cn';

const data: { title: string; url: string; icon: React.ReactNode }[] = [
  {
    title: '도감',
    url: '/pokedex',
    icon: <BookIcon className="size-5" />,
  },
  {
    title: '특성',
    url: '/ability',
    icon: <PillIcon className="size-5" />,
  },
  { title: '기술', url: '/move', icon: <DiscIcon className="size-5" /> },
  // {
  //   title: '테스트',
  //   url: '/pokedex/national',
  //   icon: <DiscIcon className="size-5" />,
  // },
];

export default function NavMain() {
  const pathname = usePathname();

  const isMenuButtonActive = (url: string) =>
    pathname ? pathname.startsWith(url) : false;

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu className="gap-1.5">
          {data.map(({ title, url, icon }) => (
            <SidebarMenuItem key={title}>
              <SidebarMenuButton
                tooltip={title}
                isActive={isMenuButtonActive(url)}
                className={cn('[&_svg]:size-5 text-foreground/70')}
                render={
                  <Link href={url}>
                    {icon}
                    <span>{title}</span>
                  </Link>
                }
              />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
