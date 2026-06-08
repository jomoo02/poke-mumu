import { SearchIcon, XIcon } from 'lucide-react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/shared/ui/input-group';

interface NameFilterProps extends React.ComponentProps<'input'> {
  onClear: () => void;
}

export default function NameFilter({ onClear, ...props }: NameFilterProps) {
  const placeholder = '맹화, Blaze, もうか';

  return (
    <InputGroup className="w-full md:max-w-md md:w-sm">
      <InputGroupInput placeholder={placeholder} {...props} />
      <InputGroupAddon>
        <SearchIcon className="size-4.5" />
      </InputGroupAddon>
      <InputGroupAddon align={'inline-end'}>
        <InputGroupButton
          tabIndex={-1}
          onClick={onClear}
          className={
            props.value === '' ? 'text-transparent hover:text-transparent' : ''
          }
        >
          <XIcon className="size-5" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
