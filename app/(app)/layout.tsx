'use client';

import { SidebarInset, SidebarProvider } from '@/shared/ui/sidebar';
import { AppSidebar } from '@/widgets/app-sidebar';
import MainHeader from '../widgets/main-header';

// import { SidebarInset, SidebarProvider } from '@/app/shared/ui/sidebar';
// import { AppSidebar } from '../widgets/app-sidebar';
import React, { Suspense } from 'react';
import MainHeaderV2 from '../widgets/main-header-v2';
import AppHeader from '@/widgets/app-header';

interface MainLayoutProps {
  children: React.ReactNode;
  breadcrumb: React.ReactNode;
}

export default function MainLayout({ children, breadcrumb }: MainLayoutProps) {
  return (
    <div className="font-suit [--header-height:calc(--spacing(14))]">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppHeader>{breadcrumb}</AppHeader>
          <div />
          <main>{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
