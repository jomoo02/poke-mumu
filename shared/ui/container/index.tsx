import { cn } from '@/shared/lib/cn';

function PageContainer({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'max-w-365 mx-auto py-12 w-full min-h-svh flex flex-col gap-6',
        'px-4 md:px-6 lg:px-8 xl:px-10 3xl:px-2.5',
        className,
      )}
    >
      {children}
    </div>
  );
}

export { PageContainer };
