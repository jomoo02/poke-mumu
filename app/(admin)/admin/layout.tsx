import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.NODE_ENV !== 'development') {
    notFound();
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Suspense>{children}</Suspense>
    </div>
  );
}
