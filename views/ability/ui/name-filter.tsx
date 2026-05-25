import { Button } from '@/app/shared/ui/button';
import { Input } from '@/app/shared/ui/input';

import { XIcon } from 'lucide-react';

interface NameFilterProps extends React.ComponentProps<'input'> {
  clearInputValue: () => void;
}

export default function NameFilter({
  clearInputValue,
  ...props
}: NameFilterProps) {
  return (
    <div className="relative max-w-md w-full">
      <Input
        className="pr-10"
        type="text"
        name="ability-name"
        autoComplete="new-password"
        placeholder="맹화, Blaze, もうか"
        {...props}
      />
      {props.value !== '' && (
        <Button
          tabIndex={-1}
          variant={'ghost'}
          onClick={clearInputValue}
          className="absolute top-0 bottom-0 right-1.5 size-10 px-0 my-auto hover:bg-transparent dark:hover:bg-transparent transition-none"
        >
          <XIcon className="size-4.5 text-muted-foreground" />
        </Button>
      )}
    </div>
  );
}
