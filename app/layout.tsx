import { Inter } from 'next/font/google';
import React from 'react';
import './styles/globals.css';
import './styles/type.css';
import localFont from 'next/font/local';
import MainHeader from './components/main-header';

const inter = Inter({ subsets: ['latin'] });

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
  weight: '45 920',
});

export const metadata = {
  title: 'Poké MuMu',
  description: 'Poké MuMu',
};

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function RootLayout({
  children,
  modal,
}: RootLayoutProps) {
  return (
    <html lang="ko">
      <body className={`${inter.className} ${pretendard.variable} antialiased`}>
        <MainHeader />
        <div>
          {modal}
        </div>
        <main className="py-6 min-h-svh px-4 xl:max-w-screen-xl mx-auto">
          {children}
        </main>
        <footer className="h-32" />
      </body>
    </html>
  );
}
