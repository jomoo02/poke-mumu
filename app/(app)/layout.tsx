import React, { Suspense } from 'react';

import AppHeader from '@/_app/app-header';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="font-suit">
      <Suspense>
        <AppHeader />
        <div className=" w-full min-h-0 flex-1 min-w-0">
          <main className="flex-1">{children}</main>
        </div>
      </Suspense>
    </div>
  );
}
