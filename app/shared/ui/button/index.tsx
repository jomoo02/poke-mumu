import * as React from 'react';

import { cn } from '../../lib/cn';

export default function Button({
  className,
  ...props
}: React.ComponentProps<'button'>) {
  return (
    <button
      data-slot="button"
      className={cn(
        'outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm disabled:pointer-events-none disabled:opacity-50 shrink-0 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  );
}
