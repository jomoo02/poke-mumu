import MainHeader from '../widgets/main-header';

import { SidebarInset, SidebarProvider } from '@/app/shared/ui/sidebar';
import { AppSidebar } from '../widgets/app-sidebar';
import { Suspense } from 'react';
interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative z-10 flex flex-col bg-background font-suit [--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <div className="flex flex-1">
          <Suspense>
            <AppSidebar />
          </Suspense>

          <SidebarInset>
            <MainHeader />
            <main className="flex flex-col flex-1 py-8">{children}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
      {/* <div id="ttt" className="sticky top-14 z-60" /> */}
    </div>
  );
}
