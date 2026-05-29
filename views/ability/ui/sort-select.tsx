import * as SelectPrimitive from '@radix-ui/react-select';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

interface SortSelectProps extends React.ComponentProps<
  typeof SelectPrimitive.Root
> {
  items: {
    value: string;
    label: string;
  }[];
}

export default function SortSelect({
  value,
  onValueChange,
  items,
}: SortSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-32 min-w-28">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
