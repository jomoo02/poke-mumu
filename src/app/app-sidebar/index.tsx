import Link from 'next/link';
import { Suspense } from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
} from '@/src/shared/ui/sidebar';

import NavMain from './nav-main';

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="group-data-[side=left]:border-r-0">
      <SidebarHeader className="hidden h-14 in-data-drawer:flex">
        <SidebarMenu className="flex flex-row items-center h-full">
          <Link
            href={'/'}
            className="flex-1 flex items-center text-xl font-extrabold text-foreground px-2.5 truncate"
          >
            포케무무
          </Link>
        </SidebarMenu>
      </SidebarHeader>
      <Suspense>
        <SidebarContent>
          <NavMain />
        </SidebarContent>
      </Suspense>
    </Sidebar>
  );
}
