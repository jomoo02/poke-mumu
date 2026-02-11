import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';

import './globals.css';

import { TooltipProvider } from './shared/ui/tooltip';

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

export const metadata: Metadata = {
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
      lang="en"
      className={`${eliceDxNeolit.variable} ${suite.variable} ${suit.variable}`}
    >
      <body className={`antialiased`}>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
