'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '@/app/shared/ui/select';

interface SelectVersionProps {
  value: string | undefined;
  onValueChange: (value: string) => void;
  grouped: {
    gen: string;
    values: {
      id: string;
      value: string;
    }[];
  }[];
}

export default function SelectVersion({
  grouped,
  value,
  onValueChange,
}: SelectVersionProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="max-w-80 w-full py-4.5 rounded-lg ">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-card border-border rounded-xl">
        {grouped.map((group) => (
          <SelectGroup key={group.gen}>
            <SelectLabel className="py-2">{group.gen}</SelectLabel>
            {group.values.map((version) => (
              <SelectItem
                key={version.id}
                value={version.id}
                className="py-2 rounded-lg "
              >
                {version.value}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
