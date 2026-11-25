import React, { Suspense } from 'react';

import AppHeader from '@/_app/app-header';

interface MainLayoutProps {
  children: React.ReactNode;
  // @breadcrumb 슬롯: 레이아웃에 있어 같은 레이아웃 안 이동(탭 전환 등)에서 다시 그려지지 않는다
  breadcrumb: React.ReactNode;
}

export default function MainLayout({ children, breadcrumb }: MainLayoutProps) {
  return (
    <div className="font-suit">
      <Suspense>
        <AppHeader />
        <div className=" w-full min-h-0 flex-1 min-w-0">
          <main className="flex-1">
            {/* 본문 맨 위 (제목 자리). 폭·좌우 여백은 PageLayoutContainer와 같다. 슬롯이 비면 숨긴다 */}
            <div className="mx-auto w-full max-w-318 px-4 py-4 empty:hidden sm:px-6">
              {breadcrumb}
            </div>
            {children}
          </main>
        </div>
      </Suspense>
    </div>
  );
}
