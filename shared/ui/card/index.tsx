import { mergeProps, useRender } from '@base-ui/react';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/cn';

const cardVariants = cva(
  'rounded-4xl py-5 flex flex-col overflow-hidden gap-5 bg-card border h-full w-full',
  {
    variants: {
      variant: {
        default: '',
        link: 'focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring outline-none hover:bg-accent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function Card({
  className,
  variant = 'default',
  render,
  ...props
}: useRender.ComponentProps<'div'> & VariantProps<typeof cardVariants>) {
  return useRender({
    defaultTagName: 'div',
    render,
    props: mergeProps<'div'>(
      {
        className: cn(cardVariants({ variant, className })),
      },
      props,
    ),
  });
  // return (
  //   <div
  //     className={cn(
  //       'rounded-4xl py-5 flex flex-col overflow-hidden gap-5 bg-card border',
  //       className,
  //     )}
  //   >
  //     {children}
  //   </div>
  // );
}

function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('px-5 flex flex-col gap-1.5', className)}>
      {children}
    </div>
  );
}

function CardDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'text-md text-foreground/70 text-balance break-keep',
        className,
      )}
    >
      {children}
    </div>
  );
}

function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('text-lg font-semibold', className)}>{children}</div>
  );
}

type CardContentVariant = 'bordered' | 'borderless';

function CardContent({
  children,
  className,
  variant = 'borderless',
}: {
  children: React.ReactNode;
  className?: string;
  variant?: CardContentVariant;
}) {
  return (
    <div className={cn('px-5 flex flex-col gap-5', className)}>{children}</div>
  );
}

function CardGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('flex flex-col gap-3', className)}>{children}</div>;
}

function CardGroupLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('font-medium', className)}>{children}</div>;
}

function CardItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('', className)}>{children}</div>;
}

function CardFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('px-5', className)}>{children}</div>;
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardGroup,
  CardGroupLabel,
  CardItem,
  CardFooter,
};
