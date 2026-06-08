import * as React from 'react';

import { cn } from '@/shared/lib/cn';
import { SearchIcon, XIcon } from 'lucide-react';
import { Button } from '../button';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input h-10 w-full min-w-0 rounded-4xl border bg-transparent py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'px-4 bg-muted dark:bg-input border-transparent',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  );
}

function InputWithReset({
  className,
  type,
  onClear,
  placeholder,
  ...props
}: React.ComponentProps<'input'> & { onClear: () => void }) {
  return (
    <div
      className={cn(
        'relative w-full md:max-w-md md:w-sm rounded-4xl flex bg-muted dark:bg-input border h-11 border-transparent items-center px-4 group',
        'has-[[data-slot=input-group]:focus-visible]:border-ring has-[[data-slot=input-group]:focus-visible]:ring-[3px] has-[[data-slot=input-group]:focus-visible]:ring-ring/50 ',
        className,
      )}
    >
      <SearchIcon className="size-4.25 text-muted-foreground" />
      <Input
        data-slot="input-group"
        className={cn(
          'outline-none rounded-none border-0 bg-transparent focus-visible:ring-0 dark:bg-transparent focus-visible:border-transparent shadow-none px-2.5 flex-1',
        )}
        autoComplete="new-password"
        placeholder={placeholder}
        {...props}
      />
      {props.value !== '' && (
        <Button
          tabIndex={-1}
          variant={'ghost'}
          onClick={onClear}
          className="h-full px-0 my-auto hover:bg-transparent dark:hover:bg-transparent transition-none"
        >
          <XIcon className="size-5 text-muted-foreground" />
        </Button>
      )}
    </div>
  );
}

export { Input, InputWithReset };
