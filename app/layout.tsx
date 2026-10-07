import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import localFont from 'next/font/local';

import { ThemeProvider } from './providers/theme';

import './globals.css';

import { cn } from '@/src/shared/lib/cn';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const suit = localFont({
  src: '../public/fonts/SUIT-Variable.woff2',
  display: 'swap',
  variable: '--font-suit',
  weight: '100 900',
});

const suite = localFont({
  src: '../public/fonts/SUITE-Variable.woff2',
  display: 'swap',
  variable: '--font-suite',
  weight: '100 900',
});

const eliceDxNeolit = localFont({
  variable: '--font-elice',
  src: [
    {
      path: '../public/fonts/EliceDXNeolli-Bold.ttf',
      weight: '900',
      style: 'bold',
    },
    {
      path: '../public/fonts/EliceDXNeolli-Light.ttf',
      weight: '100',
      style: 'light',
    },
    {
      path: '../public/fonts/EliceDXNeolli-Medium.ttf',
      weight: '400',
      style: 'medium',
    },
  ],
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// 프로덕션(Vercel)에서는 배포 도메인을 자동 사용, 로컬에서는 NEXT_PUBLIC_BASE_URL.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : (process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Poke MuMu',
  description: 'Poke MuMu',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={cn(
        eliceDxNeolit.variable,
        suite.variable,
        suit.variable,
        'font-sans',
        inter.variable,
        // 스크롤바 자리를 늘 비워 둔다. 모달(메뉴·시트)이 스크롤을 잠가도, 짧은 페이지로 이동해도
        // 스크롤바가 생겼다 사라지며 화면이 좌우로 움직이지 않게 (오버레이 스크롤바 환경은 영향 없음)
        '[scrollbar-gutter:stable]',
      )}
    >
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
