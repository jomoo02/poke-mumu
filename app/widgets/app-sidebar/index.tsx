'use client';

import * as React from 'react';
import { ChevronRight } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  useSidebar,
} from '@/app/shared/ui/sidebar';
import Link from 'next/link';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/app/shared/ui/collapsible';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/app/shared/lib/cn';

const data = [
  [
    '지역도감',
    ['1세대', '레드/그린/블루/옐로우'],
    ['2세대', '골드/실버/크리스탈'],
    ['3세대', '루비/사파이어/에메랄드', '파이어레드/리프그린'],
  ],
];

const data2 = [
  {
    gen: '1세대',
    values: ['레드/그린/블루/옐로우'],
  },
  {
    gen: '2세대',
    values: ['골드/실버/크리스탈'],
  },
  {
    gen: '3세대',
    values: ['루비/사파이어/에메랄드', '파이어레드/리프그린'],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  return (
    <Sidebar
      // className="group-data-[side=left]:border-r-0"
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]! group-data-[side=left]:border-r-0 group-data-[side=left]:shadow-border group-data-[side=left]:shadow"
      {...props}
    >
      <SidebarHeader className="sm:hidden">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link
              href="/"
              className="flex items-center text-xl font-extrabold text-foreground h-10 px-2"
            >
              포케무무
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="p-3">
          <SidebarGroupLabel>도감</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="h-10"
                isActive={pathname === '/pokedex/all'}
                onClick={() => setOpenMobile(false)}
              >
                <Link href="/pokedex/all">전국도감</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="h-10"
                onClick={() => setOpenMobile(false)}
              >
                <Link href="/pokedex">지역도감</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup className="p-3">
          <SidebarGroupLabel>게임 시스템</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                onClick={() => setOpenMobile(false)}
                className="h-10"
              >
                <Link href="/natures">성격</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                onClick={() => setOpenMobile(false)}
                isActive={pathname === '/ability'}
                className="h-10 rounded-4xl px-4"
              >
                <Link href="/ability" className={cn('')}>
                  특성
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                onClick={() => setOpenMobile(false)}
                isActive={pathname === '/move'}
                className="h-10 rounded-4xl px-4"
              >
                <Link href="/move" className={cn('')}>
                  기술
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

function TreeV2({ item }: { item: TreeItem }) {
  const [name, ...items] = Array.isArray(item) ? item : [item];

  if (!items.length) {
    return (
      <SidebarMenuButton className="data-[active=true]:bg-transparent">
        {name}
      </SidebarMenuButton>
    );
  }
  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible  [&[data-state=open]>button>svg:last-child]:rotate-90"
        defaultOpen={false}
        // defaultOpen={name === 'components' || name === 'ui'}
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <span>{name}</span>
            <ChevronRight className="ml-auto transition-transform" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          1
          <SidebarMenuSub className="">
            {items.map((subItem, index) => (
              <Tree key={index} item={subItem} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}

type TreeItem = string | TreeItem[];
function Tree({ item }: { item: TreeItem }) {
  const [name, ...items] = Array.isArray(item) ? item : [item];

  if (!items.length) {
    return (
      <SidebarMenuButton className="data-[active=true]:bg-transparent">
        {name}
      </SidebarMenuButton>
    );
  }
  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible  [&[data-state=open]>button>svg:last-child]:rotate-90"
        defaultOpen={false}
        // defaultOpen={name === 'components' || name === 'ui'}
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <span>{name}</span>
            <ChevronRight className="ml-auto transition-transform" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="">
            {items.map((subItem, index) => (
              <Tree key={index} item={subItem} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}
