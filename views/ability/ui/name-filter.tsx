import { SearchIcon, XIcon } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { cn } from '@/shared/lib/cn';

interface NameFilterProps extends React.ComponentProps<'input'> {
  onClear: () => void;
}

export default function NameFilter({ onClear, ...props }: NameFilterProps) {
  return (
    <div
      className={cn(
        'relative w-full md:max-w-md md:w-sm rounded-4xl flex bg-muted dark:bg-input border border-transparent items-center px-4',
        'has-[[data-slot=input-group]:focus-visible]:border-ring has-[[data-slot=input-group]:focus-visible]:ring-[3px] has-[[data-slot=input-group]:focus-visible]:ring-ring/50 ',
      )}
    >
      <SearchIcon className="size-4.25 text-muted-foreground" />

      <Input
        data-slot="input-group"
        className={cn(
          'outline-none rounded-none border-0 bg-transparent focus-visible:ring-0 dark:bg-transparent focus-visible:border-transparent shadow-none px-2 flex-1',
        )}
        autoComplete="new-password"
        placeholder="맹화, Blaze, もうか"
        {...props}
      />
      {props.value !== '' && (
        <Button
          tabIndex={-1}
          variant={'ghost'}
          onClick={onClear}
          className="h-10 px-0 my-auto hover:bg-transparent dark:hover:bg-transparent transition-none"
        >
          <XIcon className="size-5 text-muted-foreground" />
        </Button>
      )}
    </div>
  );
}
