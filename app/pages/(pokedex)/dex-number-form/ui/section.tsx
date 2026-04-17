import { cn } from '@/app/shared/lib/cn';

function Section({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('mt-12', className)} {...props} />;
}

function SectionTitle({
  children,
  className,
  ...props
}: React.ComponentProps<'h2'>) {
  return (
    <h2
      className={cn('text-3xl font-bold tracking-wide mt-10', className)}
      {...props}
    >
      {children}
    </h2>
  );
}

function SectionBorder({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('w-full h-px bg-border', className)} {...props} />;
}

function SectionDescription({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn('text-muted-foreground text-md mt-3', className)}
      {...props}
    />
  );
}

function SectionContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('mt-6', className)} {...props} />;
}

export {
  Section,
  SectionTitle,
  SectionBorder,
  SectionDescription,
  SectionContent,
};
