import { SearchIcon, XIcon } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { Input, InputWithReset } from '@/shared/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/shared/ui/input-group';

interface FilterNameProps extends React.ComponentProps<'input'> {
  onClear: () => void;
}

export default function FilterName({ onClear, ...props }: FilterNameProps) {
  const placeholder = '명랑, Jolly, ようき';

  return (
    <InputGroup className="w-full md:max-w-xs md:w-xs lg:max-w-sm lg:w-sm">
      <InputGroupInput placeholder={placeholder} {...props} />
      <InputGroupAddon>
        <SearchIcon className="size-4.5" />
      </InputGroupAddon>

      <InputGroupAddon align={'inline-end'}>
        <InputGroupButton
          onClick={onClear}
          tabIndex={-1}
          className={
            props.value === '' ? 'text-transparent hover:text-transparent' : ''
          }
        >
          <XIcon className="size-5" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
    // <InputWithReset onClear={onClear} placeholder={placeholder} {...props} />
    // <div className="lg:max-w-md w-full relative">
    //   <Input
    //     value={value}
    //     placeholder={placeholder}
    //     autoComplete="new-password"
    //     onChange={onChange}
    //     className="pr-10"
    //     {...props}
    //   />

    //   {value.length > 0 && (
    //     <Button
    //       tabIndex={-1}
    //       variant={'ghost'}
    //       onClick={clearInputValue}
    //       className="absolute top-0 bottom-0 right-1.5 size-10 px-0 my-auto hover:bg-transparent dark:hover:bg-transparent transition-none"
    //     >
    //       <XIcon className="size-5 text-muted-foreground" />
    //     </Button>
    //   )}
    // </div>
  );
}
