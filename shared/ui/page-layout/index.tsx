import { cn } from '@/shared/lib/cn';

function PageLayoutContainer({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="page-layout-container"
      className={cn(
        'max-w-360 mx-auto py-12 w-full min-h-svh flex flex-col gap-6',
        'px-4 md:px-6 lg:px-8 xl:px-10 3xl:px-2.5',
        className,
      )}
      {...props}
    />
  );
}

function PageLayoutHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="page-layout-header"
      className={cn('flex flex-col gap-3', className)}
      {...props}
    />
  );
}

function PageLayoutHeaderTitle({
  className,
  ...props
}: React.ComponentProps<'h1'>) {
  return (
    <h1
      className={cn(
        'text-4xl font-bold tracking-tight text-balance break-keep whitespace-pre-line',
        className,
      )}
      {...props}
    />
  );
}

function PageLayoutHeaderDescription({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="page-layout-header-description"
      className={cn(
        'break-keep text-balance text-foreground/70 whitespace-pre-line',
        'max-w-[80%]',
        className,
      )}
      {...props}
    />
  );
}

function PageLayoutSection({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="page-layout-section"
      className={cn('flex flex-col gap-y-6 mt-6', className)}
      {...props}
    />
  );
}

export {
  PageLayoutContainer,
  PageLayoutHeader,
  PageLayoutHeaderDescription,
  PageLayoutHeaderTitle,
  PageLayoutSection,
};
