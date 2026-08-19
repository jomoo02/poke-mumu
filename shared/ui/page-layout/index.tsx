import { cn } from '@/shared/lib/cn';

function PageLayoutContainer({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="page-layout-container"
      className={cn(
        'mx-auto w-full min-h-svh flex flex-col gap-6',
        // '2xl:max-w-370',
        'lg:max-w-[calc(92vw-240px)]',
        // 'px-4 md:px-6 lg:px-8 xl:px-16 3xl:px-2.5 gap-6 py-14',
        'px-6 lg:px-5  py-6',
        className,
      )}
      {...props}
    >
      {/* <div
        className="max-w-6xl mx-auto w-full flex flex-col gap-6"
        {...props}
      ></div> */}
    </div>
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
        'text-4xl font-bold tracking-tight text-balance break-keep whitespace-pre-line scroll-mt-14',
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
        'break-keep text-pretty text-foreground/70 ',
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

function PageLayoutSectionTitle({
  className,
  ...props
}: React.ComponentProps<'h2'>) {
  return (
    <h2
      data-slot="page-layout-section"
      className={cn('text-xl font-bold tracking-wide break-keep', className)}
      {...props}
    />
  );
}

function PageLayoutSectionDescription({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="page-layout-header-description"
      className={cn(
        'break-keep text-pretty text-muted-foreground',
        'max-w-[80%]',
        className,
      )}
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
  PageLayoutSectionTitle,
  PageLayoutSectionDescription,
};
