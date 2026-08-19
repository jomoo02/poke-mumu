import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/shared/ui/sidebar';
import NavPokedex from './nav-pokedex';
import Link from 'next/link';
import NavAbility from './nav-ability';
import NavMove from './nav-move';
// import ThemeToggle from '@/app/widgets/main-header/ui/theme-toggle';

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-14">
        <SidebarMenu className="flex flex-row items-center h-full">
          <Link
            href={'/'}
            className="flex-1 
            flex items-center text-xl font-extrabold text-foreground group-data-[collapsible=icon]:hidden px-2 truncate"
          >
            포케무무
          </Link>

          {/* <SidebarTrigger className="size-9 rounded-lg" /> */}
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavPokedex />
        <NavMove />
        <NavAbility />

        {/* <SidebarGroup /> */}
      </SidebarContent>
      <SidebarFooter className="">
        {/* <SidebarMenu className="f">
          <SidebarMenuItem>
            <ThemeToggle />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarTrigger className="size-9 rounded-lg" />
          </SidebarMenuItem>
        </SidebarMenu> */}
      </SidebarFooter>
    </Sidebar>
  );
}
