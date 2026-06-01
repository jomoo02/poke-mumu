import { XIcon } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

interface FilterNameProps extends React.ComponentProps<'input'> {
  value: string;
  clearInputValue: () => void;
}

export default function FilterName({
  value,
  onChange,
  clearInputValue,
  ...props
}: FilterNameProps) {
  const placeholder = '명랑, Jolly, ようき';

  return (
    <div className="sm:max-w-md w-full relative">
      <Input
        value={value}
        id="nature-search"
        placeholder={placeholder}
        name="natures-input"
        autoComplete="new-password"
        onChange={onChange}
        className="pr-10"
        {...props}
      />

      {value.length > 0 && (
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
