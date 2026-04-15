import { cn } from '../../lib/cn';

function Item({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex w-full flex-wrap items-center rounded-4xl bg-transparent border border-transparent gap-1 px-4 py-3.5',
        className,
      )}
      {...props}
    />
  );
}

function ItemContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="item-content"
      className={cn('flex flex-1 flex-col gap-1 ', className)}
      {...props}
    />
  );
}

function ItemTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        'line-clamp-1 flex w-fit items-center gap-2 font-medium ',
        className,
      )}
      {...props}
    />
  );
}

function ItemDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        'text-muted-foreground text-left text-pretty break-keep ',
        className,
      )}
      {...props}
    />
  );
}

export { Item, ItemContent, ItemTitle, ItemDescription };
