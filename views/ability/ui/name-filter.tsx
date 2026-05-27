import { XIcon } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

interface NameFilterProps extends React.ComponentProps<'input'> {
  onClear: () => void;
}

export default function NameFilter({ onClear, ...props }: NameFilterProps) {
  return (
    <div className="relative max-w-md w-full">
      <Input
        className="pr-10"
        autoComplete="new-password"
        placeholder="맹화, Blaze, もうか"
        {...props}
      />
      {props.value !== '' && (
        <Button
          tabIndex={-1}
          variant={'ghost'}
          onClick={onClear}
          className="absolute top-0 bottom-0 right-1.5 size-10 px-0 my-auto hover:bg-transparent dark:hover:bg-transparent transition-none"
        >
          <XIcon className="size-4.5 text-muted-foreground" />
        </Button>
      )}
    </div>
  );
}
