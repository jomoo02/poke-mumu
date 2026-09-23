'use client';

import React, { Suspense } from 'react';

import { SidebarInset, SidebarProvider } from '@/_shared/ui/sidebar';
import AppHeader from '@/_app/app-header';
import AppSidebar from '@/_app/app-sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="font-suit [--header-height:calc(--spacing(14))]">
      <Suspense>
        <SidebarProvider className="flex-col">
          <AppHeader />
          <div className="flex w-full min-h-0 flex-1">
            <AppSidebar />
            <SidebarInset className="min-w-0">
              <main className="flex-1">{children}</main>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </Suspense>
    </div>
  );
}
