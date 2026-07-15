import { SidebarInset, SidebarProvider } from '../shared/ui/sidebar';
import { AppSidebar } from '../widgets/app-sidebar';
import MainHeader from '../widgets/main-header';

// import { SidebarInset, SidebarProvider } from '@/app/shared/ui/sidebar';
// import { AppSidebar } from '../widgets/app-sidebar';
import React, { Suspense } from 'react';
import MainHeaderV2 from '../widgets/main-header-v2';
import { Breadcrumb } from '@/widgets/breadcrumbs/ui/breadcrumb';

interface MainLayoutProps {
  children: React.ReactNode;
  breadcrumbs: React.ReactNode;
}

export default function MainLayout({ children, breadcrumbs }: MainLayoutProps) {
  return (
    <div className=" font-suit [--header-height:calc(--spacing(14))]">
      {/* <MainHeader /> */}
      {/* <main className="flex flex-col flex-1">{children}</main> */}

      <MainHeaderV2 />

      {/* <Suspense>
            <AppSidebar />
          </Suspense> */}

      {/* <Suspense>
        <div className="px-4 sm:px-6 py-4">
          <Breadcrumb>{breadcrumbs}</Breadcrumb>
        </div>
      </Suspense> */}

      <main className="flex flex-1 flex-col  w-full">{children}</main>

      {/* <div id="ttt" className="sticky top-14 z-60" /> */}
    </div>
  );
}
