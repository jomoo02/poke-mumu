'use client';

import { SWRConfig } from 'swr';

export const SWRProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <SWRConfig>{children}</SWRConfig>;
};
