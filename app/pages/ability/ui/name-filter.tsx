import { Button } from '@/app/shared/ui/button';
import { Input } from '@/app/shared/ui/input';
import { XIcon } from 'lucide-react';

type NameFilterProps = React.ComponentProps<'input'> & {
  reset: () => void;
};

export default function NameFilter({ reset, ...props }: NameFilterProps) {
  return (
    <div className="flex w-full gap-3">
      <Input
        className="max-w-md"
        type="text"
        name="ability-name"
        autoComplete="off"
        {...props}
      />
      {props.value !== '' && (
        <Button onClick={reset} variant="outline" className="w-10">
          <XIcon className="size-4.5" />
        </Button>
      )}
    </div>
  );
}
